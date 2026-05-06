import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.startsWith("/admin");

  const handleScroll = (id) => {
    setMenuOpen(false);
    
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${isAdmin ? "admin-navbar" : ""}`}>

      <h2
        className="logo"
        onClick={() => handleScroll("home")}
      >
        🌴 Island Escape
      </h2>

      {isAdmin ? (
        <div className="admin-nav">
          <Link to="/" className="admin-back">
            ← Back to Website
          </Link>
        </div>
      ) : (
        <>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <span onClick={() => handleScroll("home")}>Home</span>
            <span onClick={() => handleScroll("services")}>Services</span>
            <span onClick={() => handleScroll("booking")}>Booking</span>
            <span onClick={() => handleScroll("contact")}>Contact</span>

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