"use client";
import { StoreContext } from "@/app/context/StoreContext";
import { assets } from "@/app/frontend_assets/assets";
import React, { useContext } from "react";

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart} =
    useContext(StoreContext);

  return (
    <div className="m-auto rounded-2xl shadow-xl transition duration-500 ">
      <div className="relative">
        <img className="rounded-tl-2xl rounded-tr-2xl" src={`http://localhost:3000/uploads/${image}`} alt="" />
        {!cartItems[id] ? (
          <img
            className="w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white.src}
            alt=""
          />
        ) : (
          <div className="flex items-center absolute bottom-[15px] gap-4 right-[15px] p-[6px] rounded-3xl bg-white cursor-pointer">
            <img
              className="w-[30px]"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red.src}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              className="w-[30px]"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green.src}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="p-[20px]">
        <div className="flex justify-between items-center mb-[10px]">
          <p className="text-xl font-medium text-gray-700">{name}</p>
          <img className="w-[70px]" src={assets.rating_starts.src} alt="" />
        </div>
        <p className="text-[#676767] text-sm">{description}</p>
        <p className="text-red-500 text-lg font-semibold mt-2">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
