import React, { useContext, useState } from "react";
import "./BookTable.css";
import { StoreContext } from '../../context/StoreContext'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const BookTable = () => {
const {bookTableForUser} = useContext(StoreContext);

    const [formData, setFormData] = useState({
        email: "",
        numberOfPeople: "",
        date: "",
        time: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        bookTableForUser(formData);
    };
  return (
    <div id="book-table" className="book-table">
      <h1>Reserve Your Table</h1>
      <Form>
        <Row>
        <Col className="emailImput">
            <Form.Control placeholder="Registered email address" name="email" value={formData.email} onChange={handleChange} required />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control placeholder="Number of people" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} required />
          </Col>
          <Col>
            <Form.Control placeholder="Enter Date" type="date" name="date" value={formData.date} onChange={handleChange} required />
          </Col>
          <Col>
            <Form.Control placeholder="Enter Time" type="time"  name="time" value={formData.time} onChange={handleChange} required/>
          </Col>
        </Row>
      </Form>
        <button type="submit" onClick={handleSubmit}>Book Now</button>
        <button type="submit" >View Available Table</button>
    </div>
  );
};

export default BookTable;
