import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/CreatePost.css";
import Navbar from "../compment/navbar"; 

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [images, setImages] = useState([]);
  const [mood, setMood] = useState("");  
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showMap && !mapRef.current) {
      mapRef.current = L.map("map").setView([21.0285, 105.8542], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current && !showMap) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [showMap]);

  const handleSearch = async () => {
    if (!location) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm địa điểm:", error);
    }
  };

  const handleSelectLocation = (lat, lon, displayName) => {
    setLocation(displayName);
    setSuggestions([]);

    if (mapRef.current) {
      mapRef.current.setView([lat, lon], 13);
      if (markerRef.current) markerRef.current.remove();

      markerRef.current = L.marker([lat, lon])
        .addTo(mapRef.current)
        .bindPopup(`<a href='https://www.google.com/maps?q=${lat},${lon}' target='_blank'>${displayName}</a>`)
        .openPopup();
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) {
        alert("Vui lòng nhập nội dung bài viết!");
        return;
    }

    const newPost = {
        content,
        visibility,
        images,
        location,
        mood,
        date: new Date().toLocaleString(),
    };
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    if (window.confirm("🎉 Bài viết đã được đăng thành công! Nhấn OK để quay về trang chủ.")) {
      navigate("/");
    }

    setContent("");
    setVisibility("public");
    setImages([]);
    setLocation("");
    setMood("");
  };

  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/50",
  });

  return (
    <div>
      <Navbar />  
      <div className="post-containerr">
        <div className="post-header">
          <img src={user.avatar} alt="Avatar" className="user-avatar" />
          <span className="user-name">{user.name}</span>
        </div>

        <h2>Tạo bài viết</h2>
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="public">Công khai</option>
          <option value="friends">Bạn bè</option>
          <option value="private">Chỉ mình tôi</option>
        </select>
        <textarea 
          placeholder="Bạn đang nghĩ gì?" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
    
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setImages([...images, ...Array.from(e.target.files).map(file => URL.createObjectURL(file))])}
        />

        <div className="image-preview">
          {images.map((src, index) => (
            <div key={index} className="image-container">
              <img src={src} alt={`Ảnh ${index + 1}`} className="preview-image" />
            </div>
          ))}

          <div className="image-container add-image-container" onClick={() => fileInputRef.current.click()}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828925.png"
              alt="Thêm ảnh"
              className="add-image"
            />
          </div>
        </div>

        <button className="toggle-map-btn" onClick={() => setShowMap(!showMap)}>Chọn địa điểm</button>
        {showMap && (
          <div>
            <input
              type="text"
              placeholder="Nhập địa điểm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          <button className="search-location-btn" onClick={handleSearch}>Tìm kiếm</button>
          {suggestions.length > 0 && (
              <ul>
                {suggestions.map((place, index) => (
                  <li key={index} onClick={() => handleSelectLocation(place.lat, place.lon, place.display_name)}>
                    {place.display_name}
                  </li>
                ))}
              </ul>
            )}
            <div id="map" className="map-container"></div>
          </div>
        )}
        <button className="btn-submit-post" onClick={handleSubmit}>Đăng</button> 
      </div>
    </div>
  );
};

export default CreatePost;
