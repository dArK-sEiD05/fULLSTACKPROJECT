import React, { useEffect }  from 'react';
import { loginbg } from '../assets';
import { logo } from '../assets';
import { LoginInput } from '../components';
import { useState } from 'react';
import { motion } from "framer-motion";
import { buttonClick } from '../animations';
import { FcGoogle} from '../assets/icons';
import { getAuth, signInWithPopup, GoogleAuthProvider ,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { app } from '../config/firebase.config';
import { validateUserJWTToken } from "../api";
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { setUserDetails } from "../context/actions/userActions"
import { useDispatch } from 'react-redux';
import {alertInfo,alertSuccess,alertDanger, alertWarning,alertNULL} from '../context/actions/alertActions'

const Login = () => {
  const [isSignUp,SetIsSignUp]=useState(false);

  const [userEmail,setUserEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const dispatch=useDispatch();
  const firebaseAuth = getAuth(app);
  const provider=new GoogleAuthProvider();
  const navigate=useNavigate();

  const user=useSelector((state)=>state.user);

  const alert=useSelector((state)=> state.alert)


  useEffect(()=>{
    if (user){
      navigate("/",{replace:true});
    }
  },[user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then(userCred => {
      firebaseAuth.onAuthStateChanged(cred => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              
              dispatch(setUserDetails(data));
              dispatch(alertSuccess("Successfully Logged in"))
              setInterval(() => {
                dispatch(alertNULL());
              }, 3000);
            });
            navigate("/",{replace:true})
          })
        };
      })
    })
  };

  const signInWithEmailPass=async ()=>{
    if(userEmail!==""||password!==""){
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) =>{
        firebaseAuth.onAuthStateChanged(cred => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                
                dispatch(setUserDetails(data));
                
              });
              navigate("/",{replace:true})
            })
          };
        })
      })
    };
  }

     
  const signUpWithEmailPass= async()=> {
    if(userEmail===""||password===""||confirmPassword===""){
      dispatch(alertInfo("Required field should not be empty"))
    }
    else{
      if (password===confirmPassword){
        setUserEmail("");
        setPassword("");
        setConfirmPassword("");
        await createUserWithEmailAndPassword(firebaseAuth,userEmail,password).then((userCred )=> {
          firebaseAuth.onAuthStateChanged(cred => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                  
                });
                navigate("/",{replace:true})
              })
            };
          })
        })
      }
      else {
        dispatch(alertWarning("Password doesn't match"))
      }
    };
  };
   

  return (<div className='login relative overflow-hidden flex w-screen h-screen'>
    <img className=" h-full w-full object-cover absolute left-0 top-0 " alt="background" src={loginbg}/>
    
    <div className="bgleft items-center h-full  w-[35%] md:w-508 z-10 backdrop-blur-md p-4 px-4 py-12">
      <div className="flex items-center justify-start gap-4 w-full">
        <img src={logo} className="w-8"/>
        <p className="text-black font-semibold text-2xl">Full stack delivery</p>
      </div>
      <br></br>
      
      <p className='text-black text-2xl font-semibold items-center  px-10'>welcome</p>
      <p className='text-black text-3l font-semibold items-center px-10 '>{isSignUp?"Sign In":"Sign Up"} with the following</p>
      
      <div className="w-full flex flex-col gap-5 items-col justify-centergap-6 px-4 md:px-12 py-6">
        <LoginInput placeHolder={"Email here"} inputState={userEmail} type="email" inputStateFunc={setUserEmail} isSignUp={isSignUp} />
        <LoginInput placeHolder={"Password here"} inputState={password} type="password" inputStateFunc={setPassword} isSignUp={isSignUp} />
        {isSignUp && <LoginInput  placeHolder={"Confirm Password here"} inputState={confirmPassword} type="password" inputStateFunc={setConfirmPassword} isSignUp={isSignUp} />}
        {!isSignUp ?<p>Does'nt have an account,
          <motion.button onClick={()=>SetIsSignUp(true)} 
          className='text-red-400 text-xl underline cursor-pointer bg-transparent' {...buttonClick }>
            Create One</motion.button></p>:
        <p>Already have an account<motion.button 
        className='text-red-400 text-xl underline cursor-pointer bf-transparent'
        onClick={()=>SetIsSignUp(false)}>Sign in</motion.button></p>}
        {isSignUp?(
          <motion.button
          {...buttonClick}
          onClick={signUpWithEmailPass}
          className='w-full h-full px-4 py-2  text-white text-xl capitalize cursor-pointer rounded  bg-red-400 hover:bg-red-600 transition-all duration-500'
          >
            Sign Up
          </motion.button>
        ):(
          <motion.button
          {...buttonClick}
          onClick={signInWithEmailPass}
          className='w-full h-full px-4 py-2  text-white text-xl capitalize cursor-pointer rounded  bg-red-400 hover:bg-red-600 transition-all duration-500'
          >
            Sign In
          </motion.button>
        )}
      </div>
      <div className='flex justify-between items-center gap-16'>
        <div className='h-[1px] w-32 rounded-md  bg-white'></div>
        <p className='text-white'>or</p>
        <div className='h-[1px] w-32 rounded-md  bg-white'>
      </div>
      </div>
      

      <div className='flex flex-col justify-between  items-center'>
      <motion.div onClick={loginWithGoogle} {...buttonClick} className='flex   p-3 backdrop-blur-md capitalize bg-white text-black cursor-pointer justify-center w-[65%] items-center   rounded-3xl'>
      
      <FcGoogle className="w-[25px] h-[25px]  "/>
      <p className='capitalize text-base' >Sign in with google</p>
      </motion.div>
      </div>
      
    </div>
    </div>
  );
};

export default Login;