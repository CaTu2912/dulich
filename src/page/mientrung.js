import React, { useState } from "react";
import Navbar from "../compment/navbar"; 
import Footer from "../compment/footer"; 

import "../assets/css/mienbac.css";

const destinations = [
    {
      name: "Biển Mỹ Khê",
      image: "https://ik.imagekit.io/tvlk/blog/2022/11/bien-my-khe-5-1024x768.jpg?tr=dpr-2,w-675",
      description:
        "Biển Mỹ Khê là một trong những bãi biển đẹp nhất Việt Nam, nổi bật với bãi cát trắng mịn và làn nước trong xanh.",
      location: "https://maps.google.com/?q=Biển+Mỹ+Khê",
    },
    {
      name: "Bà Nà Hills",
      image: "https://motogo.vn/wp-content/uploads/2019/11/11-toan-canh-ba-na-1554385320042306734627.jpg",
      description:
        "Bà Nà Hills được mệnh danh là \"Đường lên tiên cảnh\", với khí hậu mát mẻ quanh năm và công trình nổi bật như Cầu Vàng.",
      location: "https://maps.google.com/?q=Bà+Nà+Hills",
    },
    {
      name: "Cầu Rồng",
      image: "https://tourbana.vn/uploads/images/images/thoi-gian-cau-rong-phun-lua-da-nang.jpg",
      description:
        "Cầu Rồng là biểu tượng của Đà Nẵng, đặc biệt vào cuối tuần khi cầu phun lửa và nước vô cùng ấn tượng.",
      location: "https://maps.google.com/?q=Cầu+Rồng",
    },
    {
      name: "Ngũ Hành Sơn",
      image: "https://danatravel.vn/data/images/nui-ngu-hanh-son-da-nang-1.jpg",
      description:
        "Ngũ Hành Sơn là danh thắng nổi tiếng với các hang động, chùa chiền và tầm nhìn tuyệt đẹp từ đỉnh núi.",
      location: "https://maps.google.com/?q=Ngũ+Hành+Sơn",
    },
    {
      name: "Phố cổ Hội An",
      image: "https://dulichkhampha24.com/wp-content/uploads/2021/03/gioi-thieu-ve-pho-co-hoi-an-20.jpg",
      description:
        "Phố cổ Hội An mang vẻ đẹp cổ kính với những ngôi nhà mái ngói, đèn lồng rực rỡ và nền văn hóa phong phú.",
      location: "https://maps.google.com/?q=Phố+cổ+Hội+An",
    },
    {
      name: "Cù Lao Chàm",
      image: "https://luxtour.com.vn/wp-content/uploads/2022/03/lan-ngam-san-ho-1.jpg",
      description:
        "Cù Lao Chàm là hòn đảo xinh đẹp với hệ sinh thái phong phú, thích hợp cho lặn biển ngắm san hô và du lịch sinh thái.",
      location: "https://maps.google.com/?q=Cù+Lao+Chàm",
    },
    {
      name: "Đại Nội Huế",
      image: "https://disantrangan.vn/wp-content/uploads/2021/11/dai_noi_hue_02.jpg",
      description:
        "Đại Nội Huế là quần thể kiến trúc cổ kính của triều đại nhà Nguyễn, mang đậm dấu ấn lịch sử và văn hóa Việt Nam.",
      location: "https://maps.google.com/?q=Đại+Nội+Huế",
    },
    {
      name: "Động Phong Nha",
      image: "https://thuexeotongocminh.com/wp-content/uploads/2018/05/dong-phong-nha-ke-bang.jpg",
      description:
        "Động Phong Nha thuộc Vườn Quốc gia Phong Nha - Kẻ Bàng, nổi bật với hệ thống hang động hùng vĩ và sông ngầm dài nhất thế giới.",
      location: "https://maps.google.com/?q=Động+Phong+Nha",
    },
    {
      name: "VinWonders Nha Trang",
      image: "https://statics.vinwonders.com/vinwonders-nha-trang_1665580300.jpg",
      description:
        "VinWonders Nha Trang là công viên giải trí hàng đầu Việt Nam với nhiều trò chơi mạo hiểm, thủy cung và khu vui chơi trên biển.",
      location: "https://maps.google.com/?q=VinWonders+Nha+Trang",
    },
    {
      name: "Eo Gió Quy Nhơn",
      image: "https://quynhontrip.com/wp-content/uploads/2020/10/eo-gio-1024x768.jpg",
      description:
        "Eo Gió là điểm đến hoang sơ với cảnh quan thiên nhiên tuyệt đẹp, thích hợp cho những ai yêu thích khám phá và chụp ảnh.",
      location: "https://maps.google.com/?q=Eo+Gió+Quy+Nhơn",
    },
    {
        name: "Gành Đá Đĩa",
        image: "https://vansudia.net/wp-content/uploads/2020/10/Untitled-1-min-1-1.jpg",
        description:
          "Gành Đá Đĩa là kỳ quan thiên nhiên độc đáo với các cột đá bazan xếp chồng lên nhau tạo nên cảnh tượng kỳ vĩ.",
        location: "https://maps.google.com/?q=Gành+Đá+Đĩa",
      },
      {
        name: "Đỉnh Lang Biang",
        image: "https://tuongtaccongdong.s3.amazonaws.com/603f6624-ec24-4d49-8142-3ca06510b71f/f15754d0-451c-4956-91f7-76ac89ef4798.jpg",
        description:
          "Đỉnh Lang Biang là điểm du lịch hấp dẫn với phong cảnh hùng vĩ và các hoạt động leo núi, ngắm cảnh tuyệt đẹp.",
        location: "https://maps.google.com/?q=Đỉnh+Lang+Biang",
      },
      {
        name: "Mũi Né",
        image: "https://www.vietnamonline.com/media/uploads/froala_editor/images/VNO-muine11.jpg",
        description:
          "Mũi Né nổi tiếng với đồi cát bay, Bàu Trắng và bãi biển đẹp, là thiên đường nghỉ dưỡng và thể thao biển.",
        location: "https://maps.google.com/?q=Mũi+Né",
      },
      {
        name: "Thánh địa Mỹ Sơn",
        image: "https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-canh-thanh-dia-My-Son-dep.jpg",
        description:
          "Thánh địa Mỹ Sơn là di sản văn hóa thế giới, là quần thể đền tháp Chăm Pa cổ kính giữa núi rừng Quảng Nam.",
        location: "https://maps.google.com/?q=Thánh+địa+Mỹ+Sơn",
      },
      {
        name: "Suối Voi",
        image: "https://www.vietnam.com/public/storage/vietnam.com/images/Central_Vietnam/Sights/Suoi_Voi/CV_SV_006.jpg",
        description:
          "Suối Voi là điểm du lịch thiên nhiên hoang sơ, với các hồ nước trong xanh giữa rừng núi.",
        location: "https://maps.google.com/?q=Suối+Voi",
      },
      {
        name: "Đầm Ô Loan",
        image: "https://media.gody.vn/images/phu-yen/dam-o-loan/2-2018/98645889-20180226034435-phu-yen-dam-o-loan.jpg",
        description:
          "Đầm Ô Loan nổi tiếng với vẻ đẹp yên bình và món sò huyết đặc sản ngon nhất Việt Nam.",
        location: "https://maps.google.com/?q=Đầm+Ô+Loan",
      },
      {
        name: "Làng Cù Lần",
        image: "https://dalatopentours.com/images/lang-cu-lan/Lang-cu-lan.jpg",
        description:
          "Làng Cù Lần là ngôi làng đẹp như tranh vẽ giữa rừng thông xanh biếc của Đà Lạt.",
        location: "https://maps.google.com/?q=Làng+Cù+Lần",
      },
      {
        name: "Thác Pongour",
        image: "https://static.vinwonders.com/production/thac-pongour-1.jpg",
        description:
          "Thác Pongour được mệnh danh là \"Nam thiên đệ nhất thác\", với dòng thác trải rộng giữa khung cảnh núi rừng hùng vĩ.",
        location: "https://maps.google.com/?q=Thác+Pongour",
      }
  ];
  const ITEMS_PER_PAGE = 6; // Số lượng địa điểm trên mỗi trang

  export default function Mientrung() {
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