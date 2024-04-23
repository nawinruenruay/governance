import React from "react";
import Slider from "../components/Slide";
import Video1 from "../assets/img/Video01.mp4";
import K3 from "../assets/img/k3.jpg";
import K4 from "../assets/img/k4.jpg";
import "../index.css";
import Slide3 from "../components/Slide2";

function Home() {
  return (
    <div>
      <Slider />
      <section>
        <div className="xl:w-6/12 bg-blue-800 xl:p-10 rounded-r-full xl:my-16 text-white xl:text-2xl md:w-full sm:h-auto sm:text-lg my-8 p-5">
          <p>
            กลไก ส่งเสริม และบังคับใช้ แนวปฏิบัติตามหลักธรรมาภิบาลของมหาวิทยาลัย
          </p>
        </div>
        <div className="bg-img1 flex lg:flex-row flex-col items-center justify-center min-w-screen-xl">
          <div
            className="grid grid-cols-1  md:grid-cols-2 "
            style={{ flex: "80%" }}
          >
            <button className="flex w-60 items-center  text-white rounded-lg m-4 border border-white">
              <p className="mr-2 w-16 h-full bg-yellow-500 p-4 rounded-l-lg text-2xl font-bold">
                1
              </p>
              ประมวลจริยธรรม
            </button>
            <button className="flex w-60 items-center text-white rounded-lg m-4 border border-white">
              <p className="mr-2 w-16 h-full bg-yellow-500 p-4 rounded-l-lg text-2xl font-bold">
                2
              </p>
              ประกาศคณะกรรมการ
            </button>
            <button className="flex w-60 items-center text-white rounded-lg m-4 border border-white">
              <p className="mr-2 w-16 h-full bg-yellow-500 p-4 rounded-l-lg text-2xl font-bold">
                3
              </p>
              <p>
                แผนปฏิบัติการ
                <br />
                ด้านจริยธรรม
              </p>
            </button>
            <button className="flex w-60 items-center text-white rounded-lg m-4 border border-white">
              <p className="mr-2 w-16 h-full bg-yellow-500 p-4 rounded-l-lg text-2xl font-bold">
                4
              </p>
              แนวปฏิบัติ
              <br /> Dos & Dont's
            </button>
            <button className="flex w-60 items-center text-white rounded-lg m-4 border border-white">
              <p className="mr-2 w-16 h-full bg-yellow-500 p-4 rounded-l-lg text-2xl font-bold">
                5
              </p>
              E-Book
            </button>
            <button className="flex w-60 items-center text-white rounded-lg m-4  border border-white">
              <p className="mr-2 w-16 h-full bg-yellow-500 p-4 rounded-l-lg text-2xl font-bold">
                6
              </p>
              การเปิดเผยด้านจริยธรรม
            </button>
          </div>
          <div className="flex">
            <video controls>
              <source src={Video1} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      <div className="bg-img2 items-center justify-center min-w-screen-xl mt-24">
        <p className="text-blue-800 xl:text-3xl text-center font-bold text-lg">
          นโยบาย/แนวปฏิบัติ/มาตรการด้านธรรมาภิบาลของมหาวิทยาลัย
        </p>
        <div className="flex flex-wrap py-16 px-6 justify-center">
          <div className="sm:w-1/2 lg:w-[23%] lg:mx-2">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={K3}
                  className="bg-img4 lg:h-32 md:h-48 w-full object-cover object-center"
                />
                <p className="absolute text-white text-xl font-normal top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  ข้อบังคับ
                </p>
              </div>
              <div className="p-6 bg-indigo-700 text-white h-full overflow-y-auto">
                <h1 className="text-2xl font-semibold mb-3">
                  Mountains are alone
                </h1>
                <ul className="leading-relaxed mb-3">
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sm:w-1/2 lg:w-[23%] lg:mx-2">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={K4}
                  className="bg-img4 lg:h-32 md:h-48 w-full object-cover object-center"
                />
                <p className="absolute text-white text-xl font-normal top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  ประกาศ
                </p>
              </div>
              <div className="p-6 bg-white text-indigo-700 h-full overflow-y-auto">
                <h1 className="text-2xl font-semibold mb-3">
                  Mountains are alone
                </h1>
                <ul className="leading-relaxed mb-3">
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sm:w-1/2 lg:w-[23%] lg:mx-2">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={K4}
                  className="bg-img4 lg:h-32 md:h-48 w-full object-cover object-center"
                />
                <p className="absolute text-white text-xl font-normal top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  จรรยาบรรณ
                </p>
              </div>
              <div className="p-6 bg-white text-indigo-700 h-full overflow-y-auto">
                <h1 className="text-2xl font-semibold mb-3">
                  Mountains are alone
                </h1>
                <ul className="leading-relaxed mb-3">
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sm:w-1/2 lg:w-[23%] lg:mx-2">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={K4}
                  className="bg-img4 lg:h-32 md:h-48 w-full object-cover object-center"
                />
                <p className="absolute text-white text-xl font-normal top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  วินัย
                </p>
              </div>
              <div className="p-6 bg-white text-indigo-700 h-full overflow-y-auto">
                <h1 className="text-2xl font-semibold mb-3">
                  Mountains are alone
                </h1>
                <ul className="leading-relaxed mb-3">
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                  <li>
                    <a href="">bdbddbdbdbdbdbd</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-200 py-10 flex">
        <div className="flex-grow w-full border border-green-600">
          <p>Sittikorn pim=ntao 641320715</p>
        </div>
        <div className="flex-grow w-[70%]">
          <Slide3 />
        </div>
      </div>
    </div>
  );
}

export default Home;
