
'use client'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
   try {
       const response = await axios.post('http://localhost:3000/api/order/verify', {success, orderId})
           // verify?success=true&orderId=680769756ddc5936f08c0ec9

    if(response.data.message === 'Paid'){
      router.push('/pages/myorders')
    }else{
      router.push('/')
    }
   } catch (error) {
    
   }
  }

  useEffect(() => {
    verifyPayment()
  },[])

  return (
    <div className="items-center justify-center min-h-[60vh] grid">
      {/* {success === 'true' ? (
        <>
          <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
          <p className="text-gray-600 mt-4">Order ID: {orderId}</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600">Payment Failed!</h1>
          <p className="text-gray-600 mt-4">Please try again.</p>
        </>
      )} */}
      <div className='w-[70px] h-[70px] border-[3px] place-self-center animate-route border-gray-400 border-t-orange-500 rounded-[50%] '>

      </div>
    </div>
  )
}
