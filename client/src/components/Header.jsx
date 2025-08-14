import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const mobileNavRef = React.useRef(null);
  const location = useLocation();

  // prevent background scrolling when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // close menu helper
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  // Close menu when route changes (so link navigation auto-closes)
  React.useEffect(() => {
    // only run when path changes (not on first render)
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // focus management: focus first focusable item inside mobile menu when opened
  React.useEffect(() => {
    if (!menuOpen) return;
    const node = mobileNavRef.current;
    if (!node) return;

    const firstFocusable = node.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();

    // handle Escape key to close menu
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
            {/* logos (hidden on mobile via CSS) */}
            <img src="/ubmetrologo.png" alt="UB Metro logo" className="brand-logo" />
            <img src="/ubmetro2.png" alt="UB Metro logo 2" className="brand-logo" />
            <img src="/dohwa.svg" alt="Dohwa logo" className="brand-logo" />
            <span className="brand-text">UB Metro Project</span>
          </Link>

          {/* mobile toggle visible on small screens, hidden on desktop */}
          <div className="header-right-wrapper">
            <button
              className="mobile-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((s) => !s)}
            >
              {/* hamburger / close */}
              <span className={`hamburger ${menuOpen ? "open" : ""}`} aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* top-right controls (language, search, social) - hidden on mobile via CSS */}
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
                <a className="social-icon" href="https://www.facebook.com/profile.php?id=61576745758867" target="_blank" rel="noopener noreferrer">F</a>
                <a className="social-icon" href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
                <a className="social-icon" href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
                <a className="social-icon" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">in</a>
                <a className="social-icon" href="https://youtube.com" target="_blank" rel="noopener noreferrer">▶</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop banner nav (visible on wider screens) */}
      <nav className="banner-nav" aria-label="Primary site navigation">
        <div className="banner-nav-inner container" role="menubar">
          <NavLink to="/about" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Бидний тухай</NavLink>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>УБ метро төсөл</NavLink>
          <NavLink to="/planning" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Тогтвортой хөгжил</NavLink>
          <NavLink to="/planning#programs" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>2 2 Хөтөлбөр</NavLink>
          <NavLink to="/news" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Мэдээ Мэдээлэл</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Холбоо барих</NavLink>
        </div>
      </nav>

      {/* Mobile full-screen nav overlay (only shown on small screens) */}
      <div
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        aria-hidden={menuOpen ? "false" : "true"}
        onClick={onBackdropClick}
        ref={mobileNavRef}
      >
        <div className="mobile-nav-inner">
          {/* wrapper: keeps links grouped and constrained like the desktop banner */}
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
