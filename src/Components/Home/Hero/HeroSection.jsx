import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./HeroSection.css";
import { Model } from "../../Model/Model";
import { Link } from "react-router-dom";
import bgNewsletter from "../../../Assets/Fatma_Bouchiba.png";

const HeroSection = () => {
 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="heroMain"
      style={{ backgroundImage: `url(${bgNewsletter})` }} 
    >
      <div className="sectionleft">
        <p>New Trend</p>
        <h1>New collection is available in store </h1>
               <div className="heroLink">
          <Link to="/collection-for-rent" onClick={scrollToTop}>
            <h5>Discover More</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
