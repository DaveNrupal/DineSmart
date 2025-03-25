import React, { useContext, useState } from "react";
import "./EventBooking.css";
import { StoreContext } from "../../context/StoreContext";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const EventBooking = () => {
    const { bookEventForUser } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        numberOfPeople: "",
        eventType: "",
        date: "",
        fromTime: "",
        Totime: "",
        specialRequests: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.numberOfPeople || !formData.eventType || !formData.date || !formData.fromTime || !formData.Totime) {
            alert("Please fill in all required fields.");
            return;
        }
        bookEventForUser(formData);
    };

    return (
        <div id="book-table" className="book-table">
            <h1>Book an Event</h1>
            <Form>
                <Row>
                    <Col>
                        <Form.Control 
                            type="text"
                            placeholder="Your Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="email"
                            placeholder="Registered Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="tel"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Form.Control
                            type="number"
                            placeholder="Number of People"
                            name="numberOfPeople"
                            value={formData.numberOfPeople}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Select name="eventType" value={formData.eventType} onChange={handleChange} required>
                            <option value="">Select Event Type</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <label>Date</label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <label>From</label>
                        <Form.Control
                            type="time"
                            name="fromTime"
                            value={formData.fromTime}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col>
                        <label>To</label>
                        <Form.Control
                            type="time"
                            name="Totime"
                            value={formData.Totime}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Form.Control
                            as="textarea"
                            placeholder="Special Requests (optional)"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleChange}
                            rows={3}
                        />
                    </Col>
                </Row>

                <div className="mt-4">
                    <button type="submit" className="book-btn"  onClick={handleSubmit}>Book Now</button>
                    {/* <button type="button" className="view-btn">Show Suggestions</button> */}
                </div>
            </Form>
        </div>
    );
};

export default EventBooking;
