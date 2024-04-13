import React from 'react';
import {motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { staggerFadeInOut } from '../animations';
import { IoFastFood } from '../assets/icons';
import { useState } from 'react';
import {SliderCard} from "../components";
import {statuses} from "../utils/styles";

const FilterSection = () => {
    const [category,setCategory]=useState("fruits");
    const products=useSelector(state=>state.products)
    console.log(statuses)
  return (
    <motion.div className='w-full flex  flex-col justify-start items-start '>
    <div className="flex   justify-start items-start ">
    <div className="flex flex-col items-start justify-start gap-1">
        <p className='text-2xl text-headingColor font-bold'>
            Our Hot Dishes
        </p>
        <div className="w-[40%] h-1 rounded-md bg-orange-500"></div>
    </div>
    </div>
    
    
    <div className="w-full overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8">
        {statuses &&
          statuses.map((data, i) => (
            <Filtercard
              data={data}
              category={category}
              setCategory={setCategory}
              index={data.id}
            />
           
          ))}
      </div>
      <div className=" w-full flex items-center justify-evenly flex-wrap gap-4 mt-12 ">
        {products &&
          products
            .filter((data) => data.product_category === category)
            .map((data, i) => <SliderCard key={i} data={data} index={i} />)}
      </div>

</motion.div>
  )
}
export const Filtercard=({data,index,category,setCategory})=>{
    return(
        <motion.div 
        onClick={()=>setCategory(data.category)}
        className={`group w-28 min-w-[120px] cursor-pointer rounded-md py-6 ${category===data.category?"bg-red-400":"bg-primary"} hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4`} key={index}{...staggerFadeInOut(index)}>
                <div className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${category===data.category?"bg-primary":"bg-red-400"} `}>
                <IoFastFood
          className={`${
            category === data.category ? "text-red-500" : "text-primary"
          } group-hover:text-red-500`}
          />
          
        </div>
        <p
        className={`text-xl font-semibold ${
          category === data.category ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
        
        </motion.div>
    );
};
export default FilterSection;