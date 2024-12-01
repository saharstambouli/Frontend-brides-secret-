import React, { useState, useEffect } from "react";
import "./ResetPass.css";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../APIS/user";
import { useParams } from 'react-router-dom';

const ResetPass = () => {
  const [inputs, setInputs] = useState({
    Password: "",
    confirmpassword: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate(); // Correctly define navigate here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validateInputs = () => {
    let validationErrors = {};
    if (!inputs.Password) {
      validationErrors.Password = "Password is required";
    } else if (!inputs.confirmpassword) {
      validationErrors.confirmpassword = "Confirm Password is required";
    } else if (inputs.Password !== inputs.confirmpassword) {
      validationErrors.confirmpassword = "Passwords do not match";
    }
    return validationErrors;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      const res = await resetPassword(token, inputs.Password);
      console.log("API response:", res); // Log the API response here
  
      if (res?.success) {
        setSuccess(true); // Trigger success message and navigation
        setErrors({});
      } else if (res?.Password) {
        setErrors({ Password: res.Password }); // Show password error
      } else if (res?.failure) {
        setErrors({ failure: res.failure }); // Show generic error
      }
    }
  };
  
  

  useEffect(() => {
    if (success) {
      setTimeout(() => navigate('/loginSignUp'), 2000);
    }
  }, [success, navigate]); // Include navigate in the dependency array

  return (
    <div>
      <div className="resetPasswordSection">
        <h2>Reset Your Password</h2>
        <div className="resetPasswordContainer">
          <form onSubmit={handlePasswordChange}>
            <input
              type="password"
              name="Password"
              placeholder="New Password"
              value={inputs.Password}
              onChange={handleChange}
              required
            />
            {errors.Password && (
              <p style={{ color: "red", fontSize: 12 }}>{errors.Password}</p>
            )}

            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={inputs.confirmpassword}
              onChange={handleChange}
              required
            />
            {errors.confirmpassword && (
              <p style={{ color: "red", fontSize: 12 }}>{errors.confirmpassword}</p>
            )}
            <button type="submit">Submit</button>
          </form>
          {success && (
            <p className="message success">Password Changed Successfully! Redirecting to Login Page...</p>
          )}
          {errors.failure && (
            <p className="message message--error">{errors.failure}</p>
          )}
        </div>
        <p>
          Back to{" "}
          <Link to="/loginSignUp">
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPass;
