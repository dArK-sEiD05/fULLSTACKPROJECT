import React from 'react'
import {motion} from"framer-motion";
import {Slider} from "../components";

const HomeSlider = () => {
  return (
    <motion.div className='w-full flex  flex-col justify-start items-start '>
        <div className="flex   justify-start items-start ">
        <div className="flex flex-col items-start justify-start gap-1">
            <p className='text-2xl text-headingColor font-bold'>
                Our Fresh and Healthy Fruits
            </p>
            <div className="w-[40%] h-1 rounded-md bg-orange-500"></div>
        </div>
        </div>
        <Slider/>
    </motion.div>
  )
  };
export default HomeSlider;