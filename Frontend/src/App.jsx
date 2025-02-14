import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import Menu from './pages/Menu/Menu';
import Success from './pages/Success/Success'
import BookingSuccess from './pages/Success/BookingSuccess'
import MyBookings from './pages/MyBookings/MyBookings'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path='/menu' element={<Menu />} />
          <Route path='/Success' element={<Success />} />
          <Route path='/BookSuccess' element={<BookingSuccess />} />
          <Route path='/mybooking' element={<MyBookings/>} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App