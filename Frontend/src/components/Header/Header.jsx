import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate('/menu');
  }

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Welcome to our food ordering platform! Browse our diverse menu, from tantalizing appetizers to mouthwatering entrees. Order your favorites with ease and convenience. Enjoy delicious meals delivered right to your doorstep!</p>
            <button onClick={goToMenu}>View Menu</button>
        </div>
    </div>
  )
}

export default Header