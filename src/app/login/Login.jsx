'use client'
import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../frontend_assets/assets'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'

function Login({setShowLogin}) {
  const {setToken} = useContext(StoreContext)
  const [currState, setCurrState] = useState('Login')
  const [data, setData] = useState({
    name : '',
    email : '',
    password : ''
  })

  const changeEventHandler = (e) => {
    setData({...data, [e.target.name] : (e.target.value)})
  }

  const onLogin = async (e) => {
    e.preventDefault()
    let url = 'http://localhost:3000/api/user/'
    if(currState === 'Login') {
        url += 'login'
    }else{
      url += 'signup'
    }

    const response = await axios.post(url,data)
    setToken(response.data.token)
    localStorage.setItem("Picko.", response.data.token)
    setShowLogin(false)
  }


  return (
    <div className='absolute z-10 w-[88.6%] h-[100%] bg-[#00000090]'>
      <form className='place-self-center-safe w-[330px] mt-20 flex flex-col gap-3 bg-white p-[25px]  rounded-lg text-[#808080]  '>
        <div className='flex justify-between mb-2 items-center text-xl text-black font-bold'>
          <h2>{currState}</h2>
          <img className='w-[16px] cursor-pointer' onClick={() => setShowLogin(false)} src={assets.cross_icon.src} alt="" />
        </div>
        <div className='flex flex-col gap-[20px]'>
          {currState === 'Login' ? <></> : <input className='outline-none border p-[10px] rounded-sm border-[#8e8c8c]' type="text" placeholder='Your name' required name="name" value={data.name} onChange={changeEventHandler} /> }
          <input className='outline-none border p-[10px] rounded-sm border-[#8e8c8c]' type="email" placeholder='Your email' required name="email" value={data.email} onChange={changeEventHandler}/>
          <input className='outline-none border p-[10px] rounded-sm border-[#8e8c8c]' type="password" placeholder='Password' required name="password" value={data.password} onChange={changeEventHandler}/>
        </div>
        <button onClick={onLogin} type='submit' className='border-none p-[8px] mt-4 rounded-sm text-white bg-orange-500 text-lg cursor-pointer'>{currState === 'Sign up' ? 'Create account' : 'Login'}</button>
        <div className='flex items-start gap-[8px] '>
          <input className='mt-1' type="checkbox" required name="" id="" />
          <p className='text-xs'>By continuing, i agree to thr terms of use & privacy policy.</p>
        </div>
        {currState === 'Login'
        ? <p className=''>Create a new account? <span className='text-orange-500 text-lg cursor-pointer' onClick={() => setCurrState('Sign up')}>Click here</span></p>
        : <p className=''>Already have a account? <span className='text-orange-500 text-lg cursor-pointer' onClick={() => setCurrState('Login')}>Login here</span></p>
      }
      </form>
    </div>
  )
}

export default Login