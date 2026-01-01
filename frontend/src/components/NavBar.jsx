import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserData.jsx";

function NavBar() {
  let {token} = useContext(UserContext);
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-6 py-4">
        {/* Logo Section */}
        <div id="LogoSection" className="text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-wide">
            <Link
              to="/"
              className="text-2xl font-extrabold text-white tracking-wide"
            >
              The<span className="text-yellow-300">Guidly</span>
            </Link>
          </h2>
          <p className="text-sm text-gray-200">Find your next adventure</p>
        </div>

        {/* Menu */}
        <ul className="flex justify-center md:justify-end gap-6 mt-4 md:mt-0">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/roadmap" className="hover:text-yellow-300 transition">
              RoadMap
            </Link>
          </li>
          <li>
            <Link to="/news" className="hover:text-yellow-300 transition">
              News
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="hover:text-yellow-300 transition">
              Jobs
            </Link>
          </li>
      {
        token.access_token == null ? (
          <li>
            <Link to="/auth" className="hover:text-yellow-300 transition">
              Auth
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/profile" className="hover:text-yellow-300 transition">
              Profile
            </Link>
          </li>
        ) 
      }
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
