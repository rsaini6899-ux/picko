'use client'
import React from 'react'
import { assets } from "@/app/frontend_assets/assets"

function AppDownload() {
  return (
    <div id='mobileApp' className='mt-[100px] font-semibold text-4xl mx-auto text-center w-[50%]'>
        <p className=''>For Better Exprierience Download <br /> Picko App</p>
        <div className='flex items-center ml-20 gap-5 mt-5'>
            <img className='transition duration-500 transform hover:scale-105 cursor-pointer' src={assets.play_store.src} alt="" />
            <img className='transition duration-500 transform hover:scale-105 cursor-pointer' src={assets.app_store.src} alt="" />
        </div>
    </div>
  )
}

export default AppDownload