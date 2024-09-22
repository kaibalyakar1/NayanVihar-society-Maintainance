import React, { useState } from "react";
import "./ImageSlider.css";

const images = [
  "/images/nayan1.png",
  "/images/nayan2.png",
  "/images/nayan3.png",
];

const ImageSlider = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="slider-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fixed Overlay for Title */}
      <div className="fixed-overlay">
        <h2>Some Moments of Nayan Vihar</h2>
      </div>

      <div className={`slider ${isPaused ? "paused" : ""}`}>
        <div className="slides">
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
          {/* Duplicate the images for continuous sliding effect */}
          {images.map((image, index) => (
            <div key={index + images.length} className="slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
