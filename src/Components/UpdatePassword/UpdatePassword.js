import React, { useState, useEffect } from "react";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setUser } from "../../Reducers/User/userSlice";
import { updatePassword } from "../../APIS/user";
import { useNavigate } from "react-router-dom";


const UpdatePassword = () => {



  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/loginSignUp");
    }
  }, [isAuthenticated, navigate]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validate the passwords (ensure they match)
    if (inputs.newPassword !== inputs.confirmNewPassword) {
      setErrors({ confirmNewPassword: "New passwords do not match." });
      setLoading(false);
      return;
    }

    try {
      const response = await updatePassword(inputs.oldPassword, inputs.newPassword);
      console.log("Update password response:", response);

      if (response.success) {
        setSuccess(true);
        console.log("Password updated successfully. Navigating to home...");

        // Clear the input fields after successful password change
        setInputs({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });


      } else {
        setErrors({ general: response.message || "An error occurred. Please try again." });
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {


      setTimeout(() => {

      navigate("/");
        console.log("console use effect")

      }, 4000);

      console.log("console", success)

    }}, [success,navigate]);


  if (isAuthenticated === null) return <h1>Loading...</h1>;

  return (
    <div className="loginSignUpSection">
      <div className="loginSignUpContainer">
        <div className="loginSignUpTabsContent">
          <div className="loginSignUpTabsContentLogin">

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password *"
                value={inputs.oldPassword}
                onChange={handleChange}
                required
              />
              {errors.oldPassword && (
                <p style={{ color: "red", fontSize: 12 }}>{errors.oldPassword}</p>
              )}

              <input
                type="password"
                name="newPassword"
                placeholder="New Password *"
                value={inputs.newPassword}
                onChange={handleChange}
                required
              />
              {errors.newPassword && (
                <p style={{ color: "red", fontSize: 12 }}>{errors.newPassword}</p>
              )}

              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password *"
                value={inputs.confirmNewPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmNewPassword && (
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors.confirmNewPassword}
                </p>
              )}

              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>

              {errors.general && (
                <p style={{ color: "red", fontSize: 12 }}>{errors.general}</p>
              )}

              {success && (
                <p className="success-message">
                  Password updated successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
