'use client'
import React, { useContext } from 'react'
import {StoreContext} from '../../context/StoreContext'
import { useRouter } from 'next/navigation'

function Cart() {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount} = useContext(StoreContext)
  const router = useRouter()

  const handleGoHome = () => {
    router.push('/pages/placeOrder');
  };

  return (
    <div className='mt-[100px] '>
      <div className=''>
        <div className='flex justify-between items-center text-gray-500 text-xl'>
          <p className='me-15'>Items</p>
          <p  className='me-25'>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className='h-[1px] bg-[#e2e2e2] border-none'/>
         {food_list.map((item,index) => {
          if(cartItems[item._id] > 0){
            return (
              <div>
              <div className='flex justify-between items-center text-black p-2 text-xl'>
               <img className='w-[50px]' src={`https://picko-nu.vercel.app/uploads/${item.image}`} alt="" />
               <p className=''>{item.name}</p>
               <p className=''>${item.price}</p>
               <p>{cartItems[item._id]}</p>
               <p>${item.price*cartItems[item._id]}</p>
               <p onClick={() => removeFromCart(item._id)} className='cursor-pointer'>X</p>
              </div>
              <hr className='h-[1px] bg-[#e2e2e2] border-none' />
              </div>
            )
          }
         })}
      </div>
      <div className='mt-[80px] flex justify-between gap-30'>
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
          <button onClick={handleGoHome} className='border-none text-white bg-orange-500 p-[12px] rounded-sm cursor-pointer w-[250px]'>PROCEED TO CHECKOUT</button>
        </div>
        <div className='flex-1'>
          <div>
            <p className='text-[#555]'>If you have a promo code, Enter it here</p>
            <div className='mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-sm'>
              <input className='pl-[10px]' type="text" placeholder='promo code' name="" id="" />
              <button className='w-[150px] p-[12px] bg-black text-white rounded-sm'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart