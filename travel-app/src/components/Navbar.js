import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <nav className={`navbar ${isAdmin ? "admin-navbar" : ""}`}>

      <h2
        className="logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        🌴 Island Escape
      </h2>

      {/* ADMIN MODE NAVBAR */}
      {isAdmin ? (
        <div className="admin-nav">
          <Link to="/" className="admin-back">
            ← Back to Website
          </Link>
        </div>
      ) : (
        <>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#booking" onClick={() => setMenuOpen(false)}>Booking</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

            <Link to="/admin-login" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        </>
      )}

    </nav>
  );
}

export default Navbar;