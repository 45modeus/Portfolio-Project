import { motion } from "framer-motion";
import "../styles/Hero.css";

function Hero() {
  return (
    <div className="hero" id="home">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Explore Mauritius Like Never Before</h1>
        <p>Luxury tours, island adventures & unforgettable experiences</p>

        <a href="#booking" className="hero-btn">
          Book Your Trip
        </a>
      </motion.div>
    </div>
  );
}

export default Hero;