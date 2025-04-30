import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
} from "../firebaseConfig";

function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const res = await fetch("https://ktpm03.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok || !data.token) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      // ✅ Chỉ lưu token chính xác
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      alert(`Đăng nhập thành công: ${data.email || data.username}`);
      navigate("/");
    } catch (error) {
      console.error("Login API error:", error);
      alert(error.message || "Lỗi đăng nhập");
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Login Success:", result.user);
      alert(`Đăng nhập thành công với Google: ${result.user.displayName}`);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      alert("Lỗi đăng nhập bằng Google");
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook Login Success:", result.user);
      alert(`Đăng nhập thành công với Facebook: ${result.user.displayName}`);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.error("Facebook Sign-in Error:", error);
      alert("Lỗi đăng nhập bằng Facebook");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Đăng nhập</h1>
        <div className="social-container">
          <button
            type="button"
            onClick={signInWithFacebook}
            className="social facebook-btn"
          >
            <FaFacebookF />
          </button>
          <button
            type="button"
            onClick={signInWithGoogle}
            className="social google-btn"
          >
            <FaGoogle />
          </button>
        </div>
        <span>Hoặc đăng nhập bằng email</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={state.password}
          onChange={handleChange}
        />
        <button className="sign-in-btn">Đăng Nhập</button>
      </form>
    </div>
  );
}

export default SignInForm;
