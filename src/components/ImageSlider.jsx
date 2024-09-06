import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const images = [
  "/images/nayan1.png",
  "/images/nayan1.png",
  "/images/nayan1.png",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <button className="prev" onClick={goToPrevious}>
          &lt;
        </button>
        <div
          className="slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentIndex ? "active" : ""}`}
            >
              <div className="overlay">
                <h2>Some Moments of Nayan Vihar</h2>
              </div>
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="next" onClick={goToNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
