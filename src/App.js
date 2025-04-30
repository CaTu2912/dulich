import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Homepage"; 
import Login from "./aut/Login"; 
import Navbar from "./compment/navbar"; 
import Footer from "./compment/footer"; 
import CreatePost from"./page/post"
import Profile from"./page/canhan"
import Mienbac from"./page/mienbac"
import Mientrung from"./page/mientrung"
import Miennam from"./page/miennam"
import VHL from"./diadanh/vhl"
import Sapa from"./diadanh/sapa"




function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/post" element={<CreatePost />} />
      <Route path="/canhan" element={<Profile />} />
      <Route path="/mienbac" element={<Mienbac />} />
      <Route path="/mientrung" element={<Mientrung />} />
      <Route path="/miennam" element={<Miennam />} />
      <Route path="/vhl" element={<VHL/>} />
      <Route path="/sapa" element={<Sapa/>} />
      </Routes>
    </Router>
  );
}

export default App;
