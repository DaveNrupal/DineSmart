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
import {Success,BookingSuccess, EventSuccessBooking} from './pages/Success/Success'
import MyBookings from './pages/MyBookings/MyBookings'
import EventBooking from './pages/EventBooking/EventBooking'
import EventBookings from './pages/MyBookings/EventBookings'
import Notifications from './pages/Notifications/Notifications'

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
          <Route path='/eventBooking' element={<EventBooking />} />
          <Route path='/Success' element={<Success />} />
          <Route path='/BookSuccess' element={<BookingSuccess />} />
          <Route path='/mybooking' element={<MyBookings/>} />
          <Route path='/EventSuccess' element={<EventSuccessBooking/>} />
          <Route path='/myeventbooking' element={<EventBookings />} />
          <Route path='/notification' element={<Notifications />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App