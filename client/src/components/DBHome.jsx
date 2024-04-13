import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api';
import { getStyle } from "@coreui/utils";
import {CChart} from "@coreui/react-chartjs";
import { setAllProducts } from '../context/actions/productActions';
const DBHome = () => {
  const products=useSelector((state)=>state.products);
  const dispatch=useDispatch();
  const drinks=products?.filter(item=>item.product_category==="drinks");
  const deserts=products?.filter(item=>item.product_category==="deserts");
  const fruits=products?.filter(item=>item.product_category==="fruits");
  const curry=products?.filter(item=>item.product_category==="curry");
  const chinese=products?.filter(item=>item.product_category==="chinese");
  const rice=products?.filter(item=>item.product_category==="rice");
  const bread=products?.filter(item=>item.product_category==="bread");

  useEffect(()=>{
    if(!products){
      getAllProducts().then((data)=>{
        dispatch(setAllProducts(data))
      })
    }
  },[]);
  return (
    <div className='pt-6  flex flex-row items-center justify-self-center gap-4 w-full '>
       <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full'>
        <div className='flex items-center justify-center'>
          <div className='w-full h-full'>
        <CChart 
          type="bar"
          data={{
            labels: ["Drinks","Deserts","Fruits","Rice","Curry","Bread","Chinese",],
            datasets: [
              {
                label: 'Category wise count',
                backgroundColor: '#f87979',
                data: [drinks?.length,deserts?.length,fruits?.length,rice?.length,curry?.length,bread?.length,chinese?.length],
              },
            ],
          }}
          labels="months"
          options={{
            plugins: {
              legend: {
                labels: {
                  color: getStyle('--cui-body-color'),
                }
              }
            },
            scales: {
              x: {
                grid: {
                  color: getStyle('--cui-border-color-translucent'),
                },
                ticks: {
                  color: getStyle('--cui-body-color'),
                },
              },
              y: {
                grid: {
                  color: getStyle('--cui-border-color-translucent'),
                },
                ticks: {
                  color: getStyle('--cui-body-color'),
                },
              },
            },
          }}
/>
</div>
        </div>
        <div className='w-full h-full flex items-center justify-center'>
          <div className='w-full h-full'>
        <CChart
          type="doughnut"
          data={{
            labels: ["Orders","Delivered","Cancelled","Paid","Not Paid"],
            datasets: [
              {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [40, 20, 80, 10],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: getStyle('--cui-body-color'),
        }
      }
    },
  }}
/>
</div>
        </div>
       </div>
       
       </div>
  )
}

export default DBHome;