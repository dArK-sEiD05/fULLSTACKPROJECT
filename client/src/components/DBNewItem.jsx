import React, { useState } from 'react';
import { statuses } from '../utils/styles';
import {Spinner} from "../components";
import { FaCloudUploadAlt, MdDelete } from '../assets/icons';
import {LinearProgress} from "../components";
import { storage } from '../config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { alertDanger, alertNULL, alertSuccess } from '../context/actions/alertActions';
import { buttonClick } from '../animations';
import { motion } from 'framer-motion';  


import { 
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addNewProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';

const DBNewItem = () => {

    const [itemName,setItemName]=useState();
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("");
    const [isLoading,SetIsLoading]=useState(false);
    const [progress,setProgress]=useState("");
    const [imageDownloadURL,setImageDownloadURL]=useState(null);
    const alert=useSelector((state)=>state.alert);

    const dispatch=useDispatch();
    const deleteImageFromFirebase=()=>{
      SetIsLoading(true);
      const deleteRef=ref(storage,imageDownloadURL)
      deleteObject(deleteRef).then(()=>{
        setImageDownloadURL(null)
        SetIsLoading(false)
        dispatch(alertSuccess("Image removed successfully"))
        setTimeout(()=>{
          alertNULL()
        },3000)
        
        
      })


    }
    const uploadImage=(e)=>{
      SetIsLoading(true);
      const imageFile=e.target.files[0];
     
      const storageRef=ref(storage,`images/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
      'state_changed',
      (snapshot)=>{
        setProgress((snapshot.bytesTransferred/snapshot.totalBytes  )*100);
      },
      (error)=>{
       console.log(error)


      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          SetIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image uploaded successfully"))
          setTimeout(()=>{
            alertNULL()
          },3000)
          });
          getAllProducts().then(data=>{
            dispatch(setAllProducts(data));
      });

      }
      )

    }
    const submitNewData=()=>{
      const data={
        product_name:itemName,
        product_category:category,
        product_price:price,
        imageURL:imageDownloadURL,
      }
      addNewProduct(data).then(res=>{
        dispatch(alertSuccess("New Image added"))
          setTimeout(()=>{
            alertNULL()
          },3000);
          setImageDownloadURL(null);
          setItemName("")
          setPrice("")
          setCategory(null)
      
    })

      }
      
  return (
    <div className='flex items-center justify-center flex-col pt-6 px-24 w-[75%]'>
    <div className='border border-gray-50 justify-between rounded-md p-4 w-full flex flex-col  items-center gap-4'>
        <InputValueField
          type="text"
          placeHolder={"Item name here"}
          stateFunc={setItemName}
          stateValue={itemName}
        />
        <div className="w-full flex justify-center items-center flex-wrap gap-3">
        {statuses && statuses.map((data) => (
          <p
            key={data.id}
            onClick={()=>{setCategory(data.category)}}
            className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md 
            ${data.category===category?"bg-red-400 text-primary":"bg-transparent"}`}
              
          >
            {data.title}
          </p>
        ))}
        <InputValueField
          type="text"
          placeHolder={"Item price here"}
          stateFunc={setPrice}
          stateValue={price}
        />
        <div className='w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted
         border-gray-300 cursor-pointer'>
          {isLoading?(
          <div className='w-full h-full flex flex-col justify-center items-center '>
           <Spinner/>
          <br></br>
          <br></br>
           <LinearProgress   variant="determinate" value={progress} />
           
          </div>):(
            <>
            { !(imageDownloadURL) ?(
              <>
              <label>
              <div className=" flex flex-col items-center justify-center h-full w-full cursor-pointer">
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <p className="font-bold text-4xl">
                    <FaCloudUploadAlt className="-rotate-0" />
                  </p>
                  <p className="text-lg text-textColor">
                    Click to upload an image
                  </p>
                </div>
              </div>
              <input
                type="file"
                name="upload-image"
                accept="image/*"
                onChange={uploadImage}
                className=" w-0 h-0"
              />
            </label>
              </>
            ):(
              <>
               <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadURL}
                      className=" w-full h-full object-cover"
                    />

                    <motion.button
                      {...buttonClick}
                      type="button"
                      onClick={()=>deleteImageFromFirebase(imageDownloadURL)}
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                     
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
              </>
            )}
            </>
          )}


        </div>
        
        <motion.button {...buttonClick}
        onClick={submitNewData}
        className='w-9/12 py-2 rounded-md bg-red-500 text-primary hover:bg-red-700 cursor-pointer'>
        
        Save</motion.button>
        </div>
        </div>
    
    
    </div>
  )
};

export const InputValueField = ({
    type,
    placeHolder,
    stateValue,
    stateFunc,
  }) => {
    return (
      <>
        <input
          type={type}
          placeholder={placeHolder}
          className="w-full flex items-center px-4 py-3 justify-center  bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
          value={stateValue}
          onChange={(e) => stateFunc(e.target.value)}
        />
      </>
    );
  };



export default DBNewItem;