import React, { useState } from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";

const Notification = ({ url }) => {
  const [message, setmessage] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/notifications/add`, {message});
      if (response.data.success) {
        setmessage(""); // Reset input field
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to send notification");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-product-name flex-col">
          <p>Notification message</p>
          <input
            onChange={(e) => setmessage(e.target.value)} // Corrected onChange
            value={message} 
            type="text"
            name="message"
            placeholder="Type here"
          />
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Notification;
