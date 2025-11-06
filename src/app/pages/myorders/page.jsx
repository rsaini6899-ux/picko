"use client";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../../app/frontend_assets/assets";

function MyOrder() {
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      "https://picko-nu.vercel.app/api/order/userOrders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data);
    console.log(response.data)
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Food Processing':
        return '👨‍🍳';
      case 'Out for delivery':
        return '🚚';
      case 'Delivered':
        return '📦';
      default:
        return '🔄';
    }
  };

  return (
    <div className="my-orders m-[50px] ">
      <h2>My Orders</h2>
      <div className="container flex flex-col gap-[20px] mt-[30px] ">
        {data.map((order, index) => (
          <div key={index} style={{ gridTemplateColumns: "0.5fr 2fr 1fr 1fr 2fr 1fr" }} className="my-orders-order grid items-centergap-[30px] items-center text-lg p-[10px] text-[#454545] border border-orange-500 ">
            <img className="w-[50px]" src={assets.parcel_icon.src} alt="" />
            <p className="text-black">
              {order.items.map(
                (item, idx) =>
                  item.name +
                  " x " +
                  item.quantity +
                  (idx === order.items.length - 1 ? "" : ", ")
              )}
            </p>
            <p>${order.amount}.00</p>
        

        {/* This part will show only once after the loop */}
        <p>items: {order.items.length}</p>
        <p className="font-medium text-[#454545]">{getStatusIcon(order.status)} {order.status}</p>
        <button onClick={fetchOrders} className="p-[10px] rounded-lg bg-[#ffe1e1] cursor-pointer text-[#454545] ">Track Order</button>
        </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrder;
