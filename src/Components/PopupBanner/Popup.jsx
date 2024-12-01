import React, { useState } from "react";
import "./Popup.css";
import popupImg from "../../Assets/newsletter-popup.jpg";
import { sendNewsletterSubscription } from "../../APIS/user";
import axios from "axios";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for valid email
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
  
    console.log("Submitting email:", email);
  
    try {
      const response = await sendNewsletterSubscription(email); // Send email
      console.log("Newsletter response:", response);
  
      alert("Thank you for signing up! Check your email for a welcome message.");
      setEmail(""); // Clear the email input
      handleClose(); // Close the popup
    } catch (error) {
      console.error("Error during submission:", error);
  
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      alert(errorMessage);
    }
  };
  
  
  
  return (
    showPopup && (
      <div className="popup-overlay">
        <div className={`popup-content ${fadeOut ? "fade-out" : ""}`}>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
          <div className="popup-left">
            <img src={popupImg} alt="Newsletter" />
          </div>
          <div className="popup-right">
            <h2>Sign Up to Our Newsletter</h2>
            <p>
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>
            <form onSubmit={handleSubmit} >
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit"  >JOIN</button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;
