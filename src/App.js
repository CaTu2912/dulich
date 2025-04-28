import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Homepage"; 
import Login from "./aut/Login"; 
import Navbar from "./compment/navbar"; 
import CreatePost from"./page/post"
import Profile from"./page/canhan"
import Mienbac from"./page/mienbac"
import Mientrung from"./page/mientrung"
import Miennam from"./page/miennam"



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/post" element={<CreatePost />} />
      <Route path="/canhan" element={<Profile />} />
      <Route path="/mienbac" element={<Mienbac />} />
      <Route path="/mientrung" element={<Mientrung />} />
      <Route path="/miennam" element={<Miennam />} />
      </Routes>
    </Router>
  );
}

export default App;
