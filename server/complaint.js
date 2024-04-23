const express = require("express");
const db = require("./db");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "./uploadpdf";
    const fileExtension = path.extname(file.originalname);

    if (
      fileExtension === ".jpg" ||
      fileExtension === ".png" ||
      fileExtension === ".jpeg"
    ) {
      uploadPath = "./uploadimg";
    }

    return cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${uuid.v4()}${fileExtension}`;
    return cb(null, uniqueFilename);
  },
});
const upload = multer({ storage });

// เพิ่มข้อมูลร้องเรียนทั่วไป
router.post("/complaintadd1", (req, res) => {
  const {
    //tbl_complaint_main
    tid,
    t_other,
    tsid,
    // tbl_complaint_sender
    s_firstname,
    s_lastname,
    s_email,
    s_tel,
    // tbl_complaint_accused
    acc_firstname,
    acc_lastname,
    department,
    topic,
    detail,
  } = req.body;
  console.log(req.body);

  db.beginTransaction(() => {
    const sqlCheckTracking =
      "SELECT tracking FROM tbl_complaint_main ORDER BY tracking DESC LIMIT 1";

    db.query(sqlCheckTracking, (err, resultCheckTracking) => {
      if (err) {
        return db.rollback(() =>
          res.status(500).json({ error: "Error checking tracking: " + err })
        );
      }

      let tracking = Math.floor(Math.random() * 1000000);
      while (
        resultCheckTracking.some(
          (entry) => entry.tracking === tracking.toString().padStart(6, "0")
        )
      ) {
        tracking = Math.floor(Math.random() * 1000000);
      }

      const maxcmpid =
        "SELECT MAX(cmpid) + 1 AS maxcmpid FROM tbl_complaint_main";

      db.query(maxcmpid, (err, result) => {
        if (err) {
          return db.rollback(() =>
            res.status(500).json({ error: "Error fetching maxcmpid: " + err })
          );
        }

        const cmpid = result[0].maxcmpid || 1;

        const insert_tbl_complaint_main =
          "INSERT INTO tbl_complaint_main (cmpid, tid, t_other, tsid, tracking, statusid, received_date) VALUES (?,?,?,?,?,'1',CURDATE())";
        db.query(
          insert_tbl_complaint_main,
          [cmpid, tid, t_other, tsid, tracking],
          () => {
            const insert_tbl_complaint_sender =
              "INSERT INTO tbl_complaint_sender (cmpid, s_firstname, s_lastname, s_email, s_tel) VALUES (?,?,?,?,?)";
            db.query(
              insert_tbl_complaint_sender,
              [cmpid, s_firstname, s_lastname, s_email, s_tel],
              () => {
                const insert_tbl_complaint_accused =
                  "INSERT INTO tbl_complaint_accused (cmpid, acc_firstname, acc_lastname, department, topic, detail) VALUES (?,?,?,?,?,?)";
                db.query(
                  insert_tbl_complaint_accused,
                  [
                    cmpid,
                    acc_firstname,
                    acc_lastname,
                    department,
                    topic,
                    detail,
                  ],
                  () => {
                    db.commit((err) => {
                      if (err) {
                        return db.rollback(() =>
                          res
                            .status(500)
                            .json({ error: "Error committing data: " + err })
                        );
                      }
                      return res.json({
                        message: "Successfully",
                      });
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  });
});

// เพิ่มข้อมูลร้องเรียนแบบเปิดเผยตัวตน
router.post("/complaintadd2", upload.single("file"), (req, res) => {
  const {
    //tbl_complaint_main
    tid,
    // tbl_complaint_sender
    s_firstname,
    s_lastname,
    s_email,
    s_tel,
    s_card,
    s_age,
    s_address,
    district,
    subdistrict,
    province,
    // tbl_complaint_accused
    acc_firstname,
    acc_lastname,
    department,
    topic,
    detail,
  } = req.body;

  const file = req.file ? req.file.filename : "";

  console.log(req.body);

  db.beginTransaction(() => {
    const sqlCheckTracking =
      "SELECT tracking FROM tbl_complaint_main ORDER BY tracking DESC LIMIT 1";

    db.query(sqlCheckTracking, (err, resultCheckTracking) => {
      if (err) {
        return db.rollback(() =>
          res.status(500).json({ error: "Error checking tracking: " + err })
        );
      }

      let tracking = Math.floor(Math.random() * 1000000);
      while (
        resultCheckTracking.some(
          (entry) => entry.tracking === tracking.toString().padStart(6, "0")
        )
      ) {
        tracking = Math.floor(Math.random() * 1000000);
      }

      const maxcmpid =
        "SELECT MAX(cmpid) + 1 AS maxcmpid FROM tbl_complaint_main";

      db.query(maxcmpid, (err, result) => {
        if (err) {
          return db.rollback(() =>
            res.status(500).json({ error: "Error fetching maxcmpid: " + err })
          );
        }

        const cmpid = result[0].maxcmpid || 1;

        const insert_tbl_complaint_main =
          "INSERT INTO tbl_complaint_main (cmpid, tid, tracking, statusid, received_date, file) VALUES (?, ?, ?, '1', CURDATE(), ?)";
        db.query(
          insert_tbl_complaint_main,
          [cmpid, tid, tracking, file],
          () => {
            const insert_tbl_complaint_sender =
              "INSERT INTO tbl_complaint_sender (cmpid, s_firstname, s_lastname, s_email, s_tel, s_address ,s_card, s_age, district , subdistrict , province) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            db.query(
              insert_tbl_complaint_sender,
              [
                cmpid,
                s_firstname,
                s_lastname,
                s_email,
                s_tel,
                s_address,
                s_card,
                s_age,
                district,
                subdistrict,
                province,
              ],
              () => {
                const insert_tbl_complaint_accused =
                  "INSERT INTO tbl_complaint_accused (cmpid, acc_firstname, acc_lastname, department, topic, detail) VALUES (?,?,?,?,?,?)";
                db.query(
                  insert_tbl_complaint_accused,
                  [
                    cmpid,
                    acc_firstname,
                    acc_lastname,
                    department,
                    topic,
                    detail,
                  ],
                  () => {
                    db.commit((err) => {
                      if (err) {
                        return db.rollback(() =>
                          res
                            .status(500)
                            .json({ error: "Error committing data: " + err })
                        );
                      }
                      return res.json({
                        message: "Successfully",
                      });
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  });
});

// เพิ่มข้อมูลร้องเรียนแบบไม่เปิดเผยตัวตน
router.post("/complaintadd3", upload.single("file"), (req, res) => {
  const {
    //tbl_complaint_main
    tid,
    // tbl_complaint_accused
    acc_firstname,
    acc_lastname,
    department,
    topic,
    detail,
  } = req.body;

  const file = req.file ? req.file.filename : "";
  console.log(req.body);

  db.beginTransaction(() => {
    const sqlCheckTracking =
      "SELECT tracking FROM tbl_complaint_main ORDER BY tracking DESC LIMIT 1";

    db.query(sqlCheckTracking, (err, resultCheckTracking) => {
      if (err) {
        return db.rollback(() =>
          res.status(500).json({ error: "Error checking tracking: " + err })
        );
      }

      let tracking = Math.floor(Math.random() * 1000000);
      while (
        resultCheckTracking.some(
          (entry) => entry.tracking === tracking.toString().padStart(6, "0")
        )
      ) {
        tracking = Math.floor(Math.random() * 1000000);
      }

      const maxcmpid =
        "SELECT MAX(cmpid) + 1 AS maxcmpid FROM tbl_complaint_main";

      db.query(maxcmpid, (err, result) => {
        if (err) {
          return db.rollback(() =>
            res.status(500).json({ error: "Error fetching maxcmpid: " + err })
          );
        }

        const cmpid = result[0].maxcmpid || 1;

        const insert_tbl_complaint_main =
          "INSERT INTO tbl_complaint_main (cmpid, tid, tracking, statusid, received_date, file) VALUES (?, ?, ?, '1', CURDATE(), ?)";
        db.query(
          insert_tbl_complaint_main,
          [cmpid, tid, tracking, file],
          () => {
            const insert_tbl_complaint_accused =
              "INSERT INTO tbl_complaint_accused (cmpid, acc_firstname, acc_lastname, department, topic, detail) VALUES (?,?,?,?,?,?)";
            db.query(
              insert_tbl_complaint_accused,
              [cmpid, acc_firstname, acc_lastname, department, topic, detail],
              () => {
                db.commit((err) => {
                  if (err) {
                    return db.rollback(() =>
                      res
                        .status(500)
                        .json({ error: "Error committing data: " + err })
                    );
                  }
                  return res.json({
                    message: "Successfully",
                  });
                });
              }
            );
          }
        );
      });
    });
  });
});

router.get("/complaint", (req, res) => {
  const sql = `
      SELECT tbl_complaint_main.*, s_firstname, s_lastname, s_email, tname, statusname 
      FROM tbl_complaint_main  
      LEFT JOIN tbl_complaint_sender ON tbl_complaint_main.cmpid = tbl_complaint_sender.cmpid
      LEFT JOIN tbl_typecomplaint ON tbl_complaint_main.tid = tbl_typecomplaint.tid 
      LEFT JOIN tbl_status ON tbl_complaint_main.statusid = tbl_status.statusid  
      order by tbl_complaint_main.cmpid desc;
    `;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    data.forEach((item) => {
      item.received_date = new Date(item.received_date).toLocaleDateString(
        "th-TH",
        { timeZone: "Asia/Bangkok" }
      );
    });
    return res.json(data);
  });
});

router.get("/progress", (req, res) => {
  const sql = `
      SELECT tbl_complaint_main.*, s_firstname, s_lastname, s_email, tname, statusname 
      FROM tbl_complaint_main  
      LEFT JOIN tbl_complaint_sender ON tbl_complaint_main.cmpid = tbl_complaint_sender.cmpid
      LEFT JOIN tbl_typecomplaint ON tbl_complaint_main.tid = tbl_typecomplaint.tid 
      LEFT JOIN tbl_status ON tbl_complaint_main.statusid = tbl_status.statusid 
      WHERE tbl_complaint_main.statusid = 2   
      order by tbl_complaint_main.cmpid desc;
    `;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    data.forEach((item) => {
      item.received_date = new Date(item.received_date).toLocaleDateString(
        "th-TH",
        { timeZone: "Asia/Bangkok" }
      );
    });
    return res.json(data);
  });
});

router.get("/success", (req, res) => {
  const sql = `
      SELECT tbl_complaint_main.*, s_firstname, s_lastname, s_email, tname, statusname 
      FROM tbl_complaint_main  
      LEFT JOIN tbl_complaint_sender ON tbl_complaint_main.cmpid = tbl_complaint_sender.cmpid
      LEFT JOIN tbl_typecomplaint ON tbl_complaint_main.tid = tbl_typecomplaint.tid 
      LEFT JOIN tbl_status ON tbl_complaint_main.statusid = tbl_status.statusid 
      WHERE tbl_complaint_main.statusid = 3   
      order by tbl_complaint_main.cmpid desc;
    `;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    data.forEach((item) => {
      item.received_date = new Date(item.received_date).toLocaleDateString(
        "th-TH",
        { timeZone: "Asia/Bangkok" }
      );
    });
    return res.json(data);
  });
});

router.get("/dontaccept", (req, res) => {
  const sql = `
      SELECT tbl_complaint_main.*, s_firstname, s_lastname, s_email, tname, statusname 
      FROM tbl_complaint_main  
      LEFT JOIN tbl_complaint_sender ON tbl_complaint_main.cmpid = tbl_complaint_sender.cmpid
      LEFT JOIN tbl_typecomplaint ON tbl_complaint_main.tid = tbl_typecomplaint.tid 
      LEFT JOIN tbl_status ON tbl_complaint_main.statusid = tbl_status.statusid 
      WHERE tbl_complaint_main.statusid = 4   
      order by tbl_complaint_main.cmpid desc;
    `;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    data.forEach((item) => {
      item.received_date = new Date(item.received_date).toLocaleDateString(
        "th-TH",
        { timeZone: "Asia/Bangkok" }
      );
    });
    return res.json(data);
  });
});

router.get("/general", (req, res) => {
  const sql = `
      SELECT tbl_complaint_main.*, s_firstname, s_lastname, s_email, tname, statusname 
      FROM tbl_complaint_main  
      LEFT JOIN tbl_complaint_sender ON tbl_complaint_main.cmpid = tbl_complaint_sender.cmpid
      LEFT JOIN tbl_typecomplaint ON tbl_complaint_main.tid = tbl_typecomplaint.tid 
      LEFT JOIN tbl_status ON tbl_complaint_main.statusid = tbl_status.statusid 
      WHERE tbl_complaint_main.tid = 1   
      order by tbl_complaint_main.cmpid desc;
    `;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    data.forEach((item) => {
      item.received_date = new Date(item.received_date).toLocaleDateString(
        "th-TH",
        { timeZone: "Asia/Bangkok" }
      );
    });
    return res.json(data);
  });
});

router.get("/ethics", (req, res) => {
  const sql = `
      SELECT tbl_complaint_main.*, s_firstname, s_lastname, s_email, tname, statusname 
      FROM tbl_complaint_main  
      LEFT JOIN tbl_complaint_sender ON tbl_complaint_main.cmpid = tbl_complaint_sender.cmpid
      LEFT JOIN tbl_typecomplaint ON tbl_complaint_main.tid = tbl_typecomplaint.tid 
      LEFT JOIN tbl_status ON tbl_complaint_main.statusid = tbl_status.statusid 
      WHERE tbl_complaint_main.tid = 2  
      order by tbl_complaint_main.cmpid desc;
    `;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    data.forEach((item) => {
      item.received_date = new Date(item.received_date).toLocaleDateString(
        "th-TH",
        { timeZone: "Asia/Bangkok" }
      );
    });
    return res.json(data);
  });
});

router.post("/complaintupdate", (req, res) => {
  const { statusid, note, cmpid } = req.body;
  console.log(req.body);
  const sql =
    "UPDATE tbl_complaint_main SET statusid = ? , note = ?, completed_date = CURDATE() WHERE cmpid = ?";
  db.query(sql, [statusid, note, cmpid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json({ message: "อัปเดตข้อมูลประเภทผลงานสำเร็จ" });
  });
});

router.get("/typesender", (req, res) => {
  const sql = "SELECT * FROM tbl_typesender";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});

router.get("/complaint/:cmpid/:tid", (req, res) => {
  const cmpid = req.params.cmpid;
  const tid = req.params.tid;
  let sql = `SELECT tbl_complaint_main.*, statusname,
              s_firstname , s_lastname , s_email , s_address, s_card, s_tel, s_age, district, subdistrict, province,
              acc_firstname, acc_lastname, department, topic, detail
              FROM tbl_complaint_main 
              LEFT JOIN tbl_status on tbl_complaint_main.statusid = tbl_status.statusid 
              LEFT JOIN tbl_complaint_sender ON tbl_complaint_main.cmpid = tbl_complaint_sender.cmpid
              LEFT JOIN tbl_complaint_accused ON tbl_complaint_main.cmpid = tbl_complaint_accused.cmpid  
              where tbl_complaint_main.cmpid = ? AND tbl_complaint_main.tid = ?`;
  db.query(sql, [cmpid, tid], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});

router.get("/complaint2/:cmpid", (req, res) => {
  const cmpid = req.params.cmpid;
  let sql = `SELECT tbl_complaint_main.*, statusname,
              s_firstname , s_lastname , s_email , s_address, s_card, s_tel, s_age, district, subdistrict, province,
              acc_firstname, acc_lastname, department, topic, detail
              FROM tbl_complaint_main 
              LEFT JOIN tbl_status on tbl_complaint_main.statusid = tbl_status.statusid 
              LEFT JOIN tbl_complaint_sender ON tbl_complaint_main.cmpid = tbl_complaint_sender.cmpid
              LEFT JOIN tbl_complaint_accused ON tbl_complaint_main.cmpid = tbl_complaint_accused.cmpid  
              where tbl_complaint_main.cmpid = ? `;
  db.query(sql, [cmpid], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});

router.get("/status", (req, res) => {
  const sql = "SELECT * FROM tbl_status";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});

module.exports = router;
