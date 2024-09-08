import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Navbar from "./components/Navbar";
import ImageSlider from "./components/ImageSlider";
import About from "./components/AboutSection.jsx";
import BuilderInfo from "./components/BuilderInfo.jsx";
import Map from "./components/MapSection.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <section id="about">
        <About />
      </section>
      <section id="moments">
        <ImageSlider />
      </section>
      <section id="info">
        <BuilderInfo />
      </section>
      <section id="address">
        <Map />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </>
  );
}

export default App;
