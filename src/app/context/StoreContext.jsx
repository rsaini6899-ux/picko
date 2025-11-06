// "use client";
// import React, { createContext, useEffect, useState } from "react";
// import { food_list } from "@/app/frontend_assets/assets";
// import axios from "axios";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState("");
//   const [food_list, setFoodList] = useState([]);

//    const BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'https://picko-nu.vercel.app''
//     : 'https://picko-nu.vercel.app';


//   const addToCart = async (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//     if (token) {
//       const response = await axios.post(
//         `${BASE_URL}/api/cart/add`,
//         { itemId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (token) {
//       const response = await axios.delete(
//         `${BASE_URL}/api/cart/remove`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           data: { itemId },
//         }
//       );
//     }
//   };

//   const getTotalCartAmount = () => {
//     let toatlAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         toatlAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return toatlAmount;
//   };

//   const fetchFoodList = async () => {
//     const response = await axios.get(
//       `${BASE_URL}/api/food/getFoodList`
//     );
//     setFoodList(response.data);
//   };

//   const loadCartData = async (token) => {
//     const response = await axios.get(
//       `${BASE_URL}/api/cart/get`,{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }, 
//       })
//     setCartItems(response.data);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       if (localStorage.getItem("Picko.")) {
//         setToken(localStorage.getItem("Picko."));
//         await loadCartData(localStorage.getItem("Picko."));
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;




"use client";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // ✅ Correct base URL logic
  // const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://picko-nu.vercel.app';

    process.env.NODE_ENV === "production"
      ? "https://picko-nu.vercel.app"
      : "http://localhost:3000";

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        `${BASE_URL}/api/cart/add`,
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {
      await axios.delete(`${BASE_URL}/api/cart/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { itemId },
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`https://picko-nu.vercel.app/api/food/getFoodList`);
      setFoodList(response.data);
    } catch (error) {
      console.error("Error fetching food list:", error.message);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error loading cart data:", error.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("Picko.");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
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

