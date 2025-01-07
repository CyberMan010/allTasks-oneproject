import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import CustomButton from "../UI/Button";
import CustomInput from "../UI/Input";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  // Validate name
  const validateName = (value) => {
    if (!value) {
      setNameError("Name is required.");
    } else if (value.length < 3) {
      setNameError("Name must be at least 3 characters.");
    } else {
      setNameError("");
    }
  };

  // Validate email
  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Validate password
  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required.");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  // Validate avatar URL
  const validateAvatar = (value) => {
    if (!value) {
      setAvatarError("Avatar URL is required.");
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value)) {
      setAvatarError("Please enter a valid image URL (jpg, jpeg, png, gif).");
    } else {
      setAvatarError("");
    }
  };

  // Check if the email is already registered
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
  const handleSignUp = async () => {
    // Clear previous errors
    setFormError("");

    // Validate all fields
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    validateAvatar(avatar);

    // Check if there are any validation errors
    if (nameError || emailError || passwordError || avatarError || !name || !email || !password || !avatar) {
      setFormError("Please fix the errors before submitting.");
      return;
    }

    // Step 1: Check if the email is already registered
    const isEmailAvailable = await checkEmailAvailability();
    if (!isEmailAvailable) {
      setFormError("This email is already registered. Please use a different email.");
      return;
    }

    try {
      // Step 2: Sign up the user
      const response = await axios.post("/users/", {
        name,
        email,
        password,
        avatar,
      });
      console.log("SignUp successful:", response.data);

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("SignUp failed:", error);

      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 400) {
          setFormError("Invalid input. Please check your data.");
        } else if (error.response.status === 409) {
          setFormError("This email is already registered.");
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
        <p className="text-red-600">You are already signed up!</p>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            <CustomInput
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              onBlur={() => validateName(name)}
              className="w-full mb-4"
            />
            {nameError && <p className="text-red-500 text-sm mb-2">{nameError}</p>}

            <CustomInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              className="w-full mb-4"
            />
            {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}

            <CustomInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              onBlur={() => validatePassword(password)}
              className="w-full mb-4"
            />
            {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}

            <CustomInput
              type="text"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
                validateAvatar(e.target.value);
              }}
              onBlur={() => validateAvatar(avatar)}
              className="w-full mb-6"
            />
            {avatarError && <p className="text-red-500 text-sm mb-2">{avatarError}</p>}

            <CustomButton onClick={handleSignUp} className="w-full">
              Sign Up
            </CustomButton>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;