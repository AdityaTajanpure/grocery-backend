import React from "react";
import SwiperCore, { Autoplay } from "swiper";
import Ads from "./Ads";
import FoodStoreCard from "../layout/ProductCard";
import ProductCategory from "./ProductCategory";
const HomePage = () => {
  SwiperCore.use([Autoplay]);
  return (
    <>
      <div>
        <Ads />
      </div>

      <div className="row">
        <div className="col-12 m-2 ">
          <ProductCategory />
        </div>
      </div>
    </>
  );
};

export default HomePage;
