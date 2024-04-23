const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "mysecret";
// var bodyParser = require("body-parser");
// var jsonParser = bodyParser.json;

const router = express.Router();

router.post("/authen", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok,", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

// Login
router.post("/loginadmin", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "กรุณากรอก ชื่อผู้ใช้ และ รหัสผ่านผู้ใช้" });
  }
  db.query(
    "SELECT * FROM tbl_admin WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล" });
      }
      if (result.length > 0) {
        const hashedPassword = result[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordMatch) {
          const token = jwt.sign(
            {
              email,
              email: result[0].email,
              id: result[0].id,
              username: result[0].username,
            },
            secret,
            {
              expiresIn: "1h",
            }
          );
          res.json({
            message: "เข้าสู่ระบบเรียบร้อย",
            token,
            id: result[0].id,
            email: result[0].email,
            username: result[0].username,
          });
        } else {
          return res
            .status(401)
            .json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
        }
      } else {
        return res.status(401).json({ message: "ไม่พบผู้ใช้ในระบบ" });
      }
    }
  );
});

router.post("/admin/add", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "รหัสผ่านไม่ตรงกัน" });
    }
    const emailExistsQuery =
      "SELECT COUNT(*) AS count FROM tbl_admin WHERE email = ?";
    db.query(emailExistsQuery, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Server Error" });
      }
      const emailCount = result[0].count;
      if (emailCount > 0) {
        return res.status(400).json({ error: "อีเมลซ้ำกันในระบบ" });
      }
      const hash = await bcrypt.hash(password, 10);

      db.beginTransaction(() => {
        const Maxid = "SELECT MAX(id) + 1 AS maxid FROM tbl_admin";
        db.query(Maxid, (err, result) => {
          if (err) {
            return db.rollback(() =>
              res.status(500).json({ error: "Server Error" })
            );
          }
          const id = result[0].maxid || 1;
          const userData = { id, username, email, password: hash };
          db.query("INSERT INTO tbl_admin SET ?", userData, (err, result) => {
            if (err) {
              return db.rollback(() =>
                res.status(500).json({ error: "Error" })
              );
            }
            db.commit((err) => {
              if (err) {
                return db.rollback(() =>
                  res.status(500).json({ error: "Server Error" })
                );
              }
              return res
                .status(201)
                .send({ message: "เพิ่มข้อมูลแอดมินใหม่เรียบร้อย" });
            });
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/admin/changepwd", async (req, res) => {
  const { id, password, newPassword, confirmNewPassword } = req.body;
  console.log(req.body);
  try {
    const adminExistsQuery = "SELECT * FROM tbl_admin WHERE id = ?";
    db.query(adminExistsQuery, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
      }
      try {
        const admin = result[0];
        const passwordMatch = bcrypt.compareSync(password, admin.password);
        if (!passwordMatch) {
          return res.status(400).json({ error: "รหัสผ่านเก่าไม่ถูกต้อง" });
        }
        if (newPassword !== confirmNewPassword) {
          return res.status(400).json({ error: "รหัสผ่านใหม่ไม่ตรงกัน" });
        }
        const hash = bcrypt.hashSync(newPassword, 10);
        db.query(
          "UPDATE tbl_admin SET password = ? WHERE id = ?",
          [hash, id],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Server Error" });
            }
            return res
              .status(200)
              .json({ message: "เปลี่ยนรหัสผ่านเรียบร้อย" });
          }
        );
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/admindel/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM tbl_admin WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json({ message: "ลบข้อมูลแอดมินเรียบร้อย" });
  });
});

router.get("/admin", (req, res) => {
  const sql = "SELECT * FROM tbl_admin";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});

router.get("/admin/getid/:id", (req, res) => {
  const id = req.params.id;
  let sql = `SELECT *
                FROM tbl_admin
                where id = ? `;
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});

module.exports = router;
