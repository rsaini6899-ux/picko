'use client'
import React from "react";

function Header() {
  return (
    <div className="">
      <div className="relative">
        {/* Background Image */}
        <img
          src="/header_img.png"
          alt=""
          className="sm:h-[450px] h-[250px] w-full"
        />

        {/* Content Over Image */}
        <div className="absolute sm:top-40 left-10 top-10 sm:left-25 inset-0 text-white animate-fadeIn">
          <h2 className="text-xl sm:text-5xl font-semibold mb-2">
            Order your
          </h2>
          <p className="text-xl sm:text-5xl font-semibold mb-2">favourite food here</p>
          <p className="text-sm sm:text-xs max-w-xl mb-4 ">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <button className="bg-white text-sm cursor-pointer text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
