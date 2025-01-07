import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/authSlice";
import axios from "../api/axios";
import CustomButton from "../UI/Button";
import CustomInput from "../UI/Input";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate email on change or blur
  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Validate password on change or blur
  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required.");
    } else if (value.length < 5) {
      setPasswordError("Password must be at least 5 characters.");
    } else {
      setPasswordError("");
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value); // Live validation
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value); // Live validation
  };

  // Check if the email is registered
  const checkEmailAvailability = async () => {
    try {
      const response = await axios.post("/users/is-available", { email });
      return response.data.isAvailable; // true if available, false if registered
    } catch (error) {
      console.error("Error checking email availability:", error);
      return false; // Assume email is registered if there's an error
    }
  };

  // Handle form submission
  const handleLogin = async () => {
    // Clear previous form errors
    setFormError("");

    // Validate all fields before submitting
    validateEmail(email);
    validatePassword(password);

    // Check if there are any validation errors
    if (emailError || passwordError || !email || !password) {
      setFormError("Please fix the errors before submitting.");
      return;
    }

    // Step 1: Check if the email is registered
    const isEmailAvailable = await checkEmailAvailability();
    if (isEmailAvailable) {
      setFormError("This email does not exist. Please register first.");
      return;
    }

    try {
      // Step 2: Login to get access_token and refresh_token
      const loginResponse = await axios.post("/auth/login", { email, password });
      const { access_token } = loginResponse.data;

      // Step 3: Fetch user profile using the access_token
      const profileResponse = await axios.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Step 4: Dispatch login action with user data
      dispatch(login(profileResponse.data));
      navigate("/");

      // Save tokens to localStorage (optional)
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(profileResponse.data));
    } catch (error) {
      console.error("Login failed:", error);

      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 401) {
          setFormError("Unauthorized access. Please contact support.");
        } else if (error.response.status === 403) {
          setFormError("Invalid password.");
        } else {
          setFormError("An error occurred. Please try again later.");
        }
      } else {
        setFormError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <>
      {localStorage.getItem("access_token") && localStorage.getItem("user") ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <p className="text-red-500 bg-red-50 px-6 py-3 rounded-lg font-medium">
              You are already logged in
            </p>
            <Link 
              to="/" 
              className="inline-block px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Get back home
            </Link>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Welcome Back
            </h2>
            
            <div className="space-y-4">
              <div>
                <CustomInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => validateEmail(email)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {emailError && 
                  <p className="mt-1 text-red-500 text-sm">{emailError}</p>
                }
              </div>
  
              <div>
                <CustomInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => validatePassword(password)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {passwordError && 
                  <p className="mt-1 text-red-500 text-sm">{passwordError}</p>
                }
              </div>
  
              <CustomButton 
                onClick={handleLogin}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </CustomButton>
              
              {formError && 
                <p className="text-red-500 text-sm text-center">{formError}</p>
              }
              
              <p className="text-sm text-center text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;