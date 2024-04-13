import React, { useEffect }  from 'react';
import {FilterSection, Header, Home, HomeSlider} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import {Cart} from "../components";

const Main = () => {
  const Products=useSelector((state)=>state.products);
  const dispatch=useDispatch();
  const isCart=useSelector((state)=> state.isCart)
  useEffect(()=>{
    if(!Products){
      getAllProducts().then(data=>{
        dispatch(setAllProducts(data));
      });

    }
  })
  return (
    <main className=' w-screen min-h-screen  flex items-center flex-col bg-primary justify-start'>
      <Header/>
      <div className=' text-black w-full flex flex-col items-start justify-center 
      mt-40 px-6 md:px-40  2xl:px-60  gap-10 pb-10' >
        <Home/>
        <HomeSlider />
        <FilterSection/>

      </div>
      {isCart && <Cart/>}
    </main>
  )
}

export default Main;