// Các import
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

import "../assets/css/CreatePost.css";
import Navbar from "../compment/navbar";
import Footer from "../compment/footer";

// Icon SVG điểm đi
const circleIcon = (color = "red") =>
  new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="6" fill="${color}" /></svg>`,
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

// Icon SVG điểm đến
const destinationIcon = (color = "blue") =>
  new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>`,
    className: "",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [images, setImages] = useState([]);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectingType, setSelectingType] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const mapRef = useRef(null);
  const departureMarker = useRef(null);
  const destinationMarker = useRef(null);
  const routingControl = useRef(null);
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://ktpm03.onrender.com/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Lỗi lấy thông tin người dùng:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !startDate || !endDate) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    if (!location.lat || !location.lng) {
      alert("Vui lòng chọn điểm đến trên bản đồ!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const tripRes = await fetch("https://ktpm03.onrender.com/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user?.id,
          title,
          start_date: startDate,
          end_date: endDate,
          is_public: visibility === "public",
        }),
      });

      if (!tripRes.ok) throw new Error("Không thể tạo chuyến đi!");
      const tripData = await tripRes.json();
      const tripId = tripData.trip_id || tripData.id;

      const formData = new FormData();
      formData.append("trip_id", tripId);
      formData.append("name", title);
      formData.append("description", description);
      formData.append("latitude", location.lat?.toString());
      formData.append("longitude", location.lng?.toString());

      const tagList = tags
  .split(",")
  .map((t) => parseInt(t.trim()))
  .filter((t) => !isNaN(t));

formData.append("tags", JSON.stringify(tagList));

      if (fileInputRef.current?.files.length > 0) {
        Array.from(fileInputRef.current.files).forEach((file) => {
          if (file.type.startsWith("image/")) formData.append("images", file);
          else if (file.type.startsWith("video/")) formData.append("videos", file);
        });
      }

      const uploadRes = await fetch("https://ktpm03.onrender.com/api/destinations", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error("Phản hồi lỗi từ API:", errorText);
        throw new Error("Không thể upload dữ liệu!");
      }
      
      alert("🎉 Bài viết đã được đăng!");
      navigate(`/`); // Điều hướng sang trang hiển thị bài viết
    } catch (err) {
      console.error(err);
      alert("❌ Có lỗi xảy ra khi đăng!");
    }
  };

  useEffect(() => {
    if (showMap && !mapRef.current) {
      mapRef.current = L.map("map").setView([21.0285, 105.8542], 6);
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

  const handleSearch = async (query, type) => {
    if (!query) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await response.json();
      setSuggestions(data);
      setSelectingType(type);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  const handleSelectLocation = (lat, lon, displayName) => {
    if (!mapRef.current) return;
    const coords = [parseFloat(lat), parseFloat(lon)];

    if (selectingType === "departure") {
      setDeparture(displayName);
      if (departureMarker.current) departureMarker.current.remove();
      departureMarker.current = L.marker(coords, { icon: circleIcon("yellow") })
        .addTo(mapRef.current)
        .bindTooltip(`Điểm đi: ${displayName}`, { permanent: false, direction: "top" })
        .openTooltip();
      setTimeout(() => {
        departureMarker.current?.setIcon(circleIcon("red"));
      }, 1000);
    } else if (selectingType === "destination") {
      setDestination(displayName);
      if (destinationMarker.current) destinationMarker.current.remove();
      destinationMarker.current = L.marker(coords, { icon: destinationIcon("yellow") })
        .addTo(mapRef.current)
        .bindTooltip(`Điểm đến: ${displayName}`, { permanent: false, direction: "top" })
        .openTooltip();
      setTimeout(() => {
        destinationMarker.current?.setIcon(destinationIcon("blue"));
      }, 1000);
    }

    mapRef.current.setView(coords, 8);
    setSuggestions([]);
    setSelectingType(null);

    if (departureMarker.current && destinationMarker.current) {
      const from = departureMarker.current.getLatLng();
      const to = destinationMarker.current.getLatLng();
      if (routingControl.current) mapRef.current.removeControl(routingControl.current);
      routingControl.current = L.Routing.control({
        waypoints: [from, to],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: "blue", weight: 5 }] },
        createMarker: () => null,
      }).addTo(mapRef.current);
    }

    setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
  };
  

  return (
    <div>
      <Navbar />
      <div className="post-containerr">
        <div className="post-header">
          <img src={user?.profile_image || "https://i.pravatar.cc/50"} alt="Avatar" className="user-avatar" />
          <span className="user-name">{user?.username || "Người dùng"}</span>
        </div>
        <h2>Tạo bài viết</h2>

        <div className="compact-fields">
          <input type="text" placeholder="Tên hành trình" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Thẻ (phân cách bằng dấu phẩy)" value={tags} onChange={(e) => setTags(e.target.value)} />
          <textarea placeholder="Mô tả ngắn..." value={description} onChange={(e) => setDescription(e.target.value)} />
          <textarea placeholder="Bạn đang nghĩ gì?" value={content} onChange={(e) => setContent(e.target.value)} />

          <div className="date-fields">
            <div>
              <label>Ngày bắt đầu</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <label>Ngày kết thúc</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="field-label">Chế độ hiển thị</label>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)} style={{ maxWidth: "20%" }}>
              <option value="public">Công khai</option>
              <option value="private">Chỉ mình tôi</option>
            </select>
          </div>
        </div>

        <input
          type="file"
          accept="image/*,video/*"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setImages([...images, ...Array.from(e.target.files).map((file) => URL.createObjectURL(file))])}
        />

        <div className="image-preview">
          {images.map((src, index) => (
            <div key={index} className="image-container">
              <img src={src} alt={`media-${index}`} className="preview-image" />
            </div>
          ))}
          <div className="image-container add-image-container" onClick={() => fileInputRef.current.click()}>
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828925.png" alt="Thêm ảnh" className="add-image" />
          </div>
        </div>

        <button className="toggle-map-btn" onClick={() => setShowMap(!showMap)}>Chọn điểm đi & điểm đến</button>

        {showMap && (
          <div>
            <input type="text" placeholder="Nhập điểm đi" value={departure} onChange={(e) => setDeparture(e.target.value)} />
            <button onClick={() => handleSearch(departure, "departure")}>Tìm điểm đi</button>

            <input type="text" placeholder="Nhập điểm đến" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <button onClick={() => handleSearch(destination, "destination")}>Tìm điểm đến</button>

            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((place, index) => (
                  <li key={index} onClick={() => handleSelectLocation(place.lat, place.lon, place.display_name)}>
                    {place.display_name}
                  </li>
                ))}
              </ul>
            )}

            <div id="map" className="map-container" style={{ height: 300 }}></div>
          </div>
        )}

        {location.lat && location.lng && (
          <div style={{ marginTop: 10 }}>
            📍 Đã chọn: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
          </div>
        )}

        <button className="btn-submit-post" onClick={handleSubmit}>Đăng</button>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
