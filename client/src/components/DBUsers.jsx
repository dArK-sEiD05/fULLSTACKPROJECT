import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import {DataTable} from '../components';
import { avatar } from "../assets";
import { setAllUserDetails } from "../context/actions/allUsersAction";




const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, []);
 

  return (
    <div className='pt-6  flex flex-row items-center justify-self-center gap-4 w-full '>
      <DataTable columns={[
          {title:"Image",field:"photoURL",render:(rowData)=>(
            <img 
            src={rowData.photoURL?rowData.photoURL:avatar} alt="Profile" height='50'
            className='w-32 h-16 object-contain rounded-md '
            />
  ),},
          {
            title:"Name",
            field:"displayName",
          },
          { 
            title:"Category",
            field:"email"
      },
      {
        title:"Verified",
        field:"emailVerified",
        render:(rowData)=> (
          <p 
          className={`px-2 py-1 w-32 text-center text-primary rounded-md
          ${rowData.emailVerified? "bg-emerald-500 ":"bg-red-500"}`}>
            {rowData.emailVerified ? "Verified":"Not Verified"}
          </p>
          ),
       },

        ]}
        data={allUsers}
        title="List of USers"
        
        />



    </div>
  )
}

export default DBUsers;