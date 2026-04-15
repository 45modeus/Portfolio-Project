import { useState } from "react";
import "../styles/Booking.css";

function Booking() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    service: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ get today's date (for min date)
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      setResponseMsg(data.message);
      setShowModal(true);

      // reset form
      setForm({
        name: "",
        date: "",
        service: ""
      });

    } catch (err) {
      setResponseMsg("Something went wrong");
      setShowModal(true);
    }
  };

  return (
    <div className="booking" id="booking">
      <h2>Book Your Experience</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          min={today}
          onChange={handleChange}
        />

        <select
          name="service"
          value={form.service}
          onChange={handleChange}
        >
          <option value="">Select Service</option>
          <option>Island Tour</option>
          <option>Hotel Booking</option>
          <option>Airport Transfer</option>
          <option>Water Activities</option>
        </select>

        <button type="submit">Book Now</button>
      </form>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Booking Status</h3>
            <p>{responseMsg}</p>

            <button onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;