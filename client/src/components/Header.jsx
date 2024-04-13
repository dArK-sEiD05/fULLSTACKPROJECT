import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { isActiveStyles,isNotActiveStyles } from '../utils/styles';
import { logo } from '../assets';
import { motion } from 'framer-motion';
import { buttonClick, slideTop } from '../animations';
import { MdLogout, MdShoppingCart }  from "../assets/icons";
import  {useDispatch, useSelector} from "react-redux";
import {avatar} from "../assets";
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { setUserNULL } from '../context/actions/userActions';
import { setCartOn } from '../context/actions/displayCartAction'; 


const Header = () => {
    const user=useSelector((state)=>state.user);
    const [isMenu,setIsMenu]=useState(false);
    const firebaseAuth=getAuth(app);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const cart=useSelector((state)=> state.cart);
    const signOut=()=>{
        firebaseAuth.signOut().then(()=>{
            dispatch(setUserNULL());
            navigate("/Login",{replace:true});

        })
        .catch((err)=>console.log(err));
    }
    
  return (
    <header className=' text-black fixed backdrop-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6'>
    <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={logo} className='w-12 ' alt="logo"/>
        <p className='font-semibold text-black text-xl'>Full Stack delivery</p>
    </NavLink>
    <nav className='flex items-center justify-center gap-8'>
        <ul className='hidden md:flex items-center gap-16'>
            <NavLink className={({isActive}) =>isActive ? isActiveStyles:isNotActiveStyles} to={"/"}> Home</NavLink>
            <NavLink className={({isActive}) =>isActive ? isActiveStyles:isNotActiveStyles} to={"/menu"}> Menu</NavLink>
            <NavLink className={({isActive}) =>isActive ? isActiveStyles:isNotActiveStyles} to={"/services"}> Services</NavLink>
            <NavLink className={({isActive}) =>isActive ? isActiveStyles:isNotActiveStyles} to={"/aboutus"}> About Us</NavLink>

        </ul>
    
    </nav>
    <motion.div  onClick={()=>{
        dispatch(setCartOn())
    }} {...buttonClick } className='relative cursor-pointer'>
        <MdShoppingCart className="text-3xl   text-textColor"/>
        {cart?.length>0 && <div className='w-6 h-6 rounded-full flex justify-center items-center absolute -top-4 -right-1 bg-red-500'>
            <p className='text-primary text-base font-semibold'>{cart?.length}</p>
        </div>}
    </motion.div>
    {user ? (
    <>
    <div className='relative cursor-pointer'>
        <div className=' w-12 h-12 rounded-full shadow-md 
        cursor-pointer overflow-hidden flex items-center justify-center'>
        <motion.img className='w-full h-full object-fill' src=
        {user?.picture ? user?.picture:avatar} 
        whileHover={{scale:1.15}}
        referrerPolicy='no-referrer'
        
        
        onMouseEnter={()=>{
            setIsMenu(true)
        }}
        
        />
        
        </div>
        {isMenu &&
         <motion.div 
        {...slideTop}
        onMouseLeave={()=> setIsMenu(false)}
         className='px-6 py-4   backdrop:blur-md border rounded   cursor-pointer shadow-md absolute top-12 right-0 flex flex-col gap-4' >
         {user?.user_id===process.env.REACT_APP_ADMIN_ID && (<Link
             className=" hover:text-red-500 text-xl text-textColor"
             to={"/dashboard/home"}
         >
             Dashboard
         </Link>)}
         
         <Link
         className=" hover:text-red-500 text-xl text-textColor"
         to={"/profile"}
         >
         My Profile
         </Link>
 
         <Link
         className=" hover:text-red-500 text-xl text-textColor"
         to={"/user-orders"}
         >
         Orders
         </Link>
         <hr />
 
         <motion.div onClick={signOut} className='flex group px-3 py-2 rounded-md shadow-md bg-gray-200 hover:bg-gray-200 gap-3' {...buttonClick}>
             <MdLogout className='text-2xl text-textColor group-hover::text-green'/>
             <p className='text-xl text-textColor group-hover::text-green'>
                 Sign Out
             </p>
         </motion.div>
 
         </motion.div>
        }
       


       

    </div>
    </>
    )
    :(<>
    <NavLink to={"/login"}>
        <motion.button {...buttonClick} 
        className='px-4 py-2  rounded-md shadow-md border  border-red-300 bg-lighttextGray'>
            Login
        </motion.button>

    </NavLink>
    </>
    )}
    </header>
  )
};

export default Header;