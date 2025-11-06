'use client'
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useRouter } from "next/navigation";

function PlaceOrder() {
  const {getTotalCartAmount, token, food_list, cartItems} = useContext(StoreContext)
  const router = useRouter()

  const [data, setData] = useState({
    firstName : '',
    lastName : '',
    email : '',
    street : '',
    city : '',
    state : '',
    zipcode : '',
    country : '',
    phone : '',
  })

  const changeEventHandler = (e) => {
    setData({...data, [e.target.name] : (e.target.value)})
  }

  const PlaceOrder = async (e) => {
    e.preventDefault()

    const orderItems = []
    food_list.map((item) => {
      if(cartItems[item._id] > 0) {
        const itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2
    }

    const response = await axios.post('https://picko-nu.vercel.app/api/order/place', orderData, {headers: {Authorization: `Bearer ${token}`,}})

    const {session_url} = response.data
    window.location.replace(session_url)
  }

  useEffect(() => {
   if(!token) {
      router.push('/pages/cart')
   }else if(getTotalCartAmount() === 0) {
        router.push('/pages/cart')
   }
  },[token])

  return (
    <form onSubmit={PlaceOrder}  className="flex items-start justify-between gap-[50px] mt-[100px]">
      <div className="">
        <p className="text-2xl font-semibold mb-[50px]">Delivery Information</p>
        <div className="flex gap-[10px] ">
          <input required className="mb-[15px] w-[100%] p-[6px] text-sm border-2 border-orange-500 rounded-sm" placeholder="First Name" type="text" onChange={changeEventHandler} value={data.firstName} name="firstName" id="" />
          <input required className="mb-[15px] w-[100%] p-[6px] text-sm border-2 border-orange-500 rounded-sm" placeholder="Last Name" type="text" onChange={changeEventHandler} value={data.lastName} name="lastName" id="" />
        </div>
        <input required className="mb-[15px] w-[100%] p-[6px] text-sm border-2 border-orange-500 rounded-sm" placeholder="Email Address" type="text" onChange={changeEventHandler} value={data.email} name="email" id="" />
        <input required className="mb-[15px] w-[100%] p-[6px] text-sm border-2 border-orange-500 rounded-sm" placeholder="Street" type="text" onChange={changeEventHandler} value={data.street} name="street" id="" />
        <div className="flex gap-[10px] ">
          <input required className="mb-[15px] w-[100%] p-[6px] text-sm border-2 border-orange-500 rounded-sm" placeholder="City" type="text" onChange={changeEventHandler} value={data.city} name="city" id="" />
          <input required className="mb-[15px] w-[100%] p-[6px] text-sm border-2 border-orange-500 rounded-sm" placeholder="State" type="text" onChange={changeEventHandler} value={data.state} name="state" id="" />
        </div>
        <div className="flex gap-[10px] ">
          <input required className="mb-[15px] w-[100%] p-[6px] text-sm border-2 border-orange-500 rounded-sm" placeholder="Zip Code" type="text" onChange={changeEventHandler} value={data.zipcode} name="zipcode" id="" />
          <input required className="mb-[15px] w-[100%] p-[6px] text-sm border-2 border-orange-500 rounded-sm" placeholder="Country" type="text" onChange={changeEventHandler} value={data.country} name="country" id="" />
        </div>
        <input required className="mb-[15px] w-[100%] p-[6px] text-sm border-2 border-orange-500 rounded-sm" placeholder="Phone" type="text" onChange={changeEventHandler} value={data.phone} name="phone" id="" />
      </div>



      <div className="w-[500px]">
      <div className='flex flex-col flex-1 gap-5'>
          <h2 className='text-xl font-semibold'>Cart Totals</h2>
          <div>
          <div className='flex justify-between text-[#555]'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className='mt-[10px] mb-2' />
            <div className='flex justify-between text-[#555]'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className='mt-[10px] mb-2' />
            <div className='flex justify-between text-[#555]'>
              <p className=' font-semibold'>Total</p>
              <b>${getTotalCartAmount()=== 0 ? 0 : getTotalCartAmount()+2}</b>
            </div>

          </div>
          <button type="submit" className='border-none mt-[30px] text-white bg-orange-500 p-[10px] rounded-sm cursor-pointer w-[250px]'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
