import React from "react";
import "./About.css";
import merchantOnboardingV2 from "../assets/MerchantOnboardingV3.svg";
import updatedStateDiagram from "../assets/V5.png";
import cardsPOCDiagram from "../assets/cardsPocImg.png";
import Footer from "./Footer";

const About = () => {
  return (
    <div
      id="carouselExampleDark"
      className="carousel carousel-dark slide"
      data-bs-touch="false"
      data-bs-interval="false"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          {/* <img
            src={merchantOnboardingV2}
            className="d-block w-100 image1H"
            alt="No merchantOnboarding Image"
          />
          <br /> */}
          <div
            style={{
              height: "85vh",
              // backgroundImage: `url(./assets/images/merchantOnboarding.svg)`,
              // backgroundRepeat: "no-repeat",
              // backgroundSize: "auto",
              // backgroundPosition: "center",
            }}
            className="d-flex align-items-center justify-content-center border border-dark m-2"
          >
            <img
              src={merchantOnboardingV2}
              className="d-block w-100 image1H"
              alt="No merchantOnboarding Image"
            />
          </div>
        </div>
        <div className="carousel-item">
          {/* <div
            style={{ height: "85vh" }}
            className="d-flex align-items-center justify-content-center"
          >
            <img src={updatedStateDiagram} alt="No salesReturn Image" />
          </div> */}

          <div
            style={{
              height: "85vh",
              backgroundImage: `url(./assets/images/cardsPocStateDiagram.png)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
            className="d-flex align-items-center justify-content-center border border-dark m-2"
          ></div>
        </div>

        <div className="carousel-item ">
          <div
            style={{
              height: "85vh",
              backgroundImage: `url(./assets/images/cardsPocImg.png)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto",
              backgroundPosition: "center",
            }}
            className="d-flex align-items-center justify-content-center border border-dark m-2"
          ></div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default About;
