import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft } from "lucide-react";
import "../assets/css/vhl.css";

const Card = ({ images, title, description }) => (
  <div className="vhl-card">
    <div className="vhl-slider">
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${title}-${idx}`}
            className="vhl-slider-img"
          />
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

const VHL = () => {
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
      <div className="vhl-logo">Du Lịch Hạ Long</div>
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
                backgroundImage: "url('https://golden-lotus-hotel.s3.ap-southeast-1.amazonaws.com/uploads/2021/04/013d407166ec4fa56eb1e1f8cbe183b9/images1089892_1.jpg')",
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
                <h1>Khám phá Vịnh Hạ Long</h1>
                <p>
                Nơi kỳ quan thiên nhiên hội tụ – nổi bật với đảo đá vôi và làn nước trong xanh.
                </p>
            </div>
            </section>
        <section id="gioi-thieu" className="vhl-section">
          <h2>Giới thiệu chung</h2>
          <p>
            Vịnh Hạ Long, viên ngọc quý của miền Bắc Việt Nam, là một kỳ quan
            thiên nhiên được UNESCO hai lần công nhận là Di sản Thế giới.
            Với gần 2.000 hòn đảo đá vôi lớn nhỏ mọc lên giữa làn nước xanh ngọc,
            nơi đây tạo nên một khung cảnh ngoạn mục như tranh thủy mặc. Không
            chỉ có vẻ đẹp thiên nhiên kỳ vĩ, Hạ Long còn gắn liền với truyền
            thuyết rồng mẹ giáng trần bảo vệ đất nước, mang đậm màu sắc huyền
            thoại và văn hóa dân gian Việt Nam.
          </p>
        </section>

        <section id="thang-canh" className="vhl-section">
          <h2>Danh lam thắng cảnh</h2>
          <div className="vhl-grid">
            <Card
              images={[
                "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2LLTG24Qh1Z7D1kc-bXO9jBnpcjc6GapM62HEctCdoizHvXK_jJ3flOnqoiXIH4rublMITm3ydaMZtVxvhYz3vtS4znEX9cVWVykinzM1pnOw5p2aeHhysWdoeXN6GDNYK1Ubi2RDQUw/s1600/Hon-Ga-choi.jpg",
                "https://halongghepdoangiare.com/data/data/anhhai/files/hon-trong-mai-ha-long-1.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS98IHEsmpfhPWzG7i22LpRpt1te5CdIv-p1w&s",
              ]}
              title="Hòn Gà Chọi"
              description="Hai khối đá cao sừng sững giữa biển, tựa như cặp gà đang chọi nhau,
                là biểu tượng nổi tiếng nhất của Vịnh Hạ Long. Vẻ đẹp độc đáo này trở thành
                hình ảnh quen thuộc trong các chiến dịch du lịch Việt Nam."
            />
            <Card
              images={[
                "https://www.dulichhalong.net/wp-content/uploads/2013/02/Hang-Thien-Cung.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvBvh3dv38uLLuEtziHy2e0Uir2oE5_g4eIw&s",
                "https://www.tauhalong.vn/wp-content/uploads/2020/11/Dong-thien-cung-1.jpg",
              ]}
              title="Động Thiên Cung"
              description="Là một trong những hang động kỳ ảo nhất của Hạ Long,
                Động Thiên Cung khiến du khách choáng ngợp bởi hệ thống nhũ đá lấp lánh,
                hình thù phong phú. Hệ thống ánh sáng được bố trí tinh tế càng làm nổi bật
                vẻ đẹp kỳ ảo bên trong hang."
            />
            <Card
              images={[
                "https://duan-sungroup.com/wp-content/uploads/2022/10/tam-bien-o-bai-chay-e1665249447774.jpg",
                "https://ik.imagekit.io/tvlk/blog/2022/10/kinh-nghiem-du-lich-bai-chay-1.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2",
                "https://bizweb.dktcdn.net/100/006/093/articles/bien-bai-chay.jpg?v=1712913157123",
              ]}
              title="Bãi Cháy"
              description="Là bãi biển nhân tạo sôi động nhất tại Hạ Long, Bãi Cháy thu hút
                hàng nghìn lượt khách mỗi năm với bãi cát trắng mịn, nước biển trong xanh
                và hệ thống dịch vụ giải trí hiện đại – từ chợ đêm, công viên đến các khu
                nghỉ dưỡng cao cấp."
            />
          </div>
        </section>

        <section id="am-thuc" className="vhl-section">
          <h2>Ẩm thực đặc sắc</h2>
          <div className="vhl-grid">
            <Card
              images={[
                "https://chamuchalong.com/wp-content/uploads/2024/10/cha-muc-thuong-hang.jpg",
                "https://file.hstatic.net/1000030244/file/img_1579__9___1__6f26662d74d446e6b11de1e530d8b385_grande.png",
                "https://danviet.mediacdn.vn/zoom/700_438/296231569849192448/2022/5/15/mon-an-ngon-noi-tieng-o-ha-long-16525843503841439687194-26-0-432-650-crop-16525849744871869457779.jpg",
              ]}
              title="Chả mực Hạ Long"
              description="Là “đặc sản quốc dân” của vùng biển này, chả mực được giã tay
                từ mực tươi, chiên vàng ươm, giòn dai, thơm phức. Món ăn này thường
                ăn kèm xôi trắng hoặc bánh cuốn, là trải nghiệm ẩm thực không thể bỏ qua."
            />
            <Card
              images={[
                "https://cdnphoto.dantri.com.vn/KiBvRad7brfKXNKnFiepVaw3huU=/zoom/1200_630/2023/07/27/z45336028548565300c7c89e1a719f833635feb2446b66-crop-1690470687561.jpeg",
                "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/11/28/sam-bien-ha-long-1-0933.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjT2KGIszOuWMvEZO7n2dTtT9RAtr6ox7VHA&s",
              ]}
              title="Sam biển"
              description="Sam biển Hạ Long không chỉ quý hiếm mà còn được chế biến thành nhiều
                món ngon như sam xào chua ngọt, trứng sam nướng, hay gỏi sam độc đáo. Vị
                ngọt đậm đà, lạ miệng của loài hải sản này để lại ấn tượng khó quên."
            />
            <Card
              images={[
                "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/11/22/banh-gat-gu-ha-long-4-1411.jpg",
                "https://cdn.tgdd.vn/Files/2023/06/09/1533616/cach-lam-banh-gat-gu-dac-san-quang-ninh-hap-dan-nhieu-du-khach-202306091319174012.jpg",
                "https://media.2dep.vn/upload/hatran/2022/03/09/banh-gat-gu-mon-banh-dan-da-khien-thuc-khach-thich-thu-khi-den-tien-yen-quang-ninh-1-1646799447.jpg",
              ]}
              title="Bánh gật gù"
              description="Là món bánh truyền thống Quảng Ninh, bánh gật gù có vẻ ngoài
                như bánh cuốn nhưng dày và dai hơn, được ăn cùng nước mắm chưng thịt béo ngậy.
                Cái tên 'gật gù' bắt nguồn từ cách ăn bánh – người ăn thường phải gật đầu
                vì độ dài và mềm dẻo của bánh."
            />
          </div>
        </section>

        <section id="kinh-nghiem" className="vhl-section">
          <h2>Kinh nghiệm du lịch</h2>
          <div className="vhl-experience">
            <h3>Thời điểm lý tưởng</h3>
            <p>
              Tháng 3–5 và 9–11 là thời gian lý tưởng để đến Hạ Long: trời mát mẻ,
              ít mưa, biển lặng và nắng đẹp – rất thuận tiện cho các hoạt động tham
              quan đảo, tắm biển hay du thuyền.
            </p>

            <h3>Phương tiện di chuyển</h3>
            <p>
              Từ Hà Nội, bạn có thể bắt xe khách, limousine hoặc thuê xe riêng đến
              Hạ Long trong khoảng 3 giờ. Tại thành phố, du khách có thể dễ dàng di
              chuyển bằng taxi, xe điện hoặc thuê xe máy để khám phá tự do.
            </p>

            <h3>Chi phí tham khảo</h3>
            <ul>
              <li>Vé tham quan vịnh: từ 250.000đ/người</li>
              <li>Tour du thuyền trong ngày: 700.000 – 1.200.000đ</li>
              <li>Khách sạn: 400.000 – 1.000.000đ/đêm (tùy loại phòng)</li>
              <li>Ăn uống: trung bình 100.000 – 300.000đ/ngày</li>
            </ul>
          </div>
        </section>

        <section className="vhl-section vhl-review-section">
          <h2>Đánh giá du khách</h2>
          <div className="vhl-reviews">
            <div className="vhl-review">
              <p>
                "Một trải nghiệm tuyệt vời! Du thuyền ban đêm giữa lòng vịnh thật
                sự lãng mạn, dịch vụ chu đáo và cảnh quan thì không thể chê vào đâu
                được."
              </p>
              <span>– Hương, TP.HCM</span>
            </div>
            <div className="vhl-review">
              <p>
                "Ẩm thực ở đây phong phú và tươi ngon, người dân rất thân thiện. Tôi
                đã ăn chả mực ở nhiều nơi nhưng không nơi nào ngon bằng Hạ Long."
              </p>
              <span>– Long, Hà Nội</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VHL;
