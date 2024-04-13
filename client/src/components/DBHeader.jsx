import React from 'react'
import { BsToggles2, MdSearch } from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import {motion} from "framer-motion";
import { buttonClick } from '../animations';
import { MdLogout } from '../assets/icons';
import { BsFillBellFill } from '../assets/icons';
import { avatar } from '../assets';
import { setUserNULL } from '../context/actions/userActions';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../config/firebase.config';

const DBHeader = () => {
  const user=useSelector((state)=>state.user);
  const firebaseAuth=getAuth(app);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const signOut=()=>{
      firebaseAuth.signOut().then(()=>{
          dispatch(setUserNULL());
          navigate("/Login",{replace:true});

      })
      .catch((err)=>console.log(err));
  }
  return (
    <div className='w-full text-black flex justify-between items-center gap-3 '>
        <p className="text-2xl text-headingColor"> Welcome to Full Stack Delivery
            {user?.name &&(
                <span className='block text-base text-gray-500'> Hello {user?.name}...!</span>
            )

            }
        </p>
        <div className='flex items-center justify-center gap-4'>
            <div className='flex  items-center justify-center gap-3 px-4 py-2 backdrop-blur-md rounded-md shadow-md'>
                <MdSearch className="text-2xl text-gray-400" />
                <input class="border-none outline-none bg-transparent w-32 text-textColor font-semibold"
                type="text" placeholder='Search Here...'/>
                <BsToggles2 className="text-2xl text-gray-400"/>

            </div>
        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-xl" />
        </motion.div>

        <div className='relative cursor-pointer'>
            <div className=' w-10 h-10 rounded-full shadow-md 
                cursor-pointer overflow-hidden flex items-center justify-center'>
                <motion.img className='w-full h-full object-fill' src=
                {user?.picture ? user?.picture:avatar} 
                whileHover={{scale:1.15}}
                referrerPolicy='no-referrer'/>

            </div>
           
        </div>
        <motion.div
            {...buttonClick}
            onClick={signOut}
            className='w-10 h-10 rounded-md cursor-pointer backdrop-blur-md shadow-md flex items-center justify-center'>
            <MdLogout class="text-gray-400 text-xl"/>

            </motion.div>
        </div>

    </div>
  )
}

export default DBHeader