import React from "react";
import "./CollectionBox.css";

import { Link } from "react-router-dom";

const CollectionBox = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
     <div className="Title">
     <h1>Our Rental Collection </h1>

     </div>
           <div className="collection">
            <div className="collectionLeft">
          <p className="col-p">Rental Collection </p>
          <h3 className="col-h3">
            <span>Mariage </span> Collection
          </h3>
          <div className="col-link">
            <Link to="/rental-mariage" onClick={scrollToTop}>
              <h5>Discover More </h5>
            </Link>
          </div>
        </div>
        <div className="collectionRight">
          <div className="collectionTop">
            <p className="col-p">Rental Collection </p>
            <h3 className="col-h3">
              <span>Oriental</span> Collection
            </h3>
            <div className="col-link">
              <Link to="/rental-oriental" onClick={scrollToTop}>
                <h5>Discover More</h5>
              </Link>
            </div>
          </div>
          <div className="collectionBottom">
            <div className="box1">
              <p className="col-p">Rental Collection</p>
              <h3 className="col-h3">
                <span>Cocktail </span> Collection
              </h3>
              <div className="col-link">
                <Link to="/rental-cocktail" onClick={scrollToTop}>
                  <h5>Discover More </h5>
                </Link>
              </div>
            </div>
       
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionBox;
