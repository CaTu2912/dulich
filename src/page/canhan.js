import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaCamera } from "react-icons/fa";
import axios from "axios";
import Navbar from "../compment/navbar";
import "../assets/css/cn.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://ktpm03.onrender.com/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data.user;

        setProfile({
          avatar: `https://ktpm03.onrender.com/${user.profile_image}`,
          name: user.username || "",
          email: user.email || "",
          bio: user.bio || "",
          about: "",
          facebook: "",
          instagram: "",
          posts: [], // Thay thế nếu API trả về bài viết
          avatarFile: null,
        });
      } catch (err) {
        setError("Không thể tải dữ liệu người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result, avatarFile: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      if (profile.avatarFile) {
        formData.append("profile_image", profile.avatarFile);
      }
      formData.append("bio", profile.bio);

      await axios.post("https://ktpm03.onrender.com/api/users", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setIsEditing(false);
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật profile:", error);
      alert("Cập nhật thất bại.");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return null;

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h2 className="profile-title">Trang cá nhân</h2>

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
                  <a
                    href={profile.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-iconfb"
                  >
                    <FaFacebook color="#1877F2" />
                  </a>
                )}
                {profile.instagram && (
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-iconis"
                  >
                    <FaInstagram color="#E4405F" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="profile-content">
            <div className="profile-field">
              <label>Tên:</label>
              <p>{profile.name}</p> {/* Giữ cố định nếu không được phép chỉnh sửa */}
            </div>

            <div className="profile-field">
              <label>Email:</label>
              <p>{profile.email}</p> {/* Giữ cố định nếu không được phép chỉnh sửa */}
            </div>

            <div className="profile-field">
              <label>Giới thiệu:</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.bio}</p>
              )}
            </div>

            <button
              className="profile-button"
              onClick={() => {
                if (isEditing) {
                  handleSaveProfile();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Lưu" : "Chỉnh sửa"}
            </button>
          </div>
        </div>

        <div className="profile-posts">
          <h3>Bài viết đã đăng:</h3>
          <div className="posts-list">
            {profile.posts.map((post, index) => (
              <div key={index} className="post-card">
                <p>
                  <strong>{post.content}</strong>
                </p>
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
