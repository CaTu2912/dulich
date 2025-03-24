import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaSearch, FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const location = useLocation(); // Lấy đường dẫn trang hiện tại

  // ✅ Lấy trạng thái đăng nhập từ localStorage khi component mount
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location]); // Khi đường dẫn thay đổi, cập nhật trạng thái

  // ✅ Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Xóa trạng thái đăng nhập
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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">Trang chủ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/destinations">Điểm đến</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/blog">Blog</Link>
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
           <div
           className="position-relative ms-3 profile-containericon"
           onMouseEnter={() => setShowDropdown(true)}
           onMouseLeave={() => setShowDropdown(false)}
         >
           <CgProfile className="fs-4 text-primary" style={{ cursor: "pointer" }} />
           {showDropdown && (
             <div className="profile-dropdown">
               <Link className="dropdown-item" to="/canhan">Hồ sơ</Link>
               <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
             </div>
           )}
         </div>
          ) : (
            <Link className="btn btn-outline-primary rounded-pill ms-3" to="/login" onClick={() => localStorage.setItem("isLoggedIn", "true")}>
              <FaUser className="me-1" /> Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
