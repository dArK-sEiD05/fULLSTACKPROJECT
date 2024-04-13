import React from 'react';
import {DBHeader, DBNewItem} from"../components";
import { Routes } from 'react-router-dom';
import {DBHome} from '../components';
import { Route } from 'react-router-dom';
import {DBItems}  from "../components";
import {DBUsers} from '../components';
import {DBOrders} from "../components";

const DBRightSection = () => {
  return (
    <div className='="flex flex-col px-12  justify-center  py-12 flex-1 h-full'>
      <DBHeader/>
      <br/>
      <hr/>
      <div className='flex flex-col flex-1 justify-center overflow-y-scroll scrollbar-none '>
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/newItem" element={<DBNewItem />} />
          <Route path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  )
}

export default DBRightSection