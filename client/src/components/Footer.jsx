// client/src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import "./Footer.css";
import mapImg from "../assets/footer-map.jpg"; // update path if needed

export default function Footer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openModal() {
    setOpen(true);
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setOpen(false);
    document.body.style.overflow = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    // Collect checkbox values (they share same name 'interest')
    const interests = e.target.querySelectorAll('input[name="interest"]:checked');
    data.interest = Array.from(interests).map(i => i.value);
    console.log("Submit:", data);
    // TODO: replace with real submit (fetch/axios)
    closeModal();
    alert("Баярлалаа! Таны хүсэлт хүлээн авлаа.");
  }

  return (
    <>
      <footer className="site-footer">
        <div className="footer-inner container">
          <div className="footer-left">
            <div className="map-wrap">
              <img src={mapImg} alt="UB Metro map" />
            </div>
            <div className="project-title">
              <h4>UB Metro Project</h4>
              <p>Хотын бүтээн байгуулалтын талаарх мэдээллийн төв.</p>
            </div>
          </div>

          <div className="footer-center">
            <h4 className="contact-heading">Холбоо барих</h4>

            <div className="contact-item">
              <svg className="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z"/>
              </svg>
              <a href="mailto:ubmetro@pl.mn">ubmetro@pl.mn</a>
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

          <button
            className="vertical-cta"
            onClick={openModal}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            БҮРТГҮҮЛЭХ
          </button>
        </div>

        <div className="footer-bottom">
          © Улаанбаатар Метро {new Date().getFullYear()} он
        </div>
      </footer>

      {/* Modal */}
      {open && (
        <div className="modal-overlay" onMouseDown={closeModal} role="presentation">
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="Бүртгүүлэх форм"
            onMouseDown={e => e.stopPropagation()} // prevent overlay close when clicking inside
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">✕</button>

            <div className="modal-grid">
              <div className="modal-left">
                <h3>БҮРТГҮҮЛЭХ</h3>
                <p className="modal-sub">Суллах мэдээ, төслийн шинэчлэлтийн талаарх мэдээлэл авах</p>

                <form onSubmit={handleSubmit} className="reg-form">
                  <div className="form-row">
                    <label>Таны нэр</label>
                    <input name="name" type="text" required />
                  </div>

                  <div className="form-row">
                    <label>Имэйл хаяг</label>
                    <input name="email" type="email" required />
                  </div>

                  <div className="form-row">
                    <label>Утас</label>
                    <input name="phone" type="tel" />
                  </div>

                  <div className="form-row interests">
                    <label>Сонирхож буй төрөл</label>
                    <div className="checkboxes">
                      <label><input type="checkbox" name="interest" value="төлөвлөгөө" /> Төлөвлөгөө</label>
                      <label><input type="checkbox" name="interest" value="ажилбар" /> Төслийн явц</label>
                      <label><input type="checkbox" name="interest" value="мэдээ" /> Мэдээ, мэдэгдэл</label>
                      <label><input type="checkbox" name="interest" value="бусад" /> Бусад</label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="submit-btn">БҮРТГҮҮЛЭХ</button>
                  </div>
                </form>
              </div>

              <div className="modal-right">
                {/* The right side mirrors the printed screenshot: light-grey panel with fields aligned vertically */}
                <div className="panel">
                  <div className="panel-row">
                    <label>Таны нэр</label>
                    <input name="panel_name" type="text" />
                  </div>
                  <div className="panel-row">
                    <label>Имэйл хаяг</label>
                    <input name="panel_email" type="email" />
                  </div>
                  <div className="panel-row">
                    <label>Утас</label>
                    <input name="panel_phone" type="tel" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
