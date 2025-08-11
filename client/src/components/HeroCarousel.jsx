// client/src/components/HeroCarousel.jsx
import { useEffect, useState } from "react";

export default function HeroCarousel({ slides }) {
  return (
    <div className="hero-carousel">
      {slides.map((slide, idx) => (
        <div key={idx} className="hero-slide">
          {slide.video ? (
            <video
              className="hero-video"
              src={slide.video}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              className="hero-image"
              src={slide.image}
              alt={slide.title}
            />
          )}
          <div className="hero-overlay">
            <h1>{slide.title}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}

