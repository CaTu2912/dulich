import { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa"; // Import icons
import HaLong from "../assets/img/halong.jpg";
import Navbar from "../compment/navbar"; 
import { FaCamera } from "react-icons/fa"; // Import icon camera
import "../assets/css/cn.css";


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    avatar: HaLong,
    name: "Nguyen Van A",
    bio: "Lập trình viên yêu thích ReactJS",
    email: "example@gmail.com",
    about: "Tôi là một lập trình viên với niềm đam mê sáng tạo web và ứng dụng.",
    facebook: "",
    instagram: "",
    posts: [
      {
        content: "Hướng dẫn ReactJS cơ bản",
        visibility: "Công khai",
        images: ["https://via.placeholder.com/200"],
        mood: "😊",
        location: "Hà Nội, Việt Nam",
        date: "20/03/2025",
      },
      {
        content: "Cách tối ưu hiệu suất trong React",
        visibility: "Bạn bè",
        images: ["https://via.placeholder.com/200"],
        mood: "🚀",
        location: "TP. Hồ Chí Minh, Việt Nam",
        date: "18/03/2025",
      },
    ],
  });
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div>
        <Navbar />
    <div className="profile-container">
      <h2 className="profile-title">Trang cá nhân</h2>

      {/* Header chứa avatar (trái) & thông tin (phải) */}
      <div className="profile-header">
      <div className="profile-avatar">
        <div className="avatar-wrapper">
          <img src={profile.avatar} alt="Avatar" className="avatar-img" />

          {isEditing && (
            <label htmlFor="avatar-upload" className="change-avatar-btn">
              <FaCamera size={24} color="white" />
            </label>
          )}

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>

          {isEditing ? (
            <>
              <input
                type="text"
                name="facebook"
                value={profile.facebook}
                onChange={handleChange}
                placeholder="Nhập link Facebook"
              />
              <input
                type="text"
                name="instagram"
                value={profile.instagram}
                onChange={handleChange}
                placeholder="Nhập link Instagram"
              />
            </>
          ) : (
            <div className="profile-socials">
              {profile.facebook && (
                <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="social-iconfb">
                  <FaFacebook color="#1877F2" />
                </a>
              )}
              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="social-iconis">
                  <FaInstagram color="#E4405F" />
                </a>
              )}
            </div>
          )}
        </div>


        {/* Thông tin cá nhân bên phải */}
        <div className="profile-content">
          <div className="profile-field">
            <label>Tên:</label>
            {isEditing ? (
              <input type="text" name="name" value={profile.name} onChange={handleChange} />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Tiểu sử:</label>
            {isEditing ? (
              <textarea name="about" value={profile.about} onChange={handleChange} />
            ) : (
              <p>{profile.about}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Email:</label>
            {isEditing ? (
              <input type="email" name="email" value={profile.email} onChange={handleChange} />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Giới thiệu:</label>
            {isEditing ? (
              <textarea name="bio" value={profile.bio} onChange={handleChange} />
            ) : (
              <p>{profile.bio}</p>
            )}
          </div>

          <button className="profile-button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Lưu" : "Chỉnh sửa"}
          </button>
        </div>
      </div>

      {/* Bài viết nằm phía dưới */}
      <div className="profile-posts">
        <h3>Bài viết đã đăng:</h3>
        <div className="posts-list">
          {profile.posts.map((post, index) => (
            <div key={index} className="post-card">
              <p><strong>{post.content}</strong></p>
              <p>Trạng thái: {post.mood}</p>
              <p>Vị trí: {post.location}</p>
              <p>Quyền riêng tư: {post.visibility}</p>
              <p>Ngày đăng: {post.date}</p>
              <div className="post-images">
                {post.images.map((img, i) => (
                  <img key={i} src={img} alt="Post" className="post-image" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
