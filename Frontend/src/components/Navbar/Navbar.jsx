import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => { 

    const [menu, setMenu] = useState("home");

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext)

    const navigate = useNavigate();

    const logout = () =>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo2} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                {/* <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Food Category</a> */}
                <Link to='/menu' onClick={() => setMenu("allmenu")} className={menu === "allmenu" ? "active" : ""}>Menu</Link>
                <Link to='/eventBooking' onClick={() => setMenu("eventBooking")} className={menu === "eventBooking" ? "active" : ""}>Event Booking</Link>
                <a href='#book-table' onClick={() => setMenu("book-table")} className={menu === "book-table" ? "active" : ""}>Book Table</a>
                <Link to='/donation' onClick={() => setMenu("donation")} className={menu === "donation" ? "active" : ""}>Donation</Link>
                
            </ul>
            <div className="navbar-right">
            <Link to='/notification'><img src={assets.bell_icon} alt="" /></Link>
                <div className="navbar-search-icon">  
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                {!token ? 
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                :<div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={()=>navigate('/mybooking')}><img src={assets.bag_icon} alt="" /><p>Bookings</p></li>
                            <hr />
                            <li onClick={()=>navigate('/myeventbooking')}><img src={assets.bag_icon} alt="" /><p>My Events</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    );
}

export default Navbar;
