import React from "react";
import ImageSlider from "./ImageSlider";
import About from "./AboutSection";
import BuilderInfo from "./BuilderInfo";
import Map from "./MapSection";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <About id="about" />
      <ImageSlider />
      <BuilderInfo />
      <Map id="address" />
      <Footer />
    </div>
  );
};

export default HomePage;
