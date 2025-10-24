"use client";
import React, { createContext, useEffect, useState } from "react";
import { food_list } from "@/app/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response = await axios.post(
        "http://localhost:3000/api/cart/add",
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response = await axios.delete(
        "http://localhost:3000/api/cart/remove",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { itemId },
        }
      );
    }
  };

  const getTotalCartAmount = () => {
    let toatlAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        toatlAmount += itemInfo.price * cartItems[item];
      }
    }
    return toatlAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/food/getFoodList"
    );
    setFoodList(response.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.get(
      "http://localhost:3000/api/cart/get",{
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      })
    setCartItems(response.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("Picko.")) {
        setToken(localStorage.getItem("Picko."));
        await loadCartData(localStorage.getItem("Picko."));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
