// client/src/components/Footer.jsx
import React from "react";
import "./Footer.css";
import mapImg from "../assets/footer-map.png"; // update path if needed

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-left">
          <div className="map-wrap">
            <img src={mapImg} alt="UB Metro map" />
          </div>
          <div className="project-title">
            <h4>UB Metro Project Location</h4>
          </div>
        </div>

        <div className="footer-center">
          <h4 className="contact-heading">Холбоо барих</h4>

          <div className="contact-item">
            <svg className="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z"/>
            </svg>
            <a href="mailto:ubmetro@ipiu.mn">ubmetro@ipiu.mn</a>
          </div>

          <div className="contact-item">
            <svg className="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57.12.36 0 .76-.24 1.01l-2.21 2.21z"/>
            </svg>
            <a href="tel:+97670001937">+976 7000-1937</a>
          </div>

          <div className="contact-item address">
            <svg className="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
            </svg>
            <div>
              <div>Монгол улс, Улаанбаатар хот</div>
              <div>Хан-Уул дүүрэг, 23-р хороо</div>
              <div>Нийслэлийн захиргааны байр, 5 блок байр, 6 давхар</div>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <h4>Холбоос</h4>
          <ul className="footer-links">
            <li><a href="/news">Мэдээ</a></li>
            <li><a href="/planning">Төлөвлөгөө</a></li>
            <li><a href="/contact">Холбогдох</a></li>
          </ul>
        </div>

        {/* Removed the vertical CTA button and modal */}
      </div>

      <div className="footer-bottom">
        © Улаанбаатар Метро {new Date().getFullYear()} он
      </div>
    </footer>
  );
}
