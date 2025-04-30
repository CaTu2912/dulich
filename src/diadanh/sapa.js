import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft } from "lucide-react";
import "../assets/css/vhl.css";

const Card = ({ images, title, description }) => (
  <div className="vhl-card">
    <div className="vhl-slider">
      <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`${title}-${idx}`} className="vhl-slider-img" />
        ))}
      </Slider>
    </div>
    <div className="vhl-card-content">
      <h3 className="vhl-card-title">{title}</h3>
      <p className="vhl-card-description">{description}</p>
    </div>
  </div>
);

const sections = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "thang-canh", label: "Danh lam" },
  { id: "am-thuc", label: "Ẩm thực" },
  { id: "kinh-nghiem", label: "Kinh nghiệm" },
];

const Sapa = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.6 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="vhl-page">
      <header className="vhl-navbar">
        <div className="vhl-navbar-container">
        <div className="vhl-left-group">
      <button className="vhl-back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={28} style={{ marginRight: 6 }} />
      </button>
      <div className="vhl-logo">Du Lịch Sa Pa</div>
    </div>
          <nav className="vhl-menu">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`vhl-menu-item ${activeSection === id ? "active" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="vhl-content">
      <section
            className="vhl-banner"
            style={{
                backgroundImage: "url('https://fansipanlegend.sunworld.vn/wp-content/uploads/2024/03/1-cam-nang-du-lich-sapa.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                color: "white",
                textAlign: "center",
                padding: "100px 20px",
            }}
            >
            <div
                style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 0,
                }}
            ></div>
            <div style={{ position: "relative", zIndex: 1 }}>
                <h1>Khám phá Sa Pa</h1>
                <p>
                Vùng đất sương mù tuyệt đẹp giữa núi rừng Tây Bắc – nơi văn hóa bản địa và thiên nhiên hòa quyện.
                </p>
            </div>
            </section>
        <section id="gioi-thieu" className="vhl-section">
          <h2>Giới thiệu chung</h2>
          <p>
            Sa Pa, thị trấn thuộc tỉnh Lào Cai, là một trong những điểm du lịch nổi tiếng bậc nhất miền Bắc.
            Với khí hậu mát mẻ quanh năm, phong cảnh núi non hùng vĩ và nền văn hóa đặc sắc của các dân tộc thiểu số,
            Sa Pa luôn là điểm đến lý tưởng cho du khách trong và ngoài nước. Mỗi mùa ở Sa Pa đều mang vẻ đẹp riêng,
            từ ruộng bậc thang mùa lúa chín đến tuyết trắng mùa đông.
          </p>
        </section>

        <section id="thang-canh" className="vhl-section">
          <h2>Danh lam thắng cảnh</h2>
          <div className="vhl-grid">
            <Card
              images={[
                "https://ik.imagekit.io/tvlk/blog/2023/06/nui-fansipan-1.jpg",
                "https://ik.imagekit.io/tvlk/blog/2023/06/nui-fansipan-2.jpg",
              ]}
              title="Đỉnh Fansipan"
              description="Được mệnh danh là 'Nóc nhà Đông Dương', Fansipan cao 3.143m là điểm đến chinh phục của nhiều phượt thủ và du khách.
                Cáp treo hiện đại giúp hành trình khám phá đỉnh núi trở nên dễ dàng hơn bao giờ hết."
            />
            <Card
              images={[
                "https://ik.imagekit.io/tvlk/blog/2023/06/nui-ham-rong-1.jpg",
                "https://ik.imagekit.io/tvlk/blog/2023/06/nui-ham-rong-2.jpg",
              ]}
              title="Núi Hàm Rồng"
              description="Tọa lạc ngay gần trung tâm thị trấn, núi Hàm Rồng nổi bật với những khu vườn hoa rực rỡ và điểm ngắm toàn cảnh Sa Pa tuyệt đẹp.
                Lối đi uốn lượn và các mỏm đá tự nhiên khiến nơi đây mang vẻ đẹp vừa hùng vĩ vừa nên thơ."
            />
            <Card
              images={[
                "https://ik.imagekit.io/tvlk/blog/2023/06/ban-cat-cat-1.jpg",
                "https://ik.imagekit.io/tvlk/blog/2023/06/ban-cat-cat-2.jpg",
              ]}
              title="Bản Cát Cát"
              description="Một trong những bản làng lâu đời của người H'Mông, Cát Cát thu hút với những ngôi nhà cổ, nghề dệt thổ cẩm truyền thống
                và thác nước thơ mộng. Đây là điểm lý tưởng để tìm hiểu văn hóa bản địa."
            />
          </div>
        </section>

        <section id="am-thuc" className="vhl-section">
          <h2>Ẩm thực đặc sắc</h2>
          <div className="vhl-grid">
            <Card
              images={[
                "https://ik.imagekit.io/tvlk/blog/2023/06/thang-co-sapa-1.jpg",
                "https://ik.imagekit.io/tvlk/blog/2023/06/thang-co-sapa-2.jpg",
              ]}
              title="Thắng cố"
              description="Món ăn truyền thống của người Mông, nấu từ thịt và nội tạng ngựa, kết hợp nhiều loại gia vị đặc trưng.
                Thắng cố thường được ăn trong các phiên chợ vùng cao, là trải nghiệm ẩm thực độc đáo."
            />
            <Card
              images={[
                "https://ik.imagekit.io/tvlk/blog/2023/06/ca-hoi-sapa-1.jpg",
                "https://ik.imagekit.io/tvlk/blog/2023/06/ca-hoi-sapa-2.jpg",
              ]}
              title="Cá hồi Sa Pa"
              description="Nhờ khí hậu mát lạnh quanh năm, Sa Pa là nơi lý tưởng nuôi cá hồi chất lượng cao.
                Cá hồi được chế biến thành sashimi, lẩu hoặc áp chảo – thịt đỏ tươi, mềm và béo ngậy."
            />
            <Card
              images={[
                "https://ik.imagekit.io/tvlk/blog/2023/06/do-nuong-sapa-1.jpg",
                "https://ik.imagekit.io/tvlk/blog/2023/06/do-nuong-sapa-2.jpg",
              ]}
              title="Đồ nướng Sa Pa"
              description="Khi đêm xuống, Sa Pa rực rỡ với các hàng quán đồ nướng thơm lừng.
                Từ thịt xiên, trứng nướng, bánh chuối đến cơm lam – tất cả tạo nên một bữa tối ấm cúng giữa tiết trời se lạnh."
            />
          </div>
        </section>

        <section id="kinh-nghiem" className="vhl-section">
          <h2>Kinh nghiệm du lịch</h2>
          <div className="vhl-experience">
            <h3>Thời điểm lý tưởng</h3>
            <p>
              Từ tháng 9 đến 11 là mùa lúa chín đẹp như tranh vẽ, còn tháng 12 đến 2 là mùa đông có tuyết, rất đặc biệt.
              Mùa xuân (tháng 3–4) là mùa hoa đào và mận nở rộ.
            </p>

            <h3>Phương tiện di chuyển</h3>
            <p>
              Du khách có thể đi tàu hỏa hoặc xe khách từ Hà Nội đến Lào Cai, sau đó bắt xe trung chuyển hoặc taxi lên Sa Pa (khoảng 1 giờ).
              Cũng có nhiều tuyến limousine chạy thẳng từ Hà Nội đến Sa Pa.
            </p>

            <h3>Chi phí tham khảo</h3>
            <ul>
              <li>Vé cáp treo Fansipan: khoảng 700.000đ/người</li>
              <li>Khách sạn, homestay: 300.000 – 1.200.000đ/đêm</li>
              <li>Ăn uống: 150.000 – 400.000đ/ngày</li>
              <li>Tham quan bản làng: 30.000 – 70.000đ/vé</li>
            </ul>
          </div>
        </section>

        <section className="vhl-section vhl-review-section">
          <h2>Đánh giá du khách</h2>
          <div className="vhl-reviews">
            <div className="vhl-review">
              <p>
                "Cảnh đẹp mê hồn! Tôi thích nhất là cảm giác đứng trên đỉnh Fansipan giữa mây trời lộng gió."
              </p>
              <span>– Minh, Đà Nẵng</span>
            </div>
            <div className="vhl-review">
              <p>
                "Văn hóa và con người Sa Pa để lại ấn tượng sâu sắc. Ẩm thực thì tuyệt vời, đặc biệt là cá hồi tươi ngon!"
              </p>
              <span>– Lan, TP.HCM</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Sapa;
