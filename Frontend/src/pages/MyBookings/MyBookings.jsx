import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./MyBooking.css";

const MyBookings = () => {
  const { url, token } = useContext(StoreContext);
  const [bookingData, setBookingData] = useState([]);

  const getBookingData = async () => {
    const info = await axios.post(
      url + "/api/book-table/getBookings",
      {},
      { headers: { token } }
    );
    setBookingData(info.data.data);
  };

  useEffect(() => {
    if (token) {
      getBookingData();
    }
  }, [token]);
  return (
    <div>
      <h1>My Bookings</h1>
      <div>
        {bookingData.map((booking, index) => {
          return (
            <div key={index} className="booking">
              <h3>Booking {index + 1}</h3>
              <p>Number of People: {booking.bookingData.numberOfPeople}</p>
              <p>Date: {booking.bookingData.date}</p>
              <p>Time: {booking.bookingData.time}</p>
              <button
                className="cancel-btn"
              >
                Cancel Booking
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
