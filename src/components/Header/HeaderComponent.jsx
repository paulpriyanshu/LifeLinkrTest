import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../lib/utlis';

function HeaderComponent({ username, onLogout, children }) {

  // If `children` is passed, render a basic wrapper (e.g. for login page)
  if (children) {
    return (
      <header className="bg-white border-b border-slate-300 shadow px-4 py-3">
        <div className="max-w-7xl mx-auto text-slate-700 font-semibold">
          {children}
        </div>
      </header>
    );
  }

  // Default full-featured header
  return (
    <header className="relative bg-white border-b-2 border-slate-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Navigation Tabs */}
        <nav className="flex space-x-6">
          <Link to="/" className="text-slate-700 font-semibold hover:text-blue-600">
            Home
          </Link>
          <Link to="/employees" className="text-slate-700 font-semibold hover:text-blue-600">
            Employee List
          </Link>
        </nav>

        {/* Right: User Info & Logout */}
        <div className="flex items-center space-x-4">
          <span className="text-slate-600 font-medium">
            Logged in as: <span className="text-blue-600">{username}</span>
          </span>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;