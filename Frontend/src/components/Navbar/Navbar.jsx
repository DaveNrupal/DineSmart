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
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Food Category</a>
                <a href='/eventBooking' onClick={() => setMenu("eventBooking")} className={menu === "eventBooking" ? "active" : ""}>Event Booking</a>
                {/* <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a> */}
                <a href='#book-table' onClick={() => setMenu("book-table")} className={menu === "book-table" ? "active" : ""}>Book Table</a>
                {/* <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a> */}
                <Link to='/menu' onClick={() => setMenu("fullMenu")} className={menu === "fullMenu" ? "active" : ""}>Menu</Link>
                <a href='/notification' onClick={() => setMenu("notification")} className={menu === "notification" ? "active" : ""}>Notification</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
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
