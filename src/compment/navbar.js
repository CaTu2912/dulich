import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaSearch, FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import "../assets/css/navbar.css";


const Navbar = () => {
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
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
          style={{ width: "32px", height: "32px" }}
        >
          <span className="navbar-toggler-icon" style={{ transform: "scale(0.8)" }}></span>
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

          {/* Search Box */}
          <div className="position-relative" style={{ width: "220px" }}>
            <input className="form-control rounded-pill px-4" type="search" placeholder="Tìm kiếm..." />
            <FaSearch className="text-secondary position-absolute" style={{ right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} />
          </div>

       {/* User Login / Profile */}
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                {/* Bấm vào icon thì chuyển sang trang hồ sơ */}
                <Link to="/canhan">
                  <CgProfile className="fs-4 text-primary" style={{ cursor: "pointer" }} />
                </Link>

                {/* Nút Đăng xuất luôn hiển thị */}
                <button className="logout-btn ms-3 d-flex align-items-center" onClick={handleLogout}>
                  <LuLogOut size={25} className="me-2" /> 
                </button> 
                 </div>
            ) : (
              <Link className="btn btn-outline-primary rounded-pill ms-3" to="/login">
                <FaUser  className="me-1" /> Đăng nhập
              </Link>
            )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
