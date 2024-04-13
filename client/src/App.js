import React from 'react';
import {Route,Routes} from "react-router-dom";
import {Main,Login } from "./containers";
import {useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';
import { app } from './config/firebase.config';
import { getAuth } from 'firebase/auth';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems, validateUserJWTToken } from './api';
import { setUserDetails } from './context/actions/userActions';
import { fadeInOut } from './animations';
import { MainLoader } from './components';
import { Alert,CheckOutSuccess } from './components';
import Dashboard from './components/Dashboard';
import { setCartItems } from './context/actions/cartAction';
import { getAllUsers} from './api';
import { setAllUserDetails } from './context/actions/allUsersAction';

const App=()=>{
    const navigate=useNavigate();
    const firebaseAuth = getAuth(app);
    const [isLoading,setIsLoading]=useState(false);

    const dispatch=useDispatch();
    const alert=useSelector(state =>state.alert)
  console.log(alert);
    useEffect(()=>{
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged(cred => {
        if (cred) {
          cred.getIdToken().then((token) => {
            if (token) {
              getAllUsers().then((data) => {
                dispatch(setAllUserDetails(data));
              });
            }
            validateUserJWTToken(token).then((data) => {
              if(data){
              
                getAllCartItems(data.user_id).then((items)=>{
                  dispatch(setCartItems(items))
                })
              }
              dispatch(setUserDetails(data))
            });
            navigate("/",{replace:true});
          })
          
        };
        setInterval(()=>{
          setIsLoading(false);
        },2500);
    })
      },[]);
    console.log(isLoading)
    return (

    <div className="text-blue-500  flex items-center justify-center w-screen min-h-screen ">
        {isLoading && (
            <motion.div className="fixed z-50  h-full inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
            {...fadeInOut}><MainLoader/></motion.div>
        )}
            
            
        <Routes>
            
            <Route path="/*"  element={<Main/>} />
            <Route path="/Login"  element={<Login/>} />
            <Route path="/dashboard/*" element={<Dashboard/>}/>
            <Route path="/checkout-success" element={<CheckOutSuccess/>} />
        </Routes>
        
        {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
    );
};
export default App;