import { createSlice } from "@reduxjs/toolkit";

// Get initial state from localStorage
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false, // Initialize isAdmin from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
  },
  reducers: {
    login: (state, action) => {
      const { role, ...userData } = action.payload;
      state.isAdmin = role === "admin";
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAdmin", state.isAdmin);
    },
    logout: (state) => {
      state.isAdmin = false; // Clear isAdmin
      state.user = null; // Clear user
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("access_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;