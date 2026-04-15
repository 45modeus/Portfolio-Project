import Hero from "../components/Hero";
import Services from "../components/Services";
import Booking from "../components/Booking";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
      <Hero />

      <div className="container">
        <Services />
      </div>

      <div className="container">
        <Booking />
      </div>

      <Contact />
    </>
  );
}

export default Home;