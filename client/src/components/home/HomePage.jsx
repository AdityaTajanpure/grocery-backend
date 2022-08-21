import React from "react";
import SwiperCore, { Autoplay } from "swiper";
import Ads from "./Ads";
import FoodStoreCard from "../layout/ProductCard";
import ProductCategory from "./ProductCategory";
const HomePage = () => {
  SwiperCore.use([Autoplay]);
  return (
    <>
      <Ads />
      <ProductCategory />
    </>
  );
};

export default HomePage;
