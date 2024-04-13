import React from 'react'
import {delivery} from "../assets"
import { heroBg } from '../assets';
import {motion} from "framer-motion";
import { buttonClick, staggerFadeInOut } from '../animations';
import { randomData } from '../utils/styles';



const Home = () => {
    console.log(randomData);
  return (
    <motion.div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4' >
        
        <div className='ml-0 flex flex-col items-start justify-start gap-2'>
            <div className='px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full'>
                <p className='text-lg font-semibold tex-orange-500' >
                    Free Delivery
                </p>
                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md' >
                    <img src={delivery} className="w-full h-full object-contain" alt="Delivery Icon"/>
                </div>
            </div>

            <p className="w-full text-[35px] text-headingColor  font-sans font-extrabold ">
          The Fastest Delivery in{" "}
          <span className="text-orange-600">Your City</span>
        </p>
        <p className='text-textColor text-lg'>
        Welcome to our online delivery platform, where convenience meets quality service. Discover a seamless and hassle-free way to get your favorite items delivered right to your doorstep. 
        From delectable meals and refreshing beverages to essential groceries and must-have products, our diverse range of offerings ensures that your every need is met with utmost care and efficiency. 
        With user-friendly interfaces and intuitive navigation, placing an order is a breeze, allowing you to sit back, relax, and await the arrival of your desired goods.

        </p>
        <motion.button {...buttonClick} className='px-3 py-2 
        bg-gradient-to-bl  from-orange-400 to-orange-600  rounded-xl text-black
        text-base font-semibold'>Order Now.
        </motion.button>
        </div>
        <div className="py-2 flex-1 flex items-center justify-end relative">
        <img
          className="absolute top-0 right-0 md:-right-12  w-full h-420 md:w-auto md:h-650"
          src={heroBg}
          alt=""
        />
        <div className='w-full z-50  md:w-460 ml-0 flex flex-wrap  items-center gap-4 gap-y-14 justify-center'>
            {randomData.map((data,i)=>{
                return(<motion.div key={i} {...staggerFadeInOut(i)}
                className=' w-32 h-36 md:h-auto  md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl
                 flex flex-col items-center justify-center drop-shadow-lg'>
                <img
                  src={data.imageURL}
                  className="w-12 mt-10  flex items-center justify-center h-12 md:w-32 md:h-32 md:-mt-16 object-contain "
                  alt=""
                />
                <p className="text-sm lg:text-xl font-semibold text-textColor">
                  {data.product_name.slice(0, 14)}
                </p>

                <p className="text-[12px] text-center  md:text-base text-lighttextGray font-semibold  capitalize">
                  {data.product_category}
                </p>

                <p className="text-sm  font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>{" "}
                  {data.product_price}
                </p>
               
               
                </motion.div>
                )
            })}
        </div>
        
       
        </div>
        


    </motion.div>
  )
}

export default Home;