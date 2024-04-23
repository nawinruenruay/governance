import React from "react";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer>
      <div className="footer p-10 text-base-content bg-white">
        <aside>
          <img src={Logo} alt="" className="w-72" />
          <p>
            คณะกรรมการธรรมาภิบาลและจริยธรรม มหาวิทยาลัยราชภัฏกำแพงเพชร
            <br />
            69 หมู่ 1 ต.นครชุม อ.เมือง จ.กำแพงเพชร 62000
            <br />
            โทรศัพท์ 055-550505 | 1102 แฟกซ์ 055-505050
          </p>
        </aside>
        <nav>
          <h6 className="text-blue-900 text-base">เกี่ยวกับ</h6>
          <Link to="/" className=" hover:text-blue-800 no-underline">
            ข้อมูลพื้นฐาน
          </Link>
          <Link to="/" className=" hover:text-blue-800 no-underline">
            โครงสร้างคณะกรรมการ
          </Link>
          <Link to="/" className=" hover:text-blue-800 no-underline">
            คณะกรรมาการ
          </Link>
          <Link to="/" className=" hover:text-blue-800 no-underline">
            สารจากประธานคณะกรรมาการ
          </Link>
          <Link to="/" className=" hover:text-blue-800 no-underline">
            สารจากอธิการบดี
          </Link>
        </nav>
        <nav>
          <h6 className="text-blue-900 text-base">การขับเคลื่อนธรรมาภิบาล</h6>
          <Link to="/" className="hover:text-blue-800 no-underline">
            นโยบาย
          </Link>
          <Link to="/" className="hover:text-blue-800 no-underline">
            ปฎิทินการดำเนินงาน
          </Link>
          <Link to="/" className="hover:text-blue-800 no-underline">
            ประมวลจริยธรรม
          </Link>
          <Link to="/" className="hover:text-blue-800 no-underline">
            แผนปฎิบัติการด้านจริยธรรม
          </Link>
        </nav>
        <nav>
          <h6 className="text-blue-900 text-base">การเปิดเผยข้อมูล</h6>
          <Link to="/" className="hover:text-blue-800 no-underline">
            เอกสารเผยแพร่
          </Link>
          <Link to="/" className="hover:text-blue-800 no-underline">
            แบบฟอร์มต่างๆ
          </Link>
          <Link to="/" className="hover:text-blue-800 no-underline">
            รายงานผลการดำเนินงานประจำปี
          </Link>
        </nav>
        <nav>
          <h6 className="text-blue-900 text-base">ติดต่อเรา</h6>
          <Link to="/" className="hover:text-blue-800 no-underline">
            สายตรงรองอธิการบดีฝ่ายบริหาร
          </Link>
          <Link to="/" className="hover:text-blue-800 no-underline">
            สายตรงเจ้าหน้าที่
          </Link>
        </nav>
      </div>
      <p className="w-full text-sm text-center p-4 text-white bg-blue-900">
        Copyright © 2020 NongPeemai
      </p>
    </footer>
  );
}
export default Footer;
