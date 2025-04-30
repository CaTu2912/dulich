import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaSearch, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import "../assets/css/navbar.css";


const Navbar = ({ darkMode, toggleTheme }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'dark-theme' : ''}`}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            TravelGo
          </Link>

          <button
            className="navbar-toggler p-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">Trang chủ</Link>
              </li>

              {/* Dropdown Điểm đến */}
              <li className="nav-item dropdown position-relative"
                  onMouseEnter={() => setShowDestinations(true)}
                  onMouseLeave={() => setShowDestinations(false)}
              >
                <span className="nav-link text-dark dropdown-toggle" style={{ cursor: "pointer" }}>
                  Điểm đến
                </span>
                <ul className={`dropdown-menu ${showDestinations ? "d-block" : "d-none"}`}>
                  <li><Link className="dropdown-item" to="/mienbac">Miền Bắc</Link></li>
                  <li><Link className="dropdown-item" to="/mientrung">Miền Trung</Link></li>
                  <li><Link className="dropdown-item" to="/miennam">Miền Nam</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-dark" to="/post">Bài viết</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/contact">Liên hệ</Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              {/* Search Box */}
              <div className="position-relative me-3" style={{ width: "250px" }}>
                <input 
                  className="form-control rounded-pill border-secondary px-4" 
                  type="search" 
                  placeholder="Tìm kiếm..." 
                  style={{ backgroundColor: "#f8f9fa", height: "40px" }}
                />
                <FaSearch className="text-secondary position-absolute" style={{ right: "15px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} />
              </div>

              {/* User Login / Profile */}
              {isLoggedIn ? (
                <div className="d-flex align-items-center">
                  {/* Profile icon */}
                  <Link to="/canhan" className="me-2">
                    <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                        style={{ width: "40px", height: "40px", color: "white" }}>
                      <CgProfile className="fs-5" />
                    </div>
                  </Link>
                  
                  {/* Đăng xuất button */}
                  <Link to="/" className="ms-2">
                    <div className="rounded-circle bg-danger d-flex align-items-center justify-content-center" 
                        style={{ width: "40px", height: "40px", color: "white" }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}>
                      <LuLogOut className="fs-5" />
                    </div>
                  </Link>
                </div>
              ) : (
                <Link to="/login">
                  <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                      style={{ width: "40px", height: "40px", color: "white" }}>
                    <FaUser className="fs-6" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>  
      
      {/* Nút chuyển đổi chế độ sáng/tối ở bên dưới navbar */}
      {toggleTheme && (
        <div className="theme-toggle-container">
          <button 
            className="theme-toggle-button" 
            onClick={toggleTheme} 
            aria-label="Chuyển đổi chế độ sáng/tối"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
