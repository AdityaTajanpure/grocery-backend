import React from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import FoodStoreCard from "../layout/ProductCard";

const ProductCategory = () => {
  return (
    <center className="hide-sm">
      <Swiper spaceBetween={10} slidesPerView={3}>
        <div className="row">
          {[1, 2, 3].map((index) => {
            return (
              <SwiperSlide key={index}>
                <div className="col-sm-6 md-6 lg-6 p-3">
                  <FoodStoreCard />
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </center>
  );
};

export default ProductCategory;
