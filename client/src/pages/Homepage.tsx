import About from "../components/About.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import HowToReport from "../components/HowToReport.tsx";
import Navbar from "../components/Navbar.tsx";
import Stats from "../components/Stats.tsx";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Stats />
      <HowToReport />
      <Footer />
    </>
  );
};

export default Homepage;
