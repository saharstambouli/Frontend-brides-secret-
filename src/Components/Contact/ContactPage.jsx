import React, { useState, useEffect } from "react";
import "./ContactPage.css";
import { sendMessages } from "../../APIS/user";

const ContactPage = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await sendMessages(email, name, message);
      if (response.success) {
        setSuccessMessage("Your message was sent successfully! We will get back to you soon.");
        // Reset the form fields
        setname("");
        setEmail("");
        setmessage("");
      } else {
        setErrorMessage(response.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      setErrorMessage("There was an error sending your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Scroll to top with a delay only when successMessage is set
  useEffect(() => {
    if (successMessage) {
      // Add delay before scrolling
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 2000); 
      
      // Clear timeout if the component unmounts or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage]); 

  return (
    <div className="contactSection">
      <h2>Contact Us</h2>
      <div className="contactMap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12951.689345058576!2d10.806492560966296!3d35.752713605117684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302139047d336c5%3A0xbc5257151f3392c8!2sBride&#39;s%20Secret!5e0!3m2!1sfr!2stn!4v1729766086589!5m2!1sfr!2stn"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bride's Secret Location"
        ></iframe>
      </div>
      <div className="contactInfo">
        <div className="contactAddress">
          <div className="address">
            <h3>Store in Monastir</h3>
            <p>
              181 Cité el agba, bretelle route Khniss, près de la mosquée
              <br /> Monastir, Tunisia
            </p>
            <p>
              admin@dummymail.com
              <br />
              +216 93 601 103
            </p>
          </div>
          <div className="address">
            <h3>Store in Sousse</h3>
            <p>
              Rue des orangers
              <br /> Sousse, Tunisia
            </p>
            <p>
              contact@dummymail.com
              <br />
              +216 93 601 103
            </p>
          </div>
        </div>
        <div className="contactForm">
          <h3>Get In Touch</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              placeholder="Name *"
              onChange={(e) => setname(e.target.value)}
              required
            />
            <input
              type="email"
              value={email}
              placeholder="Email address *"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              rows={10}
              cols={40}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
