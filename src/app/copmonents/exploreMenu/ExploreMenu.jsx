'use client'
import React from "react";
import { menu_list } from "@/app/frontend_assets/assets";

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="mt-7" id="menu">
      <h1 className="text-3xl font-semibold mb-4">Explore our menu</h1>
      <p className="text-gray-600">
        {" "}
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and elevate your{" "}
      </p>
      <p className="text-gray-600">
        dining experience, one delicious meal at a time.
      </p>
      <div className="flex mb-10 gap-1 items-center justify-between mt-4">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((e) =>
                  e === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="text-center"
            >
              <img
                src={item.menu_image.src}
                alt="item.menu_name"
                className={`cursor-pointer w-24 h-24 mx-auto object-cover rounded-full border-3 transition-all duration-300 ${
                  category === item.menu_name ? "border-red-500 p-1" : "border-transparent"
                }`}
              />
              <p className="mt-2 text-gray-700 cursor-pointer font-medium">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="text-gray-400" />
    </div>
  );
}

export default ExploreMenu;
