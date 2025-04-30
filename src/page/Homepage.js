import React, { useState, useEffect  } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/main.css";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import {BsBookmarkPlusFill  , BsBookmarkHeartFill } from "react-icons/bs";
import axios from "axios";
import Navbar from "../compment/navbar"; 
import Footer from "../compment/footer"; 
import HaLong from "../assets/img/halong.jpg";
import PhuQuoc from "../assets/img/phuquoc.jpg";
import DaNang from "../assets/img/danang.jpg";
import CmImg from "../assets/img/camau.jpg";
import CnImg from "../assets/img/chonoiCT.jpg";
import DbImg from "../assets/img/dienbien.jpg";
import HgImg from "../assets/img/hagiang.jpg";
import HpImg from "../assets/img/haiphog.jpg";
import CbImg from "../assets/img/caobang.jpg";

const destinations = [
    { img: HaLong, title: "Vịnh Hạ Long", price: 150, rating: 4.8 },
    { img: PhuQuoc, title: "Phú Quốc", price: 200, rating: 4.7 },
    { img: DaNang, title: "Đà Nẵng", price: 180, rating: 4.6 },
    { img: CmImg, title: "Cà Mau", price: 160, rating: 4.5 },
];
const blogs = [
    {
        imgSrc: HaLong,
        title: "Kinh nghiệm du lịch Đà Nẵng",
        date: "15 Feb 2025",
        description: "Hướng dẫn chi tiết về chuyến đi khám phá kỳ quan thiên nhiên thế giới.",
    },
    {
        imgSrc: PhuQuoc,
        title: "Top địa điểm không thể bỏ lỡ ở Phú Quốc",
        date: "10 Feb 2025",
        description: "Các địa danh nổi bật ở Phú Quốc mà bạn nhất định phải ghé thăm.",
    },
];

const services = [
    { icon: "bi bi-truck", title: "Hỗ trợ di chuyển", description: "Dịch vụ đưa đón tận nơi." },
    { icon: "bi bi-shield-check", title: "Bảo hiểm du lịch", description: "An toàn trong suốt chuyến đi." },
    { icon: "bi bi-star", title: "Khách sạn cao cấp", description: "Hệ thống khách sạn chất lượng." },
];



const App = () => {
    const [likes, setLikes] = useState({});
const [bookmarks, setBookmarks] = useState({});
const [comments, setComments] = useState({});
const [commentsList, setCommentsList] = useState({});
const [posts, setPosts] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = 4;
const totalPages = Math.ceil(posts.length / postsPerPage);
const [activeMenuIndex, setActiveMenuIndex] = useState(null);
const [mainImages, setMainImages] = useState([]);
const token = localStorage.getItem("token");

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://ktpm03.onrender.com/api/getAllDestinations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const transformed = response.data.destinations.map((item) => ({
        username: "Ẩn danh",
        avatar: "/default-avatar.png",
        location: `${item.latitude}, ${item.longitude}`,
        latitude: item.latitude,
        longitude: item.longitude,
        title: item.name,
        content: item.description,
        images: item.image_path ? [item.image_path] : [],
        mood: null,
        date: new Date(item.created_at).toLocaleDateString(),
      }));
      
      setPosts(transformed);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    }
  };

  fetchPosts();
}, [token]); 

useEffect(() => {
  if (posts.length > 0) {
    setMainImages(posts.map(post => post.images?.[0] || "")); // fallback nếu images không có
  }
}, [posts]);

  const handleImageClick = (postIndex, image) => {
    const updatedMainImages = [...mainImages];
    updatedMainImages[postIndex] = image;
    setMainImages(updatedMainImages); // Cập nhật ảnh chính cho bài viết
  };

const goToNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};

const goToPrevPage = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};


  // Fetch data từ các API bằng axios
  useEffect(() => {
    // Fetch Comments
    const fetchComments = async () => {
      try {
        const response = await axios.get("https://ktpm03.onrender.com/api/comments");
        setComments(response.data);  // Dữ liệu trả về sẽ có trong `response.data`
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    // Fetch Likes
    const fetchLikes = async () => {
      try {
        const response = await axios.get("https://ktpm03.onrender.com/api/likes");
        setLikes(response.data);  // Lưu vào state
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    // Fetch Bookmarks
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get("https://ktpm03.onrender.com/api/bookmarks");
        setBookmarks(response.data);  // Lưu vào state
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    // Gọi tất cả các API
    fetchComments();
    fetchLikes();
    fetchBookmarks();
  }, []);
// Xử lý Like
const handleLike = async (index) => {
  try {
    const isCurrentlyLiked = likes[index]?.liked || false;
    const currentCount = likes[index]?.count || 0;

    // Tính trạng thái mới
    const newLiked = !isCurrentlyLiked;
    const newCount = newLiked ? currentCount + 1 : currentCount - 1;

    // Cập nhật frontend ngay lập tức
    setLikes({
      ...likes,
      [index]: { liked: newLiked, count: newCount }
    });

    // Gửi yêu cầu cập nhật lên backend
    await axios.put(`https://ktpm03.onrender.com/api/likes/${index}`, {
      liked: newLiked
    });
  } catch (error) {
    console.error("Error updating like:", error);
  }
};

// Xử lý Bookmark
const handleBookmark = (index) => {
    setBookmarks((prev) => ({ ...prev, [index]: !prev[index] }));
};
useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
}, [likes]);

useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}, [bookmarks]);

// Xử lý nhập bình luận
const handleCommentChange = (e, index) => {
    setComments((prev) => ({ ...prev, [index]: e.target.value }));
};

// Xử lý gửi bình luận
const handleCommentSubmit = (index) => {
  if (!comments[index]) return;

  // Lấy thông tin người dùng từ localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    username: "Ẩn danh",
    avatar: "/default-avatar.png"
  };

  const newComment = {
    avatar: currentUser.avatar,
    username: currentUser.username,
    text: comments[index]
  };

  // Kiểm tra nếu commentsList[index] chưa có, khởi tạo là mảng rỗng
  const updatedCommentsList = [...(commentsList[index] || []), newComment];

  // Cập nhật commentsList
  const newCommentsList = [...commentsList];
  newCommentsList[index] = updatedCommentsList;

  setCommentsList(newCommentsList);
  setComments((prev) => ({ ...prev, [index]: "" }));
};


    const images = [CmImg, CbImg, CnImg, DbImg, HgImg, HpImg];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
      
      const handleCopyContent = (content) => {
        navigator.clipboard.writeText(content);
        alert("Đã sao chép nội dung bài viết!");
      };
  
    return (
        <div>
            <Navbar />
            
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div className="slider-item" key={index}>
                    <img src={img} alt="slider" />
                    </div>
                ))}
                </Slider>

                <section className="destination-container">
                <h2>Điểm Đến Hấp Dẫn</h2>
<div className="destination-grid">
  {destinations
    .map((place, index) => ({ ...place, index, likeCount: likes[index] || 0 })) // gắn thêm index và số like
    .sort((a, b) => {
      if (b.likeCount !== a.likeCount) {
        return b.likeCount - a.likeCount; // nhiều like hơn lên trước
      }
      return a.index - b.index; // nếu like bằng nhau thì index nhỏ hơn lên trước
    })
    .slice(0, 4) // lấy 4 bài đầu tiên thay vì 3
    .map((place) => (
      <div className="destination-card" key={place.index}>
        <img src={place.img} alt={place.title} />
        <div className="card-content">
          <p>⭐ {place.rating}</p>

          {/* Button group */}
          <div className="button-group">
          <button className="btn-like" onClick={() => handleLike(place.index)}>
            {likes[place.index]?.liked ? <FcLike /> : <FcLikePlaceholder />}
            <span className="like-count">{likes[place.index]?.count || 0}</span>
          </button>



            <button className="btn-bookmark" onClick={() => handleBookmark(place.index)}>
              {bookmarks[place.index] ? <BsBookmarkPlusFill /> : <BsBookmarkHeartFill />}
            </button>
          </div>

          {/* Bình luận */}
          <div className="comments-section">
            <div className="comment-input-container">
              <input
                type="text"
                placeholder="Nhập bình luận..."
                value={comments[place.index] || ""}
                onChange={(e) => handleCommentChange(e, place.index)}
              />
              <button className="btn-comment" onClick={() => handleCommentSubmit(place.index)}>
                💬
              </button>
            </div>
          </div>

          {/* Hiển thị danh sách bình luận */}
          <ul>
            {commentsList[place.index]?.map((comment, idx) => (
              <li key={idx}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
</div>


        </section>
        <h2>📰 Bài Viết Mới</h2>

<div className="post-containerr">
  {(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    if (currentPosts.length === 0) {
      return (
        <p>
          Chưa có bài viết nào.{" "}
          <a href="/post" style={{ color: "blue", textDecoration: "underline" }}>
            Viết bài ngay
          </a>
        </p>
      );
    }

    return (
      <>
        {currentPosts.map((post, index) => {
          const actualIndex = indexOfFirstPost + index;

              return (
                <div key={actualIndex} className="post-card">
                  {/* Header chứa avatar, tên người đăng và vị trí */}
                  <div className="post-header">
                    <div className="user-info">
                      <img
                        src={post.avatar || "/default-avatar.png"}
                        alt="Avatar"
                        className="avatar"
                      />
                      <div>
                        <p className="username">{post.username || "Ẩn danh"}</p>
                        {post.location && (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="location-link"
                          >
                            📍 {post.location}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Nút ba chấm góc phải */}
                    <div className="post-options">
                      <button
                        className="options-button"
                        onClick={() => setActiveMenuIndex(activeMenuIndex === actualIndex ? null : actualIndex)}
                      >
                        ⋮
                      </button>
                      {activeMenuIndex === actualIndex && (
                        <div className="options-menu">
                          <button
                            onClick={() => {
                              const updatedPosts = [...posts];
                              updatedPosts.splice(actualIndex, 1);
                              setPosts(updatedPosts);
                              localStorage.setItem("posts", JSON.stringify(updatedPosts));
                            }}
                          >
                            🗑 Xóa
                          </button>
                          <button onClick={() => handleCopyContent(post.content)}>
                            📋 Sao chép
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nội dung bài viết */}
                  <p>{post.content}</p>

                  {/* Ảnh bài viết */}
                  {post.images.length > 0 && (
                    <div className="post-images">
                      {/* Ảnh chính */}
                      <img
                        src={mainImages[actualIndex]}
                        alt="Bài viết chính"
                        className="post-image-main"
                      />

                      {/* Các ảnh nhỏ dưới ảnh chính */}
                      <div className="post-image-thumbnails">
                        {post.images.slice(1).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Bài viết phụ ${i + 1}`}
                            className="post-image-thumbnail"
                            onClick={() => handleImageClick(actualIndex, img)} // Cập nhật ảnh chính khi click
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {post.mood && <p>😊 {post.mood}</p>}
                  <p>{post.date}</p>

                  <div className="button-group">
                    <button className="btn-like" onClick={() => handleLike(actualIndex)}>
                      {likes[actualIndex]?.liked ? <FcLike /> : <FcLikePlaceholder />}
                      <span className="like-count">{likes[actualIndex]?.count || 0}</span>
                    </button>

                    <button className="btn-bookmark" onClick={() => handleBookmark(actualIndex)}>
                      {bookmarks[actualIndex] ? <BsBookmarkPlusFill /> : <BsBookmarkHeartFill />}
                    </button>
                  </div>

                  <div className="comments-section">
                    <div className="comment-input-container">
                      <input
                        type="text"
                        placeholder="Nhập bình luận..."
                        value={commentsList[actualIndex] || ""}
                        onChange={(e) => handleCommentChange(e, actualIndex)}
                      />
                      <button className="btn-comment" onClick={() => handleCommentSubmit(actualIndex)}>
                        💬
                      </button>
                    </div>
                  </div>

                  <ul className="comment-list">
                    {commentsList[actualIndex]?.map((comment, idx) => (
                      <li key={idx} className="comment-item">
                        <img
                          src={comment.avatar || "/default-avatar.png"}
                          alt="Avatar"
                          className="comment-avatar"
                        />
                        <div className="comment-content">
                          <span className="comment-username">{comment.username || "Ẩn danh"}</span>
                          <span className="comment-text">{comment.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </>
        );
      })()}
    </div>

    {/* Phân trang */}
    <div className="pagination-arrows">
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        ←
      </button>
      <span>
        Trang {currentPage} / {totalPages}
      </span>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        →
      </button>
    </div>

            <section className="blog-container">
    <h2>Cẩm Nang Du Lịch</h2>
    <div className="blog-grid">
        {blogs.map((blog, index) => (
            <div className="blog-card" key={index}>
                <img src={blog.imgSrc} alt={blog.title} />
                <div className="blog-content">
                    <h3>{blog.title}</h3>
                    <p className="blog-date">{blog.date}</p>
                    <p>{blog.description}</p>
                    <button>Xem chi tiết</button>
                </div>
            </div>
        ))}
    </div>
</section>

<section className="services-container">
    <h2>Dịch Vụ Chúng Tôi</h2>
    <div className="services-grid">
        {services.map((service, index) => (
            <div className="service-card" key={index}>
                <i className={service.icon}></i>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
            </div>
        ))}
    </div>
</section>
<Footer />
              
            </div>
        );
    };

    export default App;