import React from "react";
import "./AboutSection.css";
import aboutImage from "../../public/images/nayan1.png";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="text-content" data-aos="fade-right">
          <h2 className="about-title">About Nayan Vihar</h2>
          <p className="about-description">
            Welcome to Nayan Vihar, a serene residential society located in the
            heart of Bhubaneswar. Our society offers a peaceful environment with
            modern amenities, ensuring a comfortable and fulfilling lifestyle
            for its residents. With 150 well-designed houses, beautiful green
            landscapes, and close proximity to key locations, Nayan Vihar is the
            perfect place to call home.
          </p>
          <p className="about-description">
            Our residents enjoy a strong sense of community, and we pride
            ourselves on maintaining a safe and secure environment for families.
            The society is equipped with a clubhouse, parks, and recreational
            areas, making it a vibrant and engaging space for people of all
            ages.
          </p>
        </div>
        <div className="image-content" data-aos="fade-left">
          <img src={aboutImage} alt="Nayan Vihar" className="about-image" />
        </div>
      </div>
    </section>
  );
};

export default About;
