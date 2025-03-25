import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./MyBooking.css";

const EventBookings = () => {
  const { url, token } = useContext(StoreContext);
  const [events, seteventData] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedData, setselectedData] = useState(null); 


  const getEventData = async () => {
    try {
      const events = await axios.post(
        url + "/api/book/getEvents",
        {},
        {headers: {token}}
      );
      seteventData(events.data.data);
    } catch {
      alert("Error while retrieving event data");
    }
  }

  const cancelEvent = async () => {
    if (!selectedData) return;
    try {
      await axios.post(url + "/api/book/removeEvent", { eventId: selectedData }, { headers: { token } });

      seteventData((prevevents) => prevevents.filter((event) => event._id !== selectedData));
      setShowModal(false);
      setselectedData(null);
    } catch (error) {
      alert(error.response?.data?.message || "Error canceling Event");
    }
  };

  const handleCancelEvent = (eventId) => {
    setselectedData(eventId);
    setShowModal(true); 
  };

  useEffect(() => {
    if (token) {
      getEventData();
    }
  }, [token]);
  return (
    <div>
      <h1>Event Bookings</h1>
      <div>
      {events.length > 0 ? (
          events.map((event, index) => (
            <div key={event._id} className="booking">
              <h3>Event {index + 1}</h3>
              <p>Event Type: {event.eventType}</p>
              <p>Date: {event.eventDate.split("T")[0]}</p>
              <p>
                From {event.fromTime} To {event.Totime}
              </p>
              <p>Number of People: {event.numberOfPeople}</p>
              <button className="cancel-btn" onClick={() => handleCancelEvent(event._id)}>Cancel Booking</button>
            </div>
          ))
        ) : (
          <p>No event bookings found.</p>
        )}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this event?</p>
            <div className="modal-buttons">
              <button onClick={cancelEvent} className="confirm-btn">
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

export default EventBookings;
