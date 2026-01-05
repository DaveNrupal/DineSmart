import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymnetPage.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const PaymentPage = () => {
    const navigate = useNavigate();
    const { url } = useContext(StoreContext);
    const [cardDetails, setCardDetails] = useState({
        name: '',
        cardNumber: '',
        expiry: '',
        ccv: '',
        cardType: 'Mastercard'
    });

    const handleChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        try {
            const response = await axios.post(url + '/api/order/payment', cardDetails);
            if (response.data.success) {
                navigate('/success');
            } else {
                alert('Payment failed!');
            }
        } catch (error) {
            alert('Payment error. Try again!');
        }
    };

    const getCardImage = () => {
        return cardDetails.cardType === 'Mastercard' ? assets.mastercard : assets.visacard;
    };

    return (
        <div className="payment-container">
            <h2 className="payment-title">Make Payment</h2>
            <div className="card-details">
                <div className="saved-card">
                    <img src={getCardImage()}  alt={cardDetails.cardType} className="card-image" />
                </div>
                <label className="card-label">Use saved card:
                    <select className="card-dropdown" name="cardType" value={cardDetails.cardType} onChange={handleChange}>
                        <option value="Mastercard">Mastercard</option>
                        <option value="Visa">Visa</option>
                    </select>
                </label>
                <input className="input-field" type="text" placeholder='Your Name' name="name" value={cardDetails.name} onChange={handleChange} />
                <input className="input-field" type="text" placeholder='Your Card number' name="cardNumber" value={cardDetails.cardNumber} onChange={handleChange} />
                <div className="multi-input">
                    <input className="input-field" type="text" name="expiry" placeholder="MM/YY" onChange={handleChange} />
                    <input className="input-field" type="text" name="ccv" placeholder="CCV" onChange={handleChange} />
                </div>
                <button className="payment-button" onClick={handlePayment}>Make Payment</button>
            </div>
        </div>
    );
};

export default PaymentPage;