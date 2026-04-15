import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3>🌴 Island Escape</h3>

        <p>Explore Mauritius with comfort and style.</p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#booking">Booking</a>
          <a href="#contact">Contact</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Island Escape. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;