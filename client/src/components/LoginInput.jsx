import React, { useState } from 'react';
import {motion} from "framer-motion";
import { fadeInOut } from '../animations';

const LoginInput = ({placeHolder,inputState,type,inputStateFunc,isSignup}) => {
  const [Focus,setFocus]=useState(false);
  return (<motion.div {...fadeInOut }>
    <div className ={ ` flex items-center justify-center gap-4 backdrop-blur-md rounded-md w-full  px-3 py-3 
     ${Focus ? "shadow-xl shadow-red-800 ":"shadow-md shadow-red-400"}`}>
   

    <input type={type} placeholder={placeHolder} className =" w-full text-black h-full border-none outline-none  bg-transparent font-semibold"
    value={inputState} 
    onChange={((e) => { inputStateFunc(e.target.value)})}
    onFocus={() => { setFocus(true) }}
    onBlur={()=>{setFocus(false)}}
     />
    </div>
    </motion.div>

  );
};

export default LoginInput;