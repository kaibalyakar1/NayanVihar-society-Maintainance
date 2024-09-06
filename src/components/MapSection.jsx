import React from "react";
import "./Map.css";

const Map = () => {
  return (
    <section id="map" className="map">
      <div className="container">
        <h2>Find Us Here</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.7937786492607!2d86.37560701131493!3d20.51467838092994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1bdb73047167e9%3A0x5b42fb769dc93f0b!2sNayan%20Vihar!5e0!3m2!1sen!2sin!4v1725602381003!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nayan Vihar Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Map;
