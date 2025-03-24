import React, { useState } from "react"; // ✅ Thêm useState vào import
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { auth, googleProvider, facebookProvider, signInWithPopup } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaFacebookF, FaGoogle } from "react-icons/fa";


function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate(); // ✅ Khai báo useNavigate


  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, state.email, state.password);
      alert(`Logged in as ${userCredential.user.email}`);

      // ✅ Reset state sau khi đăng nhập thành công
      setState({ email: "", password: "" });

    } catch (error) {
      console.error("Email/Password Sign-in Error:", error);
      alert(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Đăng nhập thành công: ${result.user.displayName}`);
      navigate("/"); // ✅ Chuyển về trang chủ sau khi đăng nhập Google
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error);
    }
  };


  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      alert(`Đăng nhập thành công: ${result.user.displayName}`);
      navigate("/"); // ✅ Chuyển về trang chủ sau khi đăng nhập Facebook
    } catch (error) {
      console.error("Lỗi đăng nhập Facebook:", error);
    }
  };


  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Đăng nhập</h1>
        <div className="social-container">
          <button type="button" onClick={signInWithFacebook} className="social facebook-btn">
          <FaFacebookF /> 
          </button>
          <button type="button" onClick={signInWithGoogle} className="social google-btn">
          <FaGoogle /> 
          </button>
        </div>
        <span>Hoặc đăng nhập bằng</span>
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
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
      <button className="sign-in-btn">Đăng Nhập</button>
      </form>
    </div>
  );
}

export default SignInForm;
