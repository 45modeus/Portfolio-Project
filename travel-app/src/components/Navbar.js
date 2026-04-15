import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <h2
        className="logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        🌴 Island Escape
      </h2>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#booking" onClick={() => setMenuOpen(false)}>Booking</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

        {/* ✅ ADMIN LINK (NEW) */}
        <Link
          to="/admin-login"
          onClick={() => setMenuOpen(false)}
        >
          Admin
        </Link>

      </div>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

    </nav>
  );
}

export default Navbar;