import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../css/Header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconUserCircle, IconLogout, IconUserEdit } from "@tabler/icons-react";
import { Text, Flex } from "@mantine/core";
import { Link } from "react-router-dom";

function Header() {
  const [userDown, setuserDown] = useState(false);
  const [NotiDown, setNotiDown] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/complaint/loginadmin";
    } else {
      axios
        .post("http://localhost:7777/authen", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setName(response.data.decoded.username);
        })
        .catch((error) => {
          window.location.href = "/complaint/loginadmin";
        });
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        userDown &&
        event.target.closest(".hdMenu") === null &&
        event.target.closest(".popup-menu") === null
      ) {
        setuserDown(false);
      }

      if (
        NotiDown &&
        event.target.closest(".hdMenu") === null &&
        event.target.closest(".popup-menu") === null
      ) {
        setNotiDown(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [userDown, NotiDown]);

  const handleUserDown = () => {
    setuserDown(!userDown);
    setNotiDown(false);
  };

  // const handleNotiDown = () => {
  //   setNotiDown(!NotiDown);
  //   setuserDown(false);
  // };

  const handleLogout = () => {
    setuserDown(false);
    Swal.fire({
      title: "คุณต้องการออกจากระบบหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#000",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/complaint/loginadmin");
        localStorage.removeItem("token");
      }
    });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {/* <div className="hdMenu" style={{ marginRight: "20px" }}>
          <Flex display={Flex} onClick={handleNotiDown}>
            <IconBell />
          </Flex>
          <ul className={`popup-menu ${NotiDown ? "active" : ""}`}>
            <li>
              <span>การแจ้งเตือน</span>
            </li>
            <li>
              <span>การแจ้งเตือน</span>
            </li>
            <li>
              <span>การแจ้งเตือน</span>
            </li>
            <li>
              <span>การแจ้งเตือน</span>
            </li>
          </ul>
        </div> */}
        <div className="hdMenu">
          <Flex display={Flex} onClick={handleUserDown}>
            <IconUserCircle />{" "}
            <Text ml={5} size="20px" style={{ textTransform: "lowercase" }}>
              {name}
            </Text>
          </Flex>
          <ul className={`popup-menu ${userDown ? "active" : ""}`}>
            <Link to="/complaint/manageadmin">
              <li>
                <IconUserEdit />
                <span> ข้อมูลแอดมิน</span>
              </li>
            </Link>
            <li onClick={handleLogout}>
              <IconLogout />
              <span> ออกจากระบบ</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
