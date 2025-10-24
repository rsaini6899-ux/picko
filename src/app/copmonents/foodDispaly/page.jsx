'use client'
import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '@/app/copmonents/foodItem/page'

function FoodDispaly({category}) {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-semibold mb-4'>Top dishes near you</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {food_list.map((item, index) => {
          if(category === 'All' || category === item.category){
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDispaly