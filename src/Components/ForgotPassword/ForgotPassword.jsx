import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from '../../APIS/user';

const ForgotPassword = () => {
    const [activeTab, setActiveTab] = useState("tabButton1");
    const [inputs, setInputs] = useState({ email: "" });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const res = await forgotPassword(inputs.email); // Pass the actual email input here
        if (res?.success) {
            setSuccess(true);
            setErrors({});
        } else if (res?.email) {
            setErrors({ email: res.email });
            setSuccess(false);
        } else {
            setErrors({ general: "An error occurred. Please try again." });
            setSuccess(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    return (
        <div className="loginSignUpSection">
            <div className="loginSignUpContainer">
                <div className="loginSignUpTabs">
                    <p>Forgot  password</p>
                </div>
                <div className="loginSignUpTabsContent">
                    {activeTab === "tabButton1" && (
                        <div className="loginSignUpTabsContentLogin">
                            <form onSubmit={handleForgotPassword}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address *"
                                    value={inputs.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && (
                                    <p className='message message--error'>{errors.email}</p>
                                )}
                                <button type="submit">Reset password</button>
                                {errors.general && (
                                    <p style={{ color: "red", fontSize: 12 }}>{errors.general}</p>
                                )}
                            </form>
                            {success && (
                                <p className='message message--success'>
                                    A link has been sent to {inputs.email}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
