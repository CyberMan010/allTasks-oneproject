import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MessageCircle, ClipboardList, FileText, Projector, LogInIcon } from "lucide-react";
import axios from "./component/eCommerce/api/axios";
import CustomButton from "./component/eCommerce/UI/Button";
import CustomInput from "./component/eCommerce/UI/Input";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { logout } from "./store/slices/authSlice";

const NavItem = ({ to, icon: Icon, children, isCircle }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
  <NavLink
        to={to}
        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-gray-100 text-gray-700 hover:text-blue-600"
        } ${isCircle ? "rounded-full p-3" : ""}`}
      >
        <Icon
          className={`w-5 h-5 ${isCircle ? "" : "mr-2"} ${
            isActive ? "text-blue-600" : "text-gray-500"
          }`}
        />
        {!isCircle && <span className="font-medium">{children}</span>}
      </NavLink>
    );
  };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false); // State for auth dropdown
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token")

  const dispatch = useDispatch();
  const { isAdmin, user } = useSelector((state) => state.auth); // Get auth state from Redux

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleAuthDropdown = () => {
    setShowAuthDropdown(!showAuthDropdown);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    setShowAuthDropdown(false); // Close the dropdown
    navigate("/")
  };

  const handleAuth = () => {
    setShowAuthDropdown(false)
  };

  // Add Product
  const handleAddProduct = async () => {
    try {
      const response = await axios.post("/products/", {
        title,
        price: Number(price),
        description,
        categoryId: Number(categoryId),
        images,
      });
      console.log("Product added:", response.data);
      setError(""); // Clear error on success
      setShowAddForm(false); // Hide the form
    } catch (error) {
      console.error("Failed to add product:", error);
      setError("Failed to add product.");
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between h-16">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-600">
            All in one Task
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
            {/* Show "Form" and "eCommerce" only if the user is not logged in */}
            {!isLoggedIn && (
              <>
                <NavItem to="/form" icon={FileText}>
                  Form
                </NavItem>
                <NavItem to="/" icon={Projector}>
                  eCommerce
                </NavItem>
              </>
            )}

            {/* Show other navigation items if the user is logged in */}
            {isLoggedIn && (
              <>
                <NavItem to="/tasks" icon={ClipboardList}>
                  Tasks
                </NavItem>
                <NavItem to="/chat" icon={MessageCircle}>
                  Chat
                </NavItem>
                <NavItem to="/form" icon={FileText}>
                  Form
                </NavItem>
                <NavItem to="/" icon={Projector}>
                  eCommerce
                </NavItem>
              </>
            )}

          {/* Auth Dropdown */}
          <div className="relative">
            <button
              onClick={toggleAuthDropdown}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-all duration-200"
            >
              <LogInIcon className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {showAuthDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {user ? (
                  // If user is logged in, show Logout option
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 text-left"
                  >
                    Logout
                  </button>
                ) : (
                  // If user is not logged in, show Login and Sign Up options
                  <>
                    <NavLink
                    onClick={handleAuth}
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                    >
                      Login
                    </NavLink>
                    <NavLink
                    onClick={handleAuth}
                      to="/signup"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>


             {/* Admin Add Button */}
             {isAdmin && (
              <CustomButton
                className="bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                onClick={() => setShowAddForm(true)}
              >
                <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Add Product
              </CustomButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"} pb-4`}>
          <div className="flex flex-col space-y-2">
            <NavItem to="/" icon={MessageCircle}>
              Chat
            </NavItem>
            <NavItem to="/form" icon={FileText}>
              Form
            </NavItem>
            <NavItem to="/tasks" icon={ClipboardList}>
              Tasks
            </NavItem>

            {/* Admin Add Button */}
            {isAdmin && (
              <CustomButton
                className="bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                onClick={() => setShowAddForm(true)}
              >
                <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Add Product
              </CustomButton>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <CustomInput
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4"
            />
            <CustomInput
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mb-4"
            />
            <CustomInput
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4"
            />
            <CustomInput
              type="number"
              placeholder="Category ID"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full mb-4"
            />
            <CustomInput
              type="text"
              placeholder="Image URL"
              value={images[0] || ""}
              onChange={(e) => setImages([e.target.value])}
              className="w-full mb-4"
            />
            <div className="flex space-x-4">
              <CustomButton onClick={handleAddProduct}>Add Product</CustomButton>
              <CustomButton onClick={() => setShowAddForm(false)}>
                Cancel
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;