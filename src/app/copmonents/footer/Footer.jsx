'use client'
import { assets } from "@/app/frontend_assets/assets";
import React from "react";

function Footer() {
  return (
    <div id="footer" className="text-[#d9d9d9] bg-[#323232] items-center gap-3 mt-[100px] p-[20px] pt-[50px] ">
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-[80px]">
        <div>
           <p className="text-orange-500 font-bold text-2xl mb-3 cursor-pointer">Picko.</p>
           <p className="">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia architecto quia nemo! Assumenda, illo tempore. Inventore perferendis enim, atque expedita unde officiis ullam, commodi, provident veniam voluptatibus neque illum. Amet.</p>
           <div className="flex gap-3 mt-4">
            <img className="w-8 cursor-pointer" src={assets.facebook_icon.src} alt="" />
            <img className="w-8 cursor-pointer" src={assets.twitter_icon.src} alt="" />
            <img className="w-8 cursor-pointer" src={assets.linkedin_icon.src} alt="" />
           </div>
        </div>
        <div>
           <h2 className="font-semibold text-xl mb-3 text-white">COMPANY</h2>
           <ul className="">
            <li className="mb-1 cursor-pointer">Home</li>
            <li className="mb-1 cursor-pointer">About us</li>
            <li className="mb-1 cursor-pointer">Delivery</li>
            <li className="mb-1 cursor-pointer">Privacy policy</li>
           </ul>
        </div>
        <div>
          <h2 className="font-semibold text-xl mb-3 text-white">GET IN TOUCH</h2>
          <ul>
            <li className="mb-1 cursor-pointer">+1-212-456-7890</li>
            <li className="mb-1 cursor-pointer">contact@picko.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full mt-5 mb-6 bg-gray-500 h-[2px] border-none" />
      <p className="text-center">Copyright 2024 Picko.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer;
