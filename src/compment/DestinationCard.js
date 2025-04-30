// src/compment/DestinationCard.js
import React from "react";

export default function DestinationCard({ place }) {
  return (
    <div className="destination-card">
      <img src={place.image} alt={place.name} className="destination-image" />
      <div className="destination-content">
        <div className="destination-title">{place.name}</div>
        <div className="destination-description">{place.description}</div>

        <div className="destination-links">
          <a href={`/${place.slug}`} className="destination-detail-link">
            Xem chi tiết
          </a>
          <a
            href={place.location}
            target="_blank"
            rel="noopener noreferrer"
            className="destination-link"
          >
            Xem trên Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
