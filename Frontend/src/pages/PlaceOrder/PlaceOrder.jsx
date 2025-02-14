import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { token, cartItems, url, menu, totalAmount, setTotalAmount } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("Placing order...");

    const orderItems = menu.reduce((acc, item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        acc.push(itemInfo);
      }
      return acc;
    }, []);

    const orderData = {
      address: formData,
      items: orderItems,
      amount: totalAmount + 2,
    };

    
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      console.log("Response from server:", response.data);
      
      // if (response.data.success) {
      //   const { session_url } = response.data;
      //   console.log("Redirecting to:", session_url);
      //   window.location.replace(session_url);
      // } else {
      //   alert("Error: " + response.data.message);
      // }
      if (response.data.success) {
        navigate(`/Success`);
    } else {
        alert("Order failed!");
    }
  }

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(totalAmount===0){
      navigate('/cart')
    }
  },[token])

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    // onSubmit={placeOrder}
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={formData.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={formData.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={formData.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={formData.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={formData.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={formData.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={formData.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={formData.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${totalAmount === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalAmount === 0 ? 0 : totalAmount + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
