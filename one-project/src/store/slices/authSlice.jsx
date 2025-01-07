import { createSlice } from "@reduxjs/toolkit";

// Get initial state from localStorage
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false, // Initialize isAdmin from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { role, ...userData } = action.payload; // Extract role and other user data
      state.isAdmin = role === "admin"; // Set isAdmin based on role
      state.user = userData; // Set user data (excluding role)
      
      // Save user and isAdmin to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAdmin", state.isAdmin);
    },
    logout: (state) => {
      state.isAdmin = false;
      state.user = null;
      
      // Remove user and isAdmin from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("access_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;