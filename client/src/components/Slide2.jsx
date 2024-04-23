import React, { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Slide2.css";
import Slide1 from "../assets/img/slide1.png";
import Slide2 from "../assets/img/slide2.png";

export default function Slide3() {
  const [swiperRef, setSwiperRef] = useState(null);
  return (
    <>
      <Swiper
        loop={true}
        onSwiper={setSwiperRef}
        slidesPerView={2.5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={Slide1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide2} alt="" />
        </SwiperSlide>
      </Swiper>
      <div className="navigation-buttons">
        <button onClick={() => swiperRef.slidePrev()} className="prev-button">
          <ChevronLeftIcon className="h-8 w-8 text-white bg-indigo-800 rounded-full p-2 m-1" />
        </button>
        <button onClick={() => swiperRef.slideNext()} className="next-button">
          <ChevronRightIcon className="h-8 w-8 text-white bg-indigo-800 rounded-full p-2  m-1" />
        </button>
      </div>
    </>
  );
}
