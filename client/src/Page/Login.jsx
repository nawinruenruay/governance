import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/Login.css";

import { IconUser, IconLock } from "@tabler/icons-react";

function Login() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7777/loginadmin", {
        email: Email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      navigate("/complaint/manageadmin");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.response.data.message,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "red",
      });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="screen">
        <div className="loginBx">
          <div className="right-bx">
            <div className="content-login">
              <div className="logo">
                <img src="/src/assets/kpru.png" alt="kpru" />{" "}
              </div>
              <h2>
                งานเทคโนโลยีสารสนเทศ <br />
                สำนักส่งเสริมวิชาการและงานทะเบียน
              </h2>
              <br />
              <form onSubmit={handleLogin}>
                <div className="login-Input">
                  <div className="inputBx">
                    <i className="input-icon">
                      {" "}
                      <IconUser />
                    </i>
                    <input
                      className="input-login"
                      type="text"
                      name="Email"
                      placeholder="ชื่อผู้ใช้"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="inputBx">
                    <i className="input-icon">
                      {" "}
                      <IconLock />
                    </i>
                    <input
                      className="input-login"
                      type="password"
                      name="password"
                      placeholder="รหัสผ่านผู้ใช้"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="btn-submit">
                    <button type="submit" className="admin-loginBtn">
                      เข้าสู่ระบบ
                    </button>
                  </div>
                </div>
              </form>
              <br />
              <h5 style={{ fontSize: "15px" }}>คู่มือการใช้งานระบบ</h5>
              <h5 style={{ fontSize: "15px", marginTop: "5px" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate pariatur asperiores a facilis placeat? Voluptatibus
                nobis placeat aliquam modi provident!
              </h5>
            </div>
          </div>
          <div className="left-bx">
            <div className="content-login"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
