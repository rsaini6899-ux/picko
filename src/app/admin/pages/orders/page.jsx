"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { assets } from "../../../frontend_assets/assets";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get("http://localhost:3000/api/order/list");
    setOrders(response.data);
  };

  const statusHandler = async (e, orderId) => {
    const data = {
      
    }
    const response = await axios.post('http://localhost:3000/api/order/status', {orderId, status: e.target.value})
    await fetchAllOrders()
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} style={{ gridTemplateColumns: "0.5fr 2fr 1fr 1fr 1fr" }} className="order-item grid items-start gap-[30px] border border-orange-500 p-[20px] m-[30px]  text-[#505050] ">
            <img src={assets.parcel_icon.src} alt="" />
            <div>
              <p className="order-item-food font-semibold">
                {order.items.map(
                  (item, idx) =>
                    `${item.name} x ${item.quantity}${
                      idx === order.items.length - 1 ? "" : ", "
                    }`
                )}
              </p>
              <p className="order-item-name font-semibold mt-[30px] mb-[5px] ">{order.address.firstName+" "+order.address.lastName }</p>
              <div className="order-item-address mb-[10px]">
                <p>{order.address.street+", "}</p>
                <p>{order.address.city+", " +order.address.state+", " +order.address.country+", "  +order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <p>items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className="bg-[#ffe8e4] text-xs border border-orange-500 w-[120px] text-black p-[6px] outline-none ">
             <option value="Food Processing">Food Processing</option>
             <option value="Out for delivery">Out for delivery</option>
             <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
