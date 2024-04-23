import {
  ActionIcon,
  Flex,
  Modal,
  Button,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import {
  IconPlus,
  IconTrash,
  IconEdit,
  IconUser,
  IconAt,
  IconLock,
  IconPasswordUser,
} from "@tabler/icons-react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useValidatedState } from "@mantine/hooks";

function Manageadmin() {
  const [Table, setTable] = useState([]);
  const [ModalAdd, setModalAdd] = useState(false);
  const [ModalChangepwd, setModalChangepwd] = useState(false);
  const [username, setUsername] = useState("");
  const [{ value: email, valid: emailValid }, setEmail] = useValidatedState(
    "",
    (val) => /^\S+@\S+$/.test(val),
    true
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [Admin, setAdmin] = useState([]);
  const [userId, setUserId] = useState("");

  const column = [
    {
      label: "ชื่อผู้ใช้",
      field: "username",
    },
    {
      label: "อีเมล",
      field: "email",
    },
    {
      label: "จัดการ",
      field: "manage",
    },
  ];

  const getAdmin = (id) => {
    axios.get("http://localhost:7777/admin/getid/" + id).then((res) => {
      setAdmin(res.data[0]);
    });
  };

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
          setUserId(response.data.decoded.id);
        })
        .catch((error) => {
          window.location.href = "/complaint/loginadmin";
        });
    }
  }, []);

  const Fetch = () => {
    axios.get("http://localhost:7777/admin").then((res) => {
      const data = res.data;
      if (data.length !== 0) {
        setTable({
          columns: column,
          rows: [
            ...data.map((i, key) => ({
              username: i.username,
              email: i.email,
              manage: (
                <>
                  <Flex gap="xs" justify="center" align="center">
                    <ActionIcon
                      color="green"
                      onClick={() => {
                        getAdmin(i.id);
                        setModalChangepwd(true);
                      }}
                    >
                      <IconPasswordUser />
                    </ActionIcon>
                    {/* <ActionIcon
                      color="orange"
                      onClick={() => {
                        getAdmin(i.id);
                        // setModalUpdate(true);
                      }}
                    >
                      <IconEdit />
                    </ActionIcon> */}
                    {userId !== i.id && (
                      <ActionIcon
                        color="red"
                        onClick={() => handleDelete(i.id)}
                      >
                        <IconTrash />
                      </ActionIcon>
                    )}
                  </Flex>
                </>
              ),
            })),
          ],
        });
      }
    });
  };

  useEffect(() => {
    Fetch();
  }, [userId]);

  const handleAddAdmin = () => {
    if (!username || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3366ff",
      });
      return;
    }
    axios
      .post("http://localhost:7777/admin/add", {
        username,
        email,
        password,
        confirmPassword,
      })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        setModalAdd(false);
        Fetch();
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        Swal.fire("Error!", error.response.data.error, "error");
      });
  };

  const handleChangepwd = async () => {
    if (!password || !newPassword || !confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3366ff",
      });
      return;
    }
    try {
      const data = {
        id: Admin.id,
        password: password,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      };
      const res = await axios.post(
        "http://localhost:7777/admin/changepwd",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "เปลี่ยนรหัสผ่านเรียบร้อย",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setModalChangepwd(false);
          setPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.response.data.error,
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "คุณต้องการลบข้อมูล?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD3333",
      cancelButtonColor: "#000000",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:7777/admindel/${id}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "ลบข้อมูลแอดมินเรียบร้อย",
              showConfirmButton: false,
              timer: 1500,
            });
            Fetch();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลบข้อมูลได้",
            });
          });
      }
    });
  };

  return (
    <>
      <div style={{ background: "#f0f2f8", padding: "28px" }}>
        <div
          style={{
            marginBottom: "15px",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Flex direction={{ base: "column", sm: "row" }} justify="flex-end">
            <Button
              variant="filled"
              color="#3366FF"
              leftSection={<IconPlus />}
              style={{ fontSize: "0.8rem" }}
              onClick={() => {
                setModalAdd(true);
              }}
            >
              เพิ่มข้อมูลแอดมิน
            </Button>
          </Flex>
        </div>
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
          }}
          className="Main-Content"
        >
          <MDBDataTable
            bordered
            hover
            data={Table}
            noBottomColumns
            small
            noRecordsFoundLabel="ไม่พบรายการ"
            searchLabel="ค้นหา"
            infoLabel={["กำลังแสดง", "ถึง", "ของ", "รายการ"]}
            entriesLabel="แสดงรายการ"
            paginationLabel={["ก่อนหน้า", "ถัดไป"]}
            disableRetreatAfterSorting
          />
        </div>
      </div>
      {/* เพิ่มข้อมูลแอดมิน */}
      <Modal
        opened={ModalAdd}
        onClose={() => {
          setModalAdd(false);
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }}
        title="เพิ่มข้อมูลแอดมิน"
        centered
      >
        <TextInput
          label="ชื่อผู้ใช้"
          placeholder="username"
          leftSection={<IconUser />}
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          withAsterisk
        />
        <TextInput
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          error={!emailValid}
          placeholder="email@example.com"
          label="อีเมล"
          leftSection={<IconAt />}
          withAsterisk
        />
        <PasswordInput
          label="รหัสผ่าน"
          placeholder="กรอกรหัสผ่าน"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          leftSection={<IconLock />}
          withAsterisk
        />
        <PasswordInput
          label="ยืนยันรหัสผ่าน"
          placeholder="ยืนยันรหัสผ่านอีกครั้ง"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          leftSection={<IconLock />}
          withAsterisk
        />
        <Button fullWidth mt="md" color="#3366FF" onClick={handleAddAdmin}>
          เพิ่มข้อมูล
        </Button>
      </Modal>
      {/* เปลี่ยนรหัสผ่าน */}
      <Modal
        opened={ModalChangepwd}
        onClose={() => {
          setModalChangepwd(false);
          setPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        }}
        title="เปลี่ยนรหัสผ่าน"
        centered
      >
        <PasswordInput
          label="รหัสผ่านเก่า"
          placeholder="กรอกรหัสผ่านเก่า"
          leftSection={<IconLock />}
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          withAsterisk
        />
        <PasswordInput
          label="รหัสผ่านใหม่"
          placeholder="กรอกรหัสผ่านใหม่"
          value={newPassword}
          onChange={(event) => setNewPassword(event.currentTarget.value)}
          leftSection={<IconLock />}
          withAsterisk
        />
        <PasswordInput
          label="ยืนยันรหัสผ่านใหม่"
          placeholder="ยืนยันรหัสผ่านใหม่อีกครั้ง"
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.currentTarget.value)}
          leftSection={<IconLock />}
          withAsterisk
        />
        <Button fullWidth mt="md" color="#3366FF" onClick={handleChangepwd}>
          เปลี่ยนรหัสผ่าน
        </Button>
      </Modal>
    </>
  );
}

export default Manageadmin;
