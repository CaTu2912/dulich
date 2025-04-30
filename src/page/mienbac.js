// src/pages/Mienbac.js
import React, { useState } from "react";
import Navbar from "../compment/navbar";
import Footer from "../compment/footer";
import destinations from "../data/destinations"; // đường dẫn tới file data
import DestinationCard from "../compment/DestinationCard";

import "../assets/css/mienbac.css";

const ITEMS_PER_PAGE = 6;

export default function Mienbac() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDestinations = destinations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <Navbar />
      <div className="destinations-container">
        <h1 className="title">Địa Điểm Đến - Miền Bắc</h1>
        <div className="destinations-grid">
          {currentDestinations.map((place, index) => (
            <DestinationCard key={index} place={place} />
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            ←
          </button>

          <span className="pagination-text">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            →
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
