'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function List() {
    const [list, setList] = useState([])

    const fetchList = async () => {
        const response = await axios.get('https://picko-nu.vercel.app/api/food/getFoodList')
        setList(response.data)
    }

    const deleteFood = async (foodId) => {
        console.log(foodId)
     const response = await axios.delete(`https://picko-nu.vercel.app/api/food/deleteFood`, {
        data: { _id: foodId }
     })
     await fetchList()
    }

    useEffect(() => {
        fetchList()
    },[])

  return (
    <div>
        <p>All Foods List</p>
        <div>
            <div className='grid items-center grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] bg-[#f9f9f9] gap-[10px] p-[12px] border border-[#cacaca] text-lg'>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((item, index) => {
                return (
                    <div className='grid items-center grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] gap-[10px] p-[12px] border border-[#cacaca] ' key={index}>
                        <img className='w-[50px]' src={`https://picko-nu.vercel.app/uploads/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={() => deleteFood(item._id)} className='cursor-pointer'>X</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default List