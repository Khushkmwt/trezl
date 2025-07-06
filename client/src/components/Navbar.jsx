import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, UploadCloud } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const linkStyle = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 hover:text-blue-600 transition';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-3xl font-bold text-blue-600">
            Trezl
          </Link>
        </div>

        {/* Middle: Nav Links (desktop only) */}
        <div className="hidden md:flex space-x-8 text-lg">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkStyle}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right: Upload + Auth buttons */}
        <div className="hidden md:flex items-center space-x-5">
          <Link
            to="/upload"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-blue-50 text-blue-600 border-blue-600"
          >
            <UploadCloud size={18} />
            Upload
          </Link>
          <Link
            to="/login"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-6 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}

          <hr className="my-2" />

          <Link
            to="/upload"
            className=" flex items-center gap-2 text-blue-600 hover:underline"
            onClick={() => setIsOpen(false)}
          >
            <UploadCloud size={18} />
            Upload
          </Link>
          <Link
            to="/login"
            className="block text-gray-600 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
