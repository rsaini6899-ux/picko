'use client'
import React, { useEffect, useState } from 'react'
import { assets } from '../../../admin_assets/assets'
import axios from 'axios'

function Add() {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name : '',
        description : '',
        price : '',
        category : 'Salad'
    })

    const changeEventHandler = (e) => {
        setData({...data, [e.target.name] : (e.target.value)})
      }

      const onSubmithandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', Number(data.price))
        formData.append('category', data.category)
        formData.append('image', image)
       
        const response = await axios.post('https://picko-nu.vercel.app/api/food/addFood', formData)

        setData({
            name : '',
            description : '',
            price : '',
            category : ''
        })
        setImage(false)
      }

  return (
    <div className='ml-[25px] mt-8 text-[#6d6d6d]  '>
        <form className='flex flex-col gap-[10px]'>
            <div className=''>
                <p>Upload image</p>
                <label htmlFor="image">
                    <img className='mt-2 w-30 h-22' src={image ? URL.createObjectURL(image) : assets.upload_area.src} alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} className='border' type="file" name="" id="image" hidden required />
            </div>
            <div className='w-[280px] p '>
                <p>Product name</p>
                <input onChange={changeEventHandler} value={data.name} className='border w-full p-[8px] mt-1 rounded-sm' type="text" name="name" placeholder='Type here' id="" />
            </div>
            <div className='w-[280px]'>
                <p>Product description</p>
                <textarea onChange={changeEventHandler} value={data.description} className='border h-25 mt-1 rounded-sm w-full p-[8px]' name="description" rows="6" placeholder='Write content here' required ></textarea>
            </div>
            <div className='flex gap-[30px]'>
                <div>
                    <p>Product category</p>
                    <select onChange={changeEventHandler} value={data.category} name="category" className='border w-full p-2 mt-1 rounded-sm '>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div>
                    <p>Product price</p>
                    <input onChange={changeEventHandler} value={data.price} className='border w-full p-2 mt-1 rounded-sm ' type="number" name="price" id="" placeholder='$20' />
                </div>
            </div>
            <button onClick={onSubmithandler} className='border rounded-sm w-[120px] border-none p-[10px] bg-black text-white cursor-pointer ' type='submit'>ADD</button>
        </form>
    </div>
  )
}

export default Add