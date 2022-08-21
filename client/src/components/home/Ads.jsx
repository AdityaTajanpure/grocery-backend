import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const Ads = () => {
  return (
    <center className="hide-sm">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <img
            width="90%"
            height="300px"
            src="https://www.bigbasket.com/media/uploads/banner_images/2208726-bbpl-staples_460_Bangalore-2.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/refer">
            <img
              width="90%"
              src="https://technicaltarget.in/wp-content/uploads/2020/08/refer_n_earn.jpg"
              alt=""
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <img
            width="90%"
            src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_bcd_paneer_460-250722.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            width="90%"
            src="https://www.bigbasket.com/media/uploads/banner_images/YXHP136_hp_m_fnv_monsoon-veggies_460px-190822.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      <p className="lead">Business Ads & Offers</p>
    </center>
  );
};

export default Ads;
