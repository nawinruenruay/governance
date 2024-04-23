import {
  ActionIcon,
  Flex,
  Modal,
  Button,
  TextInput,
  ScrollArea,
  Select,
  FileInput,
  Image,
  CheckIcon,
  Radio,
  SimpleGrid,
  Textarea,
  Card,
  Text,
} from "@mantine/core";
import { IconRefresh, IconPlus, IconFilePlus } from "@tabler/icons-react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DownloadButton from "../components/DownloadButton";
// import { json } from "react-router-dom";

function Complaint() {
  const [Table, setTable] = useState([]);
  const [ModalUpdate, setModalUpdate] = useState(false);
  const [ModalDetail, setModalDetail] = useState(false);
  const [ModalAdd, setModalAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  const [Tid, setTid] = useState("");
  const [Tsid, setTsid] = useState("");
  const [T_other, setT_other] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // ตัวแปรผู้ร้องเรียน
  const [S_firstname, setS_firstname] = useState("");
  const [S_lastname, setS_lastname] = useState("");
  const [S_tel, setS_tel] = useState("");
  const [S_address, setS_address] = useState("");
  const [S_email, setS_email] = useState("");
  const [S_card, setS_card] = useState("");
  const [S_age, setS_age] = useState("");
  const [District, setDistrict] = useState("");
  const [Subdistrict, setSubdistrict] = useState("");
  const [Province, setProvince] = useState("");

  // ตัวแปรผู้ถูกร้องเรียน
  const [Acc_firstname, setAcc_firstname] = useState("");
  const [Acc_lastname, setAcc_lastname] = useState("");
  const [Department, setDepartment] = useState("");
  const [Topic, setTopic] = useState("");
  const [Detail, setDetail] = useState("");

  const [Statusid, setStatusid] = useState("");
  const [Status, setStatus] = useState([]);
  const [Complaint, setComplaint] = useState([]);
  const [Typesender, setTypesender] = useState([]);
  const [Note, setNote] = useState("");

  const [pv, setPv] = useState([]);
  const [File, setFile] = useState([]);
  const fileType =
    Complaint && Complaint.file ? Complaint.file.split(".").pop() : "";

  const column = [
    {
      label: "เลขที่คำร้อง",
      field: "tracking",
    },
    {
      label: "ชื่อ",
      field: "s_firstname",
    },
    {
      label: "นามสกุล",
      field: "s_lastname",
    },
    {
      label: "อีเมล",
      field: "s_email",
    },
    {
      label: "ประเภท",
      field: "tname",
    },
    {
      label: "รายละเอียด",
      field: "view",
    },
    {
      label: "วันที่",
      field: "received_date",
    },
    {
      label: "สถานะ",
      field: "statusname",
    },
    {
      label: "อัปเดต",
      field: "manage",
    },
  ];

  const Fetch = () => {
    axios.get("http://localhost:7777/complaint").then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data.length !== 0) {
        setTable({
          columns: column,
          rows: [
            ...data.map((i, key) => ({
              tracking: i.tracking,
              s_firstname: i.s_firstname || "ไม่เปิดเผยตัวตน",
              s_lastname: i.s_lastname || "ไม่เปิดเผยตัวตน",
              s_email: i.s_email || "ไม่เปิดเผยตัวตน",
              tname: i.tname,
              received_date: i.received_date,
              statusname: (
                <>
                  <Flex
                    gap="xs"
                    justify="center"
                    align="center"
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "20px",
                      backgroundColor:
                        {
                          1: "rgb(255, 128, 128)",
                          2: "rgb(244, 208, 63)",
                          3: "rgb(168, 223, 142)",
                          4: "rgb(217, 172, 245)",
                        }[i.statusid] || "transparent",
                    }}
                  >
                    <div style={{ padding: "3px" }}>{i.statusname}</div>
                  </Flex>
                </>
              ),
              view: (
                <>
                  <Button
                    variant="filled"
                    size="xs"
                    color="violet"
                    radius="lg"
                    onClick={() => {
                      getComplaint(i.cmpid, i.tid);
                      setModalDetail(true);
                    }}
                  >
                    ดูรายละเอียดเพิ่มเติม
                  </Button>
                </>
              ),
              manage: (
                <>
                  <Flex gap="xs" justify="center" align="center">
                    <ActionIcon
                      color="orange"
                      onClick={() => {
                        getComplaint2(i.cmpid);
                        setModalUpdate(true);
                      }}
                    >
                      <IconRefresh />
                    </ActionIcon>
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
    getTypesender();
    getStatus();
  }, []);

  const getComplaint = (v1, v2) => {
    axios.get(`http://localhost:7777/complaint/${v1}/${v2}`).then((res) => {
      setComplaint(res.data[0]);
    });
  };

  const getComplaint2 = (v) => {
    axios.get("http://localhost:7777/complaint2/" + v).then((res) => {
      setComplaint(res.data[0]);
      setNote(res.data[0].note);
    });
  };

  const getStatus = () => {
    axios.get("http://localhost:7777/status").then((res) => {
      setStatus(res.data);
    });
  };

  const getTypesender = () => {
    axios.get("http://localhost:7777/typesender").then((res) => {
      setTypesender(res.data);
    });
  };

  const handleRadioChange = (v, value) => {
    setSelectedOption(v);
    setTid(value);
  };

  const handleRadioChange2 = (v) => {
    setSelectedOption2(v);
  };

  const HandleFile = (val) => {
    setPv([]);
    setFile(val);
    val.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("image")) {
          setPv((prevPv) => [...prevPv, { type: "image", url: reader.result }]);
        } else if (file.type === "application/pdf") {
          const blobUrl = URL.createObjectURL(file);
          setPv((prevPv) => [...prevPv, { type: "pdf", url: blobUrl }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // เพิ่มข้อมูลผู้ร้องเรียนทั่วไป
  const handleAdd1 = async () => {
    if (
      !Tid ||
      !Tsid ||
      !S_firstname ||
      !S_lastname ||
      !S_tel ||
      !S_email ||
      !Acc_firstname ||
      !Acc_lastname ||
      !Department ||
      !Topic ||
      !Detail
    ) {
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
        tid: Tid,
        tsid: Tsid,
        t_other: T_other,
        s_firstname: S_firstname,
        s_lastname: S_lastname,
        s_tel: S_tel,
        s_email: S_email,
        acc_firstname: Acc_firstname,
        acc_lastname: Acc_lastname,
        department: Department,
        topic: Topic,
        detail: Detail,
      };
      const res = await axios.post(
        "http://localhost:7777/complaintadd1",
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
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setModalAdd(false);
          Fetch();
          setTid("");
          setTsid("");
          setT_other("");
          setS_firstname("");
          setS_lastname("");
          setS_tel("");
          setS_email("");
          setAcc_firstname("");
          setAcc_lastname("");
          setDepartment("");
          setTopic("");
          setDetail("");
          setSelectedOption("");
          setSelectedOption2("");
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

  // เพิ่มข้อมูลผู้ร้องเรียนแบบเปิดเผยตัวตน
  const handleAdd2 = async () => {
    if (
      !Tid ||
      !S_firstname ||
      !S_lastname ||
      !S_tel ||
      !S_address ||
      !S_email ||
      !S_card ||
      !S_age ||
      !District ||
      !Subdistrict ||
      !Province ||
      !Acc_firstname ||
      !Acc_lastname ||
      !Department ||
      !Topic ||
      !Detail
    ) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3366ff",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("tid", Tid);
      formData.append("s_firstname", S_firstname);
      formData.append("s_lastname", S_lastname);
      formData.append("s_tel", S_tel);
      formData.append("s_address", S_address);
      formData.append("s_email", S_email);
      formData.append("s_card", S_card);
      formData.append("s_age", S_age);
      formData.append("district", District);
      formData.append("subdistrict", Subdistrict);
      formData.append("province", Province);
      formData.append("acc_firstname", Acc_firstname);
      formData.append("acc_lastname", Acc_lastname);
      formData.append("department", Department);
      formData.append("topic", Topic);
      formData.append("detail", Detail);

      if (File.length > 0) {
        File.forEach((file) => {
          formData.append("file", file);
        });
      }

      const res = await axios.post(
        "http://localhost:7777/complaintadd2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setModalAdd(false);
          Fetch();
          setTid("");
          setS_firstname("");
          setS_lastname("");
          setS_tel("");
          setS_address("");
          setS_email("");
          setS_card("");
          setS_age("");
          setDistrict("");
          setSubdistrict("");
          setProvince("");
          setAcc_firstname("");
          setAcc_lastname("");
          setDepartment("");
          setTopic("");
          setDetail("");
          setFile([]);
          setPv([]);
          setSelectedOption("");
          setSelectedOption2("");
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

  // เพิ่มข้อมูลผู้ร้องเรียนแบบไม่เปิดเผยตัวตน
  const handleAdd3 = async () => {
    if (
      !Tid ||
      !Acc_firstname ||
      !Acc_lastname ||
      !Department ||
      !Topic ||
      !Detail
    ) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3366ff",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("tid", Tid);
      formData.append("acc_firstname", Acc_firstname);
      formData.append("acc_lastname", Acc_lastname);
      formData.append("department", Department);
      formData.append("topic", Topic);
      formData.append("detail", Detail);

      if (File.length > 0) {
        File.forEach((file) => {
          formData.append("file", file);
        });
      }

      const res = await axios.post(
        "http://localhost:7777/complaintadd3",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setModalAdd(false);
          Fetch();
          setTid("");
          setAcc_firstname("");
          setAcc_lastname("");
          setDepartment("");
          setTopic("");
          setDetail("");
          setFile([]);
          setPv([]);
          setSelectedOption("");
          setSelectedOption2("");
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
  // อัปเดตสถานะการร้องเรียน
  const handleUpdate = async () => {
    if (!Statusid) {
      Swal.fire({
        icon: "error",
        title: "กรุณาเลือกสถานะการร้องเรียน",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3366ff",
      });
      return;
    }
    try {
      const data = {
        cmpid: Complaint.cmpid,
        statusid: Statusid,
        note: Note,
      };
      const res = await axios.post(
        "http://localhost:7777/complaintupdate",
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
          title: "อัปเดตข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setModalUpdate(false);
          Fetch();
          setStatusid("");
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
              เพิ่มข้อมูลร้องเรียน
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
        {/* เพิ่มข้อมูลร้องเรียน */}
        <Modal
          opened={ModalAdd}
          onClose={() => {
            setModalAdd(false);
            setSelectedOption("");
            setSelectedOption2("");
          }}
          scrollAreaComponent={ScrollArea.Autosize}
          size="70%"
          centered
        >
          <Flex
            mih={50}
            bg="#bceaf7"
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap-reverse"
            p={13}
          >
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
              ระบบการรับและดำเนินการข้อร้องเรียนเรื่องการฝ่าฝืนจริยธรรม
              การปฏิบัติหรือละเว้นการปฏิบัติหน้าที่โดยมิชอบตามประมวลจริยธรรมของบุคลากรในมหาวิทยาลัยราชภัฏกำแพงเพชร
            </h4>
          </Flex>
          <br />
          <h4 style={{ fontWeight: "bold" }}>เลือกประเภทการร้องเรียน</h4>
          <Radio
            icon={CheckIcon}
            label="ร้องเรียนทั่วไป"
            name="genaral"
            value="1"
            checked={selectedOption === "general"}
            onChange={() => handleRadioChange("general", "1")}
          />
          <Radio
            icon={CheckIcon}
            label="ร้องเรียนการฝ่าฝืนจริยธรรม"
            name="ethics"
            value="2"
            checked={selectedOption === "ethics"}
            onChange={() => handleRadioChange("ethics", "2")}
          />

          <hr />

          {selectedOption === "general" && (
            <>
              <Flex
                mih={50}
                bg="#fbc6ca"
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap-reverse"
                p={13}
              >
                <h4 style={{ textAlign: "left", fontWeight: "bold" }}>
                  หมายเหตุ :
                  การร้องเรียนทั่วไปเพื่อพัฒนาและปรับปรุงการปฏิบัติงานของบุคลากรของมหาวิทยาลัย
                </h4>
              </Flex>
              <div
                style={{
                  border: "1px solid rgb(89, 86, 86)",
                  padding: "15px",
                  marginTop: "20px",
                }}
              >
                <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  ข้อมูลผู้ร้องเรียน
                </h4>
                <div style={{ padding: "10px" }}>
                  <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
                    <TextInput
                      label="ชื่อ"
                      name="s_firstname"
                      onChange={(event) => setS_firstname(event.target.value)}
                      withAsterisk
                    />
                    <TextInput
                      label="นามสกุล"
                      name="s_lastname"
                      onChange={(event) => setS_lastname(event.target.value)}
                      withAsterisk
                    />
                    <TextInput
                      label="เบอร์โทรศัพท์"
                      name="s_tel"
                      onChange={(event) => setS_tel(event.target.value)}
                      withAsterisk
                    />
                    <TextInput
                      label="อีเมล"
                      name="s_email"
                      onChange={(event) => setS_email(event.target.value)}
                      withAsterisk
                    />
                    <Select
                      label="ประเภทผู้ร้องเรียน"
                      placeholder="--เลือกประเภทผู้ร้องเรียน--"
                      data={Typesender.map((Typesender) => Typesender.tsname)}
                      clearable
                      name="tsid"
                      checkIconPosition="right"
                      searchable
                      withAsterisk
                      onChange={(value) => {
                        const select = Typesender.find(
                          (item) => item.tsname === value
                        );
                        if (select) {
                          setTsid(select.tsid);
                          setSelectedType(value);
                        }
                      }}
                    />
                    {selectedType === "อื่น ๆ" && (
                      <TextInput
                        label="ประเภทผู้ร้องเรียน (อื่น ๆ)"
                        onChange={(e) => setT_other(e.target.value)}
                      />
                    )}
                  </SimpleGrid>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid rgb(89, 86, 86)",
                  padding: "15px",
                  marginTop: "20px",
                }}
              >
                <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  ข้อมูลผู้ถูกร้องเรียน
                </h4>
                <div style={{ padding: "10px" }}>
                  <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
                    <TextInput
                      label="ชื่อ"
                      name="acc_firstname"
                      onChange={(event) => setAcc_firstname(event.target.value)}
                      withAsterisk
                    />
                    <TextInput
                      label="นามสกุล"
                      name="acc_lastname"
                      onChange={(event) => setAcc_lastname(event.target.value)}
                      withAsterisk
                    />
                    <TextInput
                      label="สังกัด"
                      name="department"
                      onChange={(event) => setDepartment(event.target.value)}
                      withAsterisk
                    />
                    <TextInput
                      label="เรื่อง"
                      name="topic"
                      onChange={(event) => setTopic(event.target.value)}
                      withAsterisk
                    />
                    <Textarea
                      label="รายละเอียด"
                      autosize
                      name="detail"
                      minRows={3}
                      onChange={(event) => setDetail(event.target.value)}
                      withAsterisk
                    />
                  </SimpleGrid>
                </div>
              </div>
              <Button fullWidth mt="md" color="#3366FF" onClick={handleAdd1}>
                บันทึกข้อมูล
              </Button>
            </>
          )}

          {selectedOption === "ethics" && (
            <>
              <div style={{ display: "flex", gap: "20px" }}>
                <Radio
                  icon={CheckIcon}
                  label="เปิดเผยตัวตน"
                  checked={selectedOption2 === "select1"}
                  onChange={() => handleRadioChange2("select1")}
                />
                <Radio
                  icon={CheckIcon}
                  label="ไม่เปิดเผยตัวตน"
                  checked={selectedOption2 === "select2"}
                  onChange={() => handleRadioChange2("select2")}
                />
              </div>
              {selectedOption2 === "select1" && (
                <>
                  <div
                    style={{
                      border: "1px solid rgb(89, 86, 86)",
                      padding: "15px",
                      marginTop: "20px",
                    }}
                  >
                    <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      ข้อมูลผู้ร้องเรียน
                    </h4>
                    <div style={{ padding: "10px" }}>
                      <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
                        <TextInput
                          label="ชื่อ"
                          name="s_firstname"
                          onChange={(event) =>
                            setS_firstname(event.target.value)
                          }
                          withAsterisk
                        />
                        <TextInput
                          label="นามสกุล"
                          name="s_lastname"
                          onChange={(event) =>
                            setS_lastname(event.target.value)
                          }
                          withAsterisk
                        />
                        <TextInput
                          label="เลขบัตรประจำตัวประชาชน"
                          name="s_card"
                          onChange={(event) => setS_card(event.target.value)}
                          withAsterisk
                        />
                        <TextInput
                          label="อายุ"
                          name="s_age"
                          onChange={(event) => setS_age(event.target.value)}
                          withAsterisk
                        />
                        <TextInput
                          label="ทีอยู่"
                          name="s_address"
                          onChange={(event) => setS_address(event.target.value)}
                          withAsterisk
                        />
                        <TextInput
                          label="ตำบล"
                          name="subdistrict"
                          onChange={(event) =>
                            setSubdistrict(event.target.value)
                          }
                          withAsterisk
                        />
                        <TextInput
                          label="อำเภอ"
                          name="district"
                          onChange={(event) => setDistrict(event.target.value)}
                          withAsterisk
                        />
                        <TextInput
                          label="จังหวัด"
                          name="province"
                          onChange={(event) => setProvince(event.target.value)}
                          withAsterisk
                        />
                        <TextInput
                          label="อีเมล"
                          name="s_email"
                          onChange={(event) => setS_email(event.target.value)}
                          withAsterisk
                        />
                        <TextInput
                          label="เบอร์โทรศัพท์"
                          name="s_tel"
                          onChange={(event) => setS_tel(event.target.value)}
                          withAsterisk
                        />
                      </SimpleGrid>
                    </div>
                  </div>
                  <div
                    style={{
                      border: "1px solid rgb(89, 86, 86)",
                      padding: "15px",
                      marginTop: "20px",
                    }}
                  >
                    <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      ข้อมูลผู้ถูกร้องเรียน
                    </h4>
                    <div style={{ padding: "10px" }}>
                      <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
                        <TextInput
                          label="ชื่อ"
                          name="acc_firstname"
                          onChange={(event) =>
                            setAcc_firstname(event.target.value)
                          }
                          withAsterisk
                        />
                        <TextInput
                          label="นามสกุล"
                          name="acc_lastname"
                          onChange={(event) =>
                            setAcc_lastname(event.target.value)
                          }
                          withAsterisk
                        />
                        <TextInput
                          label="สังกัด"
                          name="department"
                          onChange={(event) =>
                            setDepartment(event.target.value)
                          }
                          withAsterisk
                        />
                        <TextInput
                          label="เรื่อง"
                          name="topic"
                          onChange={(event) => setTopic(event.target.value)}
                          withAsterisk
                        />
                        <Textarea
                          label="รายละเอียด: (เหตุแห่งการร้องเรียน พร้อมทั้งข้อเท็จจริงหรือพฤติกรรมที่เกี่ยวข้องตามสมควรแห่งมูลกรณี)"
                          autosize
                          name="detail"
                          minRows={3}
                          onChange={(event) => setDetail(event.target.value)}
                          withAsterisk
                        />
                        <FileInput
                          label="ข้อมูลประกอบหลักฐาน (ถ้ามี) ไม่เกิน 100MB (pdf,png,jpg,jpeg)"
                          multiple
                          value={File}
                          onChange={HandleFile}
                          leftSection={<IconFilePlus />}
                          placeholder="เลือกไฟล์"
                          leftSectionPointerEvents="none"
                          clearable
                          accept=".pdf, .png, .jpg, .jpeg"
                        />
                        {pv.map((item, index) => (
                          <div key={index}>
                            {item.type === "image" && (
                              <Image src={item.url} h="100%" />
                            )}
                            {item.type === "pdf" && (
                              <iframe
                                src={item.url}
                                width="100%"
                                height="500px"
                              />
                            )}
                          </div>
                        ))}
                      </SimpleGrid>
                    </div>
                  </div>
                  <Button
                    fullWidth
                    mt="md"
                    color="#3366FF"
                    onClick={handleAdd2}
                  >
                    บันทึกข้อมูล
                  </Button>
                </>
              )}
              {selectedOption2 === "select2" && (
                <>
                  <Flex
                    mih={50}
                    bg="#fbc6ca"
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap-reverse"
                    p={13}
                    mt={5}
                  >
                    <h5 style={{ textAlign: "left", fontWeight: "bold" }}>
                      หมายเหตุ:
                      ข้อร้องเรียนที่ไม่เปิดเผยตัวตนผู้ร้องเรียนอาจไม่ได้รับการพิจารณา
                      หากไม่ปรากฏหลักฐานที่เกี่ยวข้องอย่างชัดแจ้ง
                    </h5>
                  </Flex>
                  <div
                    style={{
                      border: "1px solid rgb(89, 86, 86)",
                      padding: "15px",
                      marginTop: "20px",
                    }}
                  >
                    <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      ข้อมูลผู้ถูกร้องเรียน
                    </h4>
                    <div style={{ padding: "10px" }}>
                      <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
                        <TextInput
                          label="ชื่อ"
                          name="acc_firstname"
                          onChange={(event) =>
                            setAcc_firstname(event.target.value)
                          }
                          withAsterisk
                        />
                        <TextInput
                          label="นามสกุล"
                          name="acc_lastname"
                          onChange={(event) =>
                            setAcc_lastname(event.target.value)
                          }
                          withAsterisk
                        />
                        <TextInput
                          label="สังกัด"
                          name="department"
                          onChange={(event) =>
                            setDepartment(event.target.value)
                          }
                          withAsterisk
                        />
                        <TextInput
                          label="เรื่อง"
                          name="topic"
                          onChange={(event) => setTopic(event.target.value)}
                          withAsterisk
                        />
                        <Textarea
                          label="รายละเอียด: (เหตุแห่งการร้องเรียน พร้อมทั้งข้อเท็จจริงหรือพฤติกรรมที่เกี่ยวข้องตามสมควรแห่งมูลกรณี)"
                          autosize
                          name="detail"
                          minRows={3}
                          onChange={(event) => setDetail(event.target.value)}
                          withAsterisk
                        />
                        <FileInput
                          label="ข้อมูลประกอบหลักฐาน (ถ้ามี) ไม่เกิน 100MB (pdf,png,jpg,jpeg)"
                          multiple
                          value={File}
                          onChange={HandleFile}
                          leftSection={<IconFilePlus />}
                          placeholder="เลือกไฟล์"
                          leftSectionPointerEvents="none"
                          clearable
                          accept=".pdf, .png, .jpg, .jpeg"
                        />
                        {pv.map((item, index) => (
                          <div key={index}>
                            {item.type === "image" && (
                              <Image src={item.url} h="100%" />
                            )}
                            {item.type === "pdf" && (
                              <iframe
                                src={item.url}
                                width="100%"
                                height="500px"
                              />
                            )}
                          </div>
                        ))}
                      </SimpleGrid>
                    </div>
                  </div>
                  <Button
                    fullWidth
                    mt="md"
                    color="#3366FF"
                    onClick={handleAdd3}
                  >
                    บันทึกข้อมูล
                  </Button>
                </>
              )}
            </>
          )}
        </Modal>
      </div>
      {/* อัปเดตสถานะการร้องเรียน */}
      <Modal
        opened={ModalUpdate}
        onClose={() => {
          setModalUpdate(false);
          setStatusid("");
        }}
        title="อัปเดตสถานะการร้องเรียน"
        size="25%"
        centered
      >
        <h5>เลขที่คำร้อง : {Complaint.tracking} </h5>
        <Select
          label="สถานะการร้องเรียน"
          data={Status.map((status) => status.statusname)}
          clearable
          name="statusid"
          checkIconPosition="right"
          searchable
          withAsterisk
          value={
            Status.find((item) => item.statusid === Statusid)?.statusname ||
            Complaint.statusname
          }
          onChange={(value) => {
            const select = Status.find((item) => item.statusname === value);
            if (select) {
              setStatusid(select.statusid);
            }
          }}
        />
        <Textarea
          label="หมายเหตุ"
          name="note"
          value={Note}
          onChange={(event) => setNote(event.target.value)}
          minRows={5}
          autosize
          withAsterisk
        />
        <Button fullWidth mt="md" color="#3366FF" onClick={handleUpdate}>
          อัปเดตข้อมูล
        </Button>
      </Modal>
      {/* ดูรายละเอียดเพิ่มเติม */}
      <Modal
        opened={ModalDetail}
        onClose={() => {
          setModalDetail(false);
        }}
        title={
          <Text
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            เลขที่คำร้อง : {Complaint.tracking} {Complaint.s_firstname}{" "}
            {Complaint.s_lastname}
          </Text>
        }
        size="100%"
        scrollAreaComponent={ScrollArea.Autosize}
        centered
      >
        {Complaint.tid === 1 ? (
          <>
            <Flex
              mih={50}
              gap="sm"
              justify="center"
              align="center"
              direction="row"
              alignItems="stretch"
              wrap="wrap"
              mt={5}
              style={{ display: "flex" }}
            >
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ flex: "1 1 30%", height: "500px" }}
              >
                <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                  รายละเอียดผู้ร้องเรียน
                </h4>
                <TextInput
                  label="ชื่อ"
                  name="s_firstname"
                  value={Complaint.s_firstname}
                />
                <TextInput
                  label="นามสกุล"
                  name="s_lastname"
                  value={Complaint.s_lastname}
                />
                <TextInput
                  label="เบอร์โทรศัพท์"
                  name="s_tel"
                  value={Complaint.s_tel}
                />
                <TextInput
                  label="อีเมล"
                  name="s_email"
                  value={Complaint.s_email}
                />
              </Card>

              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ flex: "1 1 30%", height: "500px" }}
              >
                <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                  รายละเอียดผู้ถูกร้องเรียน
                </h4>
                <TextInput
                  label="ชื่อ"
                  name="acc_firstname"
                  value={Complaint.acc_firstname}
                />
                <TextInput
                  label="นามสกุล"
                  name="acc_lastname"
                  value={Complaint.acc_lastname}
                />
                <TextInput
                  label="สังกัด"
                  name="department"
                  value={Complaint.department}
                />
                <TextInput
                  label="เรื่องที่ถูกร้องเรียน"
                  name="topic"
                  value={Complaint.topic}
                />
                <Textarea
                  label="รายละเอียด (ข้อเท็จจริง)"
                  name="detail"
                  value={Complaint.detail}
                  minRows={5}
                  autosize
                />
              </Card>
            </Flex>
          </>
        ) : (
          <>
            <Flex
              mih={50}
              gap="sm"
              justify="center"
              align="center"
              direction="row"
              alignItems="stretch"
              wrap="wrap"
              mt={5}
              style={{ display: "flex" }}
            >
              {Complaint.s_firstname && (
                <>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ flex: "1 1 30%", height: "1150px" }}
                  >
                    <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                      รายละเอียดผู้ร้องเรียน
                    </h4>
                    <TextInput
                      label="ชื่อ"
                      name="s_firstname"
                      value={Complaint.s_firstname}
                    />
                    <TextInput
                      label="นามสกุล"
                      name="s_lastname"
                      value={Complaint.s_lastname}
                    />
                    <TextInput
                      label="อายุ"
                      name="s_age"
                      value={Complaint.s_age}
                    />
                    <TextInput
                      label="อีเมล"
                      name="s_email"
                      value={Complaint.s_email}
                    />
                    <Textarea
                      label="ที่อยู่"
                      name="s_address"
                      value={Complaint.s_address}
                    />
                    <TextInput
                      label="ตำบล"
                      name="subdistrict"
                      value={Complaint.subdistrict}
                    />
                    <TextInput
                      label="อำเภอ"
                      name="district"
                      value={Complaint.district}
                    />
                    <TextInput
                      label="จังหวัด"
                      name="province"
                      value={Complaint.province}
                    />
                    <TextInput
                      label="เลขบัตรประชาชน"
                      name="s_card"
                      value={Complaint.s_card}
                    />
                    <TextInput
                      label="เบอร์โทรศัพท์"
                      name="s_tel"
                      value={Complaint.s_tel}
                    />
                  </Card>
                </>
              )}
              {/* Card รายละเอียดผู้ถูกร้องเรียน */}
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ flex: "1 1 30%", height: "1150px" }}
              >
                <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                  รายละเอียดผู้ถูกร้องเรียน
                </h4>
                <TextInput
                  label="ชื่อ"
                  name="acc_firstname"
                  value={Complaint.acc_firstname}
                />
                <TextInput
                  label="นามสกุล"
                  name="acc_lastname"
                  value={Complaint.acc_lastname}
                />
                <TextInput
                  label="สังกัด"
                  name="department"
                  value={Complaint.department}
                />
                <TextInput
                  label="เรื่องที่ถูกร้องเรียน"
                  name="topic"
                  value={Complaint.topic}
                />
              </Card>

              {/* Card รายละเอียดการร้องเรียน */}
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ flex: "1 1 30%", height: "1150px" }}
              >
                <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                  รายละเอียดการร้องเรียน
                </h4>
                <Textarea
                  label="รายละเอียด (ข้อเท็จจริง)"
                  name="detail"
                  value={Complaint.detail}
                  minRows={5}
                  autosize
                />
                <Text mt={10} fz={14}>
                  ไฟล์หลักฐาน
                </Text>
                <Flex
                  mih={50}
                  gap="sm"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="wrap"
                  w="auto"
                  mt={10}
                >
                  {fileType === "pdf" ? (
                    <>
                      <embed
                        src={`http://localhost:7777/pdf/${Complaint.file}`}
                        width="700px"
                        height="600px"
                      />
                    </>
                  ) : (
                    <>
                      {Complaint.file && (
                        <>
                          <Image
                            src={`http://localhost:7777/img/${Complaint.file}`}
                            w="100%"
                          />
                          <DownloadButton
                            fileUrl={`http://localhost:7777/img/${Complaint.file}`}
                          />
                        </>
                      )}
                    </>
                  )}
                </Flex>
              </Card>
            </Flex>
          </>
        )}
      </Modal>
    </>
  );
}

export default Complaint;
