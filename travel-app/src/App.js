import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Contact from "./components/Contact";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container">
        <Services />
      </div>
      <div className="container">
        <Booking />
      </div>
      <div className="container">
        <Contact />
      </div>
    </div>
  );
}

export default App;