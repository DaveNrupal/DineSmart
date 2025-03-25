import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./MyBooking.css";

const MyBookings = () => {
  const { url, token } = useContext(StoreContext);
  const [bookingData, setBookingData] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedData, setselectedData] = useState(null); 

  const getBookingData = async () => {
    try {
      const info = await axios.post(
        url + "/api/book/getBookings",
        {},
        { headers: { token } }
      );
      setBookingData(info.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const cancelTable = async () => {
    if (!selectedData) return;
    try {
      await axios.post(url + "/api/book/removeTable", { tableId: selectedData }, { headers: { token } });

      setBookingData((prevtables) => prevtables.filter((table) => table._id !== selectedData));
      setShowModal(false);
      setselectedData(null);
    } catch (error) {
      alert(error.response?.data?.message || "Error canceling Table");
    }
  };

  const handleCancelTable = (tableId) => {
    setselectedData(tableId);
    setShowModal(true); // 
  };

  useEffect(() => {
    if (token) {
      getBookingData();
    }
  }, [token]);
  return (
    <div>
      <h1>Table Bookings</h1>
      <div>
        {bookingData.length > 0 ? (
        bookingData.map((booking, index) => {
          return (
            <div key={index} className="booking">
              <h3>Booking {index + 1}</h3>
              <p>Number of People: {booking.numberOfPeople}</p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <button className="cancel-btn" onClick={() => handleCancelTable(booking._id)}>Cancel Booking</button>
            </div>
          );
        })): ( <p>No event bookings found.</p>)}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this order?</p>
            <div className="modal-buttons">
              <button onClick={cancelTable} className="confirm-btn">
                Yes, Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">
                No, Keep It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
