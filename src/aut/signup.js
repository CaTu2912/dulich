import React from "react";

function SignUpForm() {
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: "",
    profile_image: "",
    bio: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();

    try {
      const response = await fetch("https://ktpm03.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Đăng ký thành công: ${data.username}`);
        setState({
          username: "",
          email: "",
          password: "",
          profile_image: "",
          bio: ""
        });
      } else {
        const err = await response.json();
        alert(`Lỗi: ${err.message}`);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Đã xảy ra lỗi khi đăng ký.");
    }
  };


  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Đăng ký</h1>
        <span>Hoặc đăng ký bằng email</span>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Tên người dùng"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
        />
        <button className="sign-in-btn">Đăng ký</button>
      </form>
    </div>
  );
}

export default SignUpForm;
