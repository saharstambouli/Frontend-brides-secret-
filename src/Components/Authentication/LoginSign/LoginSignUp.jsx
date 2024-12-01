import React, { useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setUser } from "../../../Reducers/User/userSlice";
import { login, getUser, register } from "../../../APIS/user";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [inputs, setInputs] = useState({ email: "", password: "", UserName: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState("");

  const initialData = { UserName: "", email: "", password: "" };
  const [data, setData] = useState(initialData);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await login(inputs.email, inputs.password);
      console.log("Login response:", response);

      if (response?.email) {
        setErrors({ email: response.email });
      } else if (response?.password) {
        setErrors({ password: response.password });
      } else if (response?.token) {
        localStorage.setItem("token", response.token);
        dispatch(setIsAuth(true));

        const userData = await getUser();
        if (userData) {
          dispatch(setUser({ email: userData.email, UserName: userData.UserName }));
        } else {
          setErrors({ general: "Failed to retrieve user data." });
        }
      } else {
        setErrors({ general: "Unexpected response from the server." });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    try {
      const res = await register(data);
      if (res?.success) {
        setSuccess(true);
        setData(initialData); 
        setRegistrationSuccessMessage("You have been already registered.");
        setActiveTab("tabButton1"); 
      } else if (res?.email) {
        setErrors({ email: res.email });
      } else {
        setErrors({ general: res.message });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  const handleTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setRegistrationSuccessMessage(""); 
  };

  if (isAuthenticated === null) return <h1>Loading...</h1>;

  return (
    <div className="loginSignUpSection">
      <div className="loginSignUpContainer">
        <div className="loginSignUpTabs">
          <p onClick={() => handleTab("tabButton1")} className={activeTab === "tabButton1" ? "active" : ""}>
            Login
          </p>
          <p onClick={() => handleTab("tabButton2")} className={activeTab === "tabButton2" ? "active" : ""}>
            Register
          </p>
        </div>
        <div className="loginSignUpTabsContent">
          {activeTab === "tabButton1" && (
            <div className="loginSignUpTabsContentLogin">
              {registrationSuccessMessage && (
                <p style={{ color: "green", fontSize: 12 }}>{registrationSuccessMessage}</p>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address *"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p style={{ color: "red", fontSize: 12 }}>{errors.email}</p>}
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={inputs.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <p style={{ color: "red", fontSize: 12 }}>{errors.password}</p>}
                
                <div className="forgotPassword">
                  <Link to="/forgot-password" style={{ fontSize: 12, color: "black" }}>
                    Forgot Password?
                  </Link>
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </button>
                {errors.general && <p style={{ color: "red", fontSize: 12 }}>{errors.general}</p>}
              </form>
              <div className="loginSignUpTabsContentLoginText">
                <p>No account yet? <span onClick={() => handleTab("tabButton2")}>Create Account</span></p>
              </div>
            </div>
          )}

          {activeTab === "tabButton2" && (
            <div className="loginSignUpTabsContentRegister">
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  name="UserName"
                  placeholder="UserName *"
                  value={data.UserName}
                  onChange={handleChange}
                  required
                />
                {errors.UserName && <p style={{ color: "red", fontSize: 12 }}>{errors.UserName}</p>}
                <input
                  type="email"
                  name="email"
                  placeholder="Email address *"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p style={{ color: "red", fontSize: 12 }}>{errors.email}</p>}
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <p style={{ color: "red", fontSize: 12 }}>{errors.password}</p>}
                <button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
                {errors.general && <p style={{ color: "red", fontSize: 12 }}>{errors.general}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
