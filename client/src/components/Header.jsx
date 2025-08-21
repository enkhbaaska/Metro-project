// client/src/components/Header.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  // single source of truth for mobile overlay
  const [menuOpen, setMenuOpen] = useState(false);
  // dropdown for "Бидний тухай"
  const [subOpen, setSubOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const location = useLocation();

  const subPages = [
    { to: "/about/organization", label: "Байгууллагын мэдээлэл" },
    { to: "/about/vision", label: "Зорилго, алсын хараа, уриа" },
    { to: "/about/message", label: "Захирлын мэндчилгээ" },
    { to: "/about/pmc", label: "Төслийн менежментийн Зөвлөх (PMC)" },
    { to: "/about/epc", label: "Төслийн бүтээн байгуулалтын ажлыг гүйцэтгэгч (EPC)" },
    { to: "/about/jobs", label: "150,000 Шинэ ажлын байр" },
  ];

  // close menu helper (useCallback so stable)
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setSubOpen(false);
  }, []);

  // block body scroll on mobile overlay open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  // run when pathname changes
  }, [location.pathname, closeMenu]);

  // resize behavior: ensure dropdown closed when switching to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        setSubOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // focus management + Escape key to close menu when overlay open
  useEffect(() => {
    if (!menuOpen) return;
    const node = mobileNavRef.current;
    if (node) {
      const firstFocusable = node.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
      firstFocusable?.focus();
    }

    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  // backdrop click: only close when clicking the overlay itself (not inside wrapper)
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeMenu();
  };

  return (
    <div className="site-banner">
      {/* Top header (logo left / controls right) */}
      <header className="site-header">
        <div className="container header-top">
          <Link to="/" className="brand" onClick={closeMenu}>
            <img src="/ubmetrologo.png" alt="UB Metro logo" className="brand-logo" />
            <img src="/ubmetro2.png" alt="UB Metro logo 2" className="brand-logo" />
            <img src="/dohwa.svg" alt="Dohwa logo" className="brand-logo" />
            <span className="brand-text">UB Metro Project</span>
          </Link>

          <div className="header-right-wrapper">
            <button
              className="mobile-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((s) => !s)}
            >
              <span className={`hamburger ${menuOpen ? "open" : ""}`} aria-hidden="true">
                <span></span><span></span><span></span>
              </span>
            </button>

            <div className="header-controls" role="region" aria-label="Site tools">
              <div className="lang-switch">
                <button className="lang-btn">EN</button>
                <span className="lang-sep">|</span>
                <button className="lang-btn active">MN</button>
              </div>

              <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="site-search" className="sr-only">Search</label>
                <input id="site-search" className="search-input" placeholder="Search..." />
                <button type="submit" className="search-btn" aria-label="Search">🔍</button>
              </form>

              <div className="social-links">
                <a className="social-icon" href="https://www.facebook.com/profile.php?id=61576745758867" target="_blank" rel="noreferrer">F</a>
                <a className="social-icon" href="https://x.com" target="_blank" rel="noreferrer">X</a>
                <a className="social-icon" href="https://instagram.com" target="_blank" rel="noreferrer">IG</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop banner nav (visible on wider screens) */}
      <nav className="banner-nav" aria-label="Primary site navigation">
        <div className="banner-nav-inner container" role="menubar">
          <div
            className={`banner-link has-dropdown ${subOpen ? "open" : ""}`}
            onMouseEnter={() => window.innerWidth > 900 && setSubOpen(true)}
            onMouseLeave={() => window.innerWidth > 900 && setSubOpen(false)}
          >
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}
              onClick={(e) => {
                // on small screens, toggle submenu instead of navigating to /about
                if (window.innerWidth <= 900) {
                  e.preventDefault();
                  setSubOpen((s) => !s);
                  setMenuOpen(true); // optionally open mobile overlay
                }
              }}
            >
              Бидний тухай
            </NavLink>

            <ul className={`dropdown ${subOpen ? "open" : ""}`} aria-label="Бидний тухай submenu">
              {subPages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="dropdown-link" onClick={() => { closeMenu(); }}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <NavLink to="/" end className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>УБ метро төсөл</NavLink>
          <NavLink to="/planning" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Тогтвортой хөгжил</NavLink>
          <NavLink to="/planning#programs" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>2 2 Хөтөлбөр</NavLink>
          <NavLink to="/news" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Мэдээ Мэдээлэл</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Холбоо барих</NavLink>
        </div>
      </nav>

      {/* Mobile full-screen nav overlay */}
      <div
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        aria-hidden={!menuOpen}
        onClick={onBackdropClick}
        ref={mobileNavRef}
      >
        <div className="mobile-nav-inner">
          <div className="container mobile-nav-wrapper">
            <nav id="mobile-menu" className="mobile-menu" role="menu" aria-label="Primary mobile navigation">
              <NavLink to="/about" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")} onClick={closeMenu}>Бидний тухай</NavLink>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")} onClick={closeMenu}>УБ метро төсөл</NavLink>
              <NavLink to="/planning" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")} onClick={closeMenu}>Тогтвортой хөгжил</NavLink>
              <NavLink to="/planning#programs" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")} onClick={closeMenu}>2 2 Хөтөлбөр</NavLink>
              <NavLink to="/news" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")} onClick={closeMenu}>Мэдээ Мэдээлэл</NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")} onClick={closeMenu}>Холбоо барих</NavLink>
            </nav>
          </div>

          <button className="mobile-close" onClick={closeMenu} aria-label="Close menu">Close</button>
        </div>
      </div>
    </div>
  );
}
