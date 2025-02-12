import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, removeFromCart, getTotalCartAmount, menu, totalAmount, setTotalAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchTotalAmount = async () => {
  const amount = await getTotalCartAmount();
  setTotalAmount(amount);
  };

  fetchTotalAmount();
}, [cartItems]);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
       {Object.keys(cartItems).map((itemId, index) => {
        if (cartItems[itemId] > 0) {
            const item = menu.find((m) => m._id === itemId);

              if (!item) return null; 

    return (
      <div key={index}>
        <div className="cart-items-title cart-items-item">
          <img src={`/assets/${item.image}.png`} alt="" />
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>{cartItems[itemId]}</p>
          <p>${item.price * cartItems[itemId]}</p>
          <p onClick={() => removeFromCart(itemId)} className="cross">x</p>
        </div>
        <hr />
      </div>
    );
  }
  return null;
})}
      </div>
      <div className="cart-bottom">
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
              <p>${totalAmount===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalAmount===0?0:totalAmount+2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart