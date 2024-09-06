import React from "react";
import "./BuilderInfo.css";
import builderImage from "../../public/images/nayan1.png"; // Replace with your builder image path

const BuilderInfo = () => {
  return (
    <section id="builder-info" className="builder-info">
      <div className="container">
        <div className="text-content">
          <h2>Welcome to B.N. Developers Pvt Ltd</h2>
          <h3>Where We Build Your Trust</h3>
          <p>
            B. N. Developers Pvt. Ltd. is registered under the Companies Act
            1956 with the objective of developing housing projects and
            delivering them to customers. The Company belongs to the B. N. Group
            of the business house of Kendrapara, Odisha.
          </p>
          <p>
            B.N. Group is engaged in the field of trading & services, Real
            Estate & Construction for more than three decades uninterruptedly
            with improving goodwill day by day. The company has moved from
            strength to strength over the years which is a combination of
            discipline, timely delivery, commitment and concern for a quality
            landmark in itself.
          </p>
          <p>
            B.N. Developers Pvt. Ltd. has many firsts to its credits having
            successfully completed its four mega housing projects at Kendrapara
            i.e. Nayan Vihar, Baula Vihar, Hadibandhu Vihar (Residential Housing
            Project) & Sukadev Enclave (Residential Apartment).
          </p>
        </div>
        <div className="image-content">
          <img src={builderImage} alt="Builder" />
        </div>
      </div>
    </section>
  );
};

export default BuilderInfo;
