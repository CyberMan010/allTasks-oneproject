import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, ClipboardList, FileText } from 'lucide-react';

const NavItem = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <NavLink 
      to={to} 
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-100 text-blue-600' 
          : 'hover:bg-gray-100 text-gray-700 hover:text-blue-600'
      }`}
    >
      <Icon className={`w-5 h-5 mr-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
      <span className="font-medium">{children}</span>
    </NavLink>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">All in one Task</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavItem to="/" icon={MessageCircle}>Chat</NavItem>
            <NavItem to="/form" icon={FileText}>Form</NavItem>
            <NavItem to="/tasks" icon={ClipboardList}>Tasks</NavItem>
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
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-2">
            <NavItem to="/" icon={MessageCircle}>Chat</NavItem>
            <NavItem to="/form" icon={FileText}>Form</NavItem>
            <NavItem to="/tasks" icon={ClipboardList}>Tasks</NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;