import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./auth.css";
import { useNavigate } from "react-router-dom";
const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    houseNumber: "",
    phoneNumber: "",
    email: "",
    password: "",
    otp: "",
  });
  const navigate = useNavigate();
  const toggleForm = () => {
    setIsLogin(!isLogin);
    resetFormState();
  };

  const resetFormState = () => {
    setOtpSent(false);
    setIsOtpVerified(false);
    setUserId(null);
    setFormData({
      name: "",
      houseNumber: "",
      phoneNumber: "",
      email: "",
      password: "",
      otp: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setOtpSent(false);
    setIsLogin(false);
  };

  const sendForgotPasswordOtp = async () => {
    const { email } = formData;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        { email }
      );
      setUserId(response.data.userId); // Save userId from the response
      setOtpSent(true);
      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: "An OTP has been sent to your registered email.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error occurred while sending OTP. Please try again.",
      });
    }
  };

  const verifyForgotPasswordOtp = async () => {
    const { otp } = formData;
    if (!userId || !otp) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please provide both OTP and User ID.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        { userId, otp }
      );
      setIsOtpVerified(true);
      Swal.fire({
        icon: "success",
        title: "OTP Verified",
        text: "OTP successfully verified. You can now reset your password.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Invalid OTP. Please try again.",
      });
    }
  };

  const resetPassword = async () => {
    const { password } = formData;

    // Check if userId and password are provided
    if (!userId || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please provide both User ID and new password.",
      });
      return;
    }

    try {
      // Make the POST request to reset the password
      const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        { userId, newPassword: password } // Ensure correct field name
      );

      // Show success message and redirect to login
      Swal.fire({
        icon: "success",
        title: "Password Reset",
        text: "Your password has been reset successfully!",
      }).then(() => {
        setIsLogin(true);
        resetFormState();
      });
    } catch (error) {
      // Handle error
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Error resetting password. Please try again.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          formData
        );
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
        }).then(() => {
          localStorage.setItem("token", response.data.token);
          navigate("/profile");
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Login failed. Please check your credentials.",
        });
      }
    } else if (!isForgotPassword) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/signup",
          formData
        );
        setUserId(response.data.userId); // Save userId from the response
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "You have successfully signed up. Please check your email for OTP.",
        }).then(() => {
          setOtpSent(true);
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Signup failed. Please try again.",
        });
      }
    }
  };

  return (
    <div className="main">
      <input
        type="checkbox"
        id="chk"
        aria-hidden="true"
        checked={isLogin}
        onChange={toggleForm}
      />

      <div className={`signup ${isLogin ? "hidden" : ""}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            {isForgotPassword ? "Forgot Password" : "Sign up"}
          </label>

          {!otpSent && !isOtpVerified && (
            <>
              {!isForgotPassword ? (
                <>
                  {/* Signup form */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="houseNumber"
                    placeholder="House Number"
                    value={formData.houseNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+91 Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit">Send OTP</button>
                </>
              ) : (
                <>
                  {/* Forgot Password form */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Registered Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="button" onClick={sendForgotPasswordOtp}>
                    Send OTP
                  </button>
                </>
              )}
            </>
          )}

          {otpSent && !isOtpVerified && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleInputChange}
                required
              />
              <button type="button" onClick={verifyForgotPasswordOtp}>
                Verify OTP
              </button>
            </>
          )}

          {otpSent && isOtpVerified && isForgotPassword && (
            <>
              {/* Reset Password input after OTP verification */}
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="button" onClick={resetPassword}>
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>

      <div className={`login ${isLogin ? "" : "hidden"}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="+91 Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button type="button" onClick={handleForgotPassword}>
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
