import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Navbar from "./components/Navbar";
import ImageSlider from "./components/ImageSlider";
import About from "./components/AboutSection.jsx";
import BuilderInfo from "./components/BuilderInfo.jsx";
import Map from "./components/MapSection.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <About />
      <ImageSlider />
      <BuilderInfo />
      <Map />
      <Footer />
    </>
  );
}

export default App;
