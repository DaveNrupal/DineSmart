import React, { useContext, useState } from 'react';
import Modal from '../../components/ModelBox/Modal';
import './Donations.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export default function Donations() {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);
  const [amount, setAmount] = useState(10);
  const [isRecurring, setIsRecurring] = useState(false);
  const [meals, setMeals] = useState(1);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDonate = async () => {
    try {
      const response = await fetch(url + '/api/donate/AddDonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, isRecurring }),
      });
      if (response.ok) {
         navigate('/payment', { state: { amount, isRecurring } });
      } else {
        setModalMessage('Donation failed. Please try again.');
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage('Donation failed. Please try again.');
      setIsModalOpen(true);
    }
  };

  const handleDonateFood = async () => {
    try {
      const response = await fetch(url + '/api/foodDonate/donate-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meals }),
      });
      if (response.ok) {
        navigate('/payment', { state: { meals } });
      } else {
        setModalMessage('Food donation failed. Please try again.');
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage('Food donation failed. Please try again.');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="donation-container">
      <h1>Support the Cause</h1>
      <div className="donation-cards">
        <div className="donation-card">
          <h2>Donate Money</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div>
          <input
                type="checkbox"
                checked={isRecurring}
                onChange={() => setIsRecurring(!isRecurring)}
              />
            <p>Make it Monthly</p>
          </div>
          <button onClick={handleDonate}>Donate</button>
        </div>
        <div className="donation-card">
          <h2>Donate Food</h2>
          <input
            type="number"
            value={meals}
            onChange={(e) => setMeals(Number(e.target.value))}
          />
          <span>Number of Meals</span>
          <br />
          <span>1 Meal = 5$</span>
          <button onClick={handleDonateFood}>Pledge Food</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}
