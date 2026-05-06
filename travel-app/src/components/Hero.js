import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBookingScroll = () => {
  if (location.pathname !== "/") {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  } else {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <div className="hero" id="home">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Explore Mauritius Like Never Before</h1>
        <p>Luxury tours, island adventures & unforgettable experiences</p>

        <button className="hero-btn" onClick={handleBookingScroll}>
          Book Your Escape
          </button>
      </motion.div>
    </div>
  );
}

export default Hero;