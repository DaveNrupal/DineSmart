import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false); // ✅ Controls modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ Stores selected order for cancellation

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const cancelOrder = async () => {
    if (!selectedOrder) return;
    try {
      await axios.post(url + "/api/order/removeorder", { orderId: selectedOrder }, { headers: { token } });

      // ✅ Remove canceled order from state
      setData((prevOrders) => prevOrders.filter((order) => order._id !== selectedOrder));

      // ✅ Hide modal after successful cancellation
      setShowModal(false);
      setSelectedOrder(null);
    } catch (error) {
      alert(error.response?.data?.message || "Error canceling order");
    }
  };

  const handleCancelClick = (orderId) => {
    setSelectedOrder(orderId);
    setShowModal(true); // ✅ Show confirmation modal
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) =>
                index === order.items.length - 1 ? item.name + " x " + item.quantity : item.name + " x " + item.quantity + ", "
              )}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf; </span>
              <b>{order.status}</b>
            </p>
            <button onClick={() => handleCancelClick(order._id)}>Cancel Order</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this order?</p>
            <div className="modal-buttons">
              <button onClick={cancelOrder} className="confirm-btn">
                Yes, Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">
                No, Keep It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
