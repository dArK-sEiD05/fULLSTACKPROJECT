import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState(null);
  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
    console.log("fd")
    console.log(fruits);
  }, [products]);

  return (
    <div className="w-full top-0">
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
       
       
        
        className="mySwiper"
      >
        {fruits &&
          fruits.map((data, i) => (
            <SwiperSlide key={i}>
            <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;