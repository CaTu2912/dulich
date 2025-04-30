import React from "react";
import "../assets/css/main.css";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Về Chúng Tôi</h3>
          <p>
            Du Lịch Việt Nam là nền tảng chia sẻ thông tin và kinh nghiệm du lịch hàng đầu Việt Nam, giúp người dùng khám phá vẻ đẹp đất nước.
          </p>
        </div>

        <div className="footer-section">
          <h3>Liên Hệ</h3>
          <ul className="contact-info">
            <li><FaMapMarkerAlt /> 123 Đường A, Quận XYZ, TP. Cần Thơ</li>
            <li><FaPhone /> +84 123 456 789</li>
            <li><FaEnvelope /> info@dulichvietnam.com</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Theo Dõi</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Đăng Ký Nhận Tin</h3>
          <div className="newsletter">
            <input type="email" placeholder="Email của bạn" />
            <button>Đăng Ký</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Du Lịch Việt Nam. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;
