import { useState } from "react";
import "../styles/Booking.css";

function Booking() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    service: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="booking" id="booking">
      <h2>Book Your Experience</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" onChange={handleChange} />

        <input type="date" name="date" onChange={handleChange} />

        <select name="service" onChange={handleChange}>
          <option>Select Service</option>
          <option>Island Tour</option>
          <option>Hotel Booking</option>
          <option>Airport Transfer</option>
          <option>Water Activities</option>
        </select>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default Booking;