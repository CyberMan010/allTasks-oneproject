import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ProductList from "./component/eCommerce/productList";
import ProductDetails from "./component/eCommerce/productDetails";
import Login from "./component/eCommerce/Auth/Login";
import SignUp from "./component/eCommerce/Auth/SignUp";
import ChatWindow from "./component/chat/ChatWindow";
import CustomForm from "./component/Form/CustomForm";
import TaskManagement from "./component/Tasks/TaskManagement";
import { TasksProvider } from "./component/Tasks/myContext";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin on app load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }
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
                <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/chat" element={<ChatWindow />} />
                <Route path="/form" element={<CustomForm />} />
                <Route path="/tasks" element={<TaskManagement />} />
              </Routes>
            </div>
          </div>
        </Router>
      </TasksProvider>
    </Provider>
  );
}

export default App;