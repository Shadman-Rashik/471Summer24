import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../assets/Bid-removebg-preview.png";

const Header = () => {
  const navigate = useNavigate();

  function checkUserLoggedIn() {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, false otherwise
  }

  const userLoggedIn = checkUserLoggedIn();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };
//
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center md:justify-between justify-center md:gap-0 gap-1 h-16">
          <div className="flex items-center"> 
            <div className="flex-shrink-0">  

              <img className="h-20 w-auto" src={Img} alt="Bids & Beyond" />
            </div>
            {/* Links */}
            <div className="flex flex-row gap-0">
              <Link
                to="/"
                className="text-white rounded-md px-1 py-2 text-sm font-medium"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/admin"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-1 py-2 text-sm font-medium"
              >
                Admin
              </Link>
              <Link
                to="/customer"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-1 py-2 text-sm font-medium"
              >
                Customer
              </Link>
            </div>
          </div>
          <div className="flex items-center flex-row ">
            {!userLoggedIn ? (
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Login
              </Link>
            ) : (
              <div className="flex flex-row gap-2">
                <Link
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Logout
                </Link>
                {/* <Link
                  to="/changepass"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Change Password
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
