import React, { useState } from "react";
import Navbar from "../compment/navbar"; 
import Footer from "../compment/footer"; 

import "../assets/css/mienbac.css";

const destinations = [
  {
    name: "Vũng Tàu",
    image: "https://booking.pystravel.vn/uploads/posts/avatar/1684752378.jpg",
    description:
      "Vũng Tàu nổi tiếng với những bãi biển tuyệt đẹp như Bãi Sau, Bãi Trước. Đây là điểm đến lý tưởng để nghỉ dưỡng, tắm biển và thưởng thức hải sản tươi sống.",
    location: "https://maps.google.com/?q=Vũng+Tàu",
  },
  {
    name: "Phú Quốc",
    image: "https://puputrip.vn/wp-content/uploads/2022/11/vinwonders-phu-quoc-vinpearl-land-phu-quoc-cong-vien-chu-de-lon-nhat-viet-nam-1610502702.jpg",
    description:
      "Phú Quốc là hòn đảo lớn nhất Việt Nam với biển xanh, cát trắng, nhiều khu nghỉ dưỡng cao cấp và các hoạt động lặn biển, câu cá, khám phá rừng nguyên sinh.",
    location: "https://maps.google.com/?q=Phú+Quốc",
  },
  {
    name: "Cần Thơ",
    image: "https://ktmt.vnmediacdn.com/images/2022/12/30/33-1672388461-cantho-2-381274342.jpg",
    description:
      "Cần Thơ là trung tâm của miền Tây sông nước với chợ nổi Cái Răng, bến Ninh Kiều và nhiều món đặc sản hấp dẫn như lẩu mắm, cá lóc nướng trui.",
    location: "https://maps.google.com/?q=Cần+Thơ",
  },
  {
    name: "Hồ Tràm",
    image: "https://khunghiduong.vn/wp-content/uploads/2021/10/Hotram-1.jpg",
    description:
      "Hồ Tràm là điểm đến lý tưởng cho kỳ nghỉ dưỡng với bãi biển hoang sơ, suối nước nóng Bình Châu và nhiều resort cao cấp.",
    location: "https://maps.google.com/?q=Hồ+Tràm",
  },
  {
    name: "Bến Tre",
    image: "https://phuotvivu.com/blog/wp-content/uploads/2021/06/b%E1%BA%BFn-tre.jpg",
    description:
      "Bến Tre - quê hương của dừa với những rặng dừa xanh mướt, kênh rạch chằng chịt và nhiều hoạt động du lịch sinh thái hấp dẫn.",
    location: "https://maps.google.com/?q=Bến+Tre",
  },
  {
    name: "Côn Đảo",
    image: "https://condao.com.vn/uploads/news/2020_10/con-dao.jpg",
    description:
      "Côn Đảo - thiên đường hoang sơ với biển xanh, san hô tuyệt đẹp, cùng nhiều di tích lịch sử như nhà tù Côn Đảo.",
    location: "https://maps.google.com/?q=Côn+Đảo",
  },
  {
    name: "Châu Đốc",
    image: "https://lamviennuicam.com/wp-content/uploads/2020/04/chau-doc-_1.jpg",
    description:
      "Châu Đốc nổi tiếng với miếu Bà Chúa Xứ, núi Sam và nhiều đặc sản miền Tây như mắm cá linh, bún cá.",
    location: "https://maps.google.com/?q=Châu+Đốc",
  },
  {
    name: "Sóc Trăng",
    image: "https://i.ytimg.com/vi/u3JwZnd81Pg/maxresdefault.jpg",
    description:
      "Sóc Trăng là vùng đất của các ngôi chùa Khmer nổi tiếng như chùa Dơi, chùa Chén Kiểu và lễ hội Oóc Om Bóc đặc sắc.",
    location: "https://maps.google.com/?q=Sóc+Trăng",
  },
  {
    name: "Cà Mau",
    image: "https://media.vietnam.vn/vietnam.vn/2023/06/ca-mau2-scaled.jpg",
    description:
      "Cà Mau - điểm cực Nam của Tổ quốc, nổi tiếng với rừng U Minh Hạ, Đất Mũi và đặc sản cua biển trứ danh.",
    location: "https://maps.google.com/?q=Cà+Mau",
  },
  {
    name: "Hà Tiên",
    image: "https://static.vinwonders.com/production/du-lich-ha-tien-anh-thumb-1.jpg",
    description:
      "Hà Tiên - điểm đến ven biển với nhiều danh lam thắng cảnh như Thạch Động, Mũi Nai và hải sản tươi ngon.",
    location: "https://maps.google.com/?q=Hà+Tiên",
  },
  {
    name: "Tây Ninh",
    image: "https://diadiemvietnam.vn/wp-content/uploads/2023/05/Nui-Ba-Den.jpg",
    description:
      "Tây Ninh nổi tiếng với núi Bà Đen, hồ Dầu Tiếng và Tòa Thánh Cao Đài độc đáo.",
    location: "https://maps.google.com/?q=Tây+Ninh",
  },
  {
    name: "Đồng Tháp",
    image: "https://afamilycdn.com/150157425591193600/2021/3/2/15287704930250977210829104592080064839782432o-16146608875411583201050.jpg",
    description:
      "Đồng Tháp - vùng đất sen hồng, nổi bật với vườn quốc gia Tràm Chim, khu di tích Xẻo Quýt và các cánh đồng sen bạt ngàn.",
    location: "https://maps.google.com/?q=Đồng+Tháp",
  },
];

  const ITEMS_PER_PAGE = 6; // Số lượng địa điểm trên mỗi trang

  export default function Mienbac() {
    const [currentPage, setCurrentPage] = useState(1);
  
    // Tính tổng số trang
    const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);
  
    // Lấy dữ liệu theo trang
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentDestinations = destinations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
    return (
        <div>
        <Navbar />
      <div className="destinations-container">
        <h1 className="title">Địa Điểm Đến - Miền Bắc</h1>
        <div className="destinations-grid">
          {currentDestinations.map((place, index) => (
            <div key={index} className="destination-card">
              <img src={place.image} alt={place.name} className="destination-image" />
              <div className="destination-content">
                <h2 className="destination-title">{place.name}</h2>
                <p className="destination-description">{place.description}</p>
                <a href={place.location} target="_blank" rel="noopener noreferrer" className="destination-link">
                  Xem trên Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
  
        {/* Phân trang */}
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            ←
          </button>
          
          <span className="pagination-text">
            Trang {currentPage} / {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
           →
          </button>
        </div>
      </div>
      <Footer />
      </div>
    );
  }