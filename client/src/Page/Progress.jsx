import {
  ActionIcon,
  Flex,
  Modal,
  Button,
  TextInput,
  ScrollArea,
  Select,
  Image,
  Textarea,
  Card,
  Text,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DownloadButton from "../components/DownloadButton";

function Progress() {
  const [Table, setTable] = useState([]);
  const [ModalUpdate, setModalUpdate] = useState(false);
  const [ModalDetail, setModalDetail] = useState(false);

  const [Statusid, setStatusid] = useState("");
  const [Status, setStatus] = useState([]);
  const [Complaint, setComplaint] = useState([]);
  const [Note, setNote] = useState("");

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
    axios.get("http://localhost:7777/progress").then((res) => {
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

export default Progress;
