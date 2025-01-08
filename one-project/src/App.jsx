import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProductList from "./component/eCommerce/productList";
import ProductDetails from "./component/eCommerce/productDetails";
import Login from "./component/eCommerce/Auth/Login";
import SignUp from "./component/eCommerce/Auth/SignUp";
import ChatWindow from "./component/chat/ChatWindow";
import CustomForm from "./component/Form/CustomForm";
import TaskManagement from "./component/Tasks/TaskManagement";
import { TasksProvider } from "./component/Tasks/myContext";
import UserRoute from "./component/eCommerce/UtilsAuth/userRoute";
import AdminRoute from "./component/eCommerce/UtilsAuth/adminRoute";
import Cart from "./component/eCommerce/UI/Cart";
import Checkout from "./component/eCommerce/UI/checkout";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check if the user is signed in and set roles
  const isAuthed = () => {
    const accessToken = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (accessToken && user) {
      setIsAuthenticated(true);
      setIsAdmin(user.role === "admin");
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  // Check authentication on app load
  useEffect(() => {
    isAuthed();
  }, []);


  return (
    <Provider store={store}>
      <TasksProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            <Navbar isAdmin={isAdmin} />
            <div className="max-w-7xl mx-auto p-4 pt-8">
              <Routes>
                <Route path="/" element={<ProductList isAdmin={isAdmin} />} />
                <Route path="/login" element={<Login setIsAdmin={setIsAdmin} setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/chat" element={<UserRoute><ChatWindow /></UserRoute>} />
                <Route path="/form" element={<CustomForm />} />
                <Route path="/tasks" element={<UserRoute><TaskManagement /></UserRoute>} />
                <Route path="/cart" element={<Cart />}/>
                <Route path="/checkout" element={<UserRoute><Checkout /></UserRoute>}/>

              </Routes>
            </div>
          </div>
        </Router>
      </TasksProvider>
    </Provider>
  );
}

export default App;
