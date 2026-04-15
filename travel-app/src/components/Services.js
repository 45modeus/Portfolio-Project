import "../styles/Services.css";

function Services() {
  return (
    <div className="services" id="services">
      <h2>Our Premium Services</h2>

      <div className="services-grid">
        <div className="card">
          <h3>🏝 Island Tours</h3>
          <p>Full-day guided tours around Mauritius</p>
        </div>

        <div className="card">
          <h3>🏨 Hotel Booking</h3>
          <p>Luxury and budget hotel reservations</p>
        </div>

        <div className="card">
          <h3>🚗 Airport Transfers</h3>
          <p>Private and comfortable transport service</p>
        </div>

        <div className="card">
          <h3>🌊 Water Activities</h3>
          <p>Diving, snorkeling, and dolphin tours</p>
        </div>
      </div>
    </div>
  );
}

export default Services;