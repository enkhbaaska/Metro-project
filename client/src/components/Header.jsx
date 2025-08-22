import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const MOBILE_BP = 900; // match CSS breakpoint
  const CLOSE_DELAY = 180; // ms - grace period before closing the desktop dropdown

  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false); // mobile submenu
  const [mobileEpcOpen, setMobileEpcOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false); // desktop "Бидний тухай" dropdown

  const mobileDropdownRef = useRef(null);
  const closeTimerRef = useRef(null); // holds timeout id for desktop dropdown
  const location = useLocation();

  const subPages = [
    { to: "/about/organization", label: "Байгууллагын мэдээлэл" },
    { to: "/about/vision", label: "Зорилго, алсын хараа, уриа" },
    { to: "/about/message", label: "Захирлын мэндчилгээ" },
    { to: "/about/pmc", label: "Төслийн менежментийн Зөвлөх (PMC)" },
    // jobs removed per prior request
  ];

  const epcPages = [
    { to: "/about/epc/eronhii", label: "Ерөнхий мэдээлэл" },
    { to: "/about/epc/duhua", label: "Духуа Инженеринг ХК" },
    { to: "/about/epc/ktz", label: "Солонгос Төмөр Зам ТӨХК" },
    { to: "/about/epc/korea-nr", label: "Кореа Нэйшнл Рэйлвэй" },
    { to: "/about/epc/suson", label: "Сусон Инженеринг ХХК" },
  ];

  const closeAll = useCallback(() => {
    setMobileDropdownOpen(false);
    setMobileSubOpen(false);
    setSubOpen(false);
    // clear any pending close timer
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Close on route changes
  useEffect(() => {
    closeAll();
  }, [location.pathname, closeAll]);

  // make sure dropdowns close when resizing to desktop or mobile
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > MOBILE_BP) {
        // ensure mobile UI closed when at desktop widths
        setMobileDropdownOpen(false);
        setMobileSubOpen(false);
      } else {
        // when switching to mobile hide desktop dropdown
        setSubOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Mobile dropdown outside click + escape
  useEffect(() => {
    if (!mobileDropdownOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileDropdownOpen(false);
    };
    const onDocClick = (e) => {
      if (!mobileDropdownRef.current) return;
      if (!mobileDropdownRef.current.contains(e.target)) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [mobileDropdownOpen]);

  // ---------------- Desktop hover handlers with grace-period ----------------
  const cancelPendingClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    // schedule close after CLOSE_DELAY ms - cancelable
    cancelPendingClose();
    closeTimerRef.current = setTimeout(() => {
      setSubOpen(false);
      closeTimerRef.current = null;
    }, CLOSE_DELAY);
  };

  // handlers to attach to the wrapper (.has-dropdown) and the panel (.dropdown)
  const onTriggerEnter = () => {
    cancelPendingClose();
    setSubOpen(true);
  };
  const onTriggerLeave = () => {
    scheduleClose();
  };
  const onPanelEnter = () => {
    cancelPendingClose();
    setSubOpen(true);
  };
  const onPanelLeave = () => {
    scheduleClose();
  };

  // helper to toggle mobile small-panel
  const toggleMobileDropdown = () => {
    setMobileDropdownOpen((s) => {
      const next = !s;
      if (!next) setMobileSubOpen(false);
      return next;
    });
  };

  return (
    <div className="site-banner">
      <header className="site-header">
        <div className="container header-top">
          <Link to="/" className="brand" onClick={closeAll}>
            <img src="/ubmetrologo.png" alt="UB Metro logo" className="brand-logo" />
            <img src="/ubmetro2.png" alt="UB Metro logo 2" className="brand-logo" />
            <img src="/dohwa.svg" alt="Dohwa logo" className="brand-logo" />
            <span className="brand-text">UB Metro Project</span>
          </Link>

          <div className="header-right-wrapper">
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
                <a className="social-icon" href="https://www.facebook.com" target="_blank" rel="noreferrer">F</a>
                <a className="social-icon" href="https://x.com" target="_blank" rel="noreferrer">X</a>
                <a className="social-icon" href="https://instagram.com" target="_blank" rel="noreferrer">IG</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Banner nav */}
      <nav className="banner-nav" aria-label="Primary site navigation">
        <div className="banner-nav-inner container" role="menubar">

          {/* HAS-DROPDOWN wrapper: attach enter/leave to manage JS grace period */}
          <div
            className={`banner-link has-dropdown ${subOpen ? "open" : ""}`}
            onMouseEnter={() => { if (window.innerWidth > MOBILE_BP) onTriggerEnter(); }}
            onMouseLeave={() => { if (window.innerWidth > MOBILE_BP) onTriggerLeave(); }}
          >
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}
              onClick={(e) => {
                if (window.innerWidth <= MOBILE_BP) {
                  e.preventDefault();
                  // toggle mobile-style expansion
                  setSubOpen((s) => !s);
                  setMobileDropdownOpen(true); // to show mobile panel if needed
                }
              }}
            >
              Бидний тухай
            </NavLink>

            {/* Dropdown panel: attach panel enter/leave so hovering the panel cancels close */}
            <div
              className={`dropdown ${subOpen ? "open" : ""}`}
              aria-label="Бидний тухай submenu"
              onMouseEnter={() => { if (window.innerWidth > MOBILE_BP) onPanelEnter(); }}
              onMouseLeave={() => { if (window.innerWidth > MOBILE_BP) onPanelLeave(); }}
            >
              {/* left column (stack of links) */}
              <div className="dropdown-left" role="menu">
                {subPages.map((p) => (
                  <Link key={p.to} to={p.to} className="dropdown-link" onClick={closeAll}>
                    {p.label}
                  </Link>
                ))}
              </div>

              {/* right column - EPC links and description */}
              <div className="dropdown-right" role="menu">
                <div className="dropdown-right-title">Төслийн бүтээн байгуулалтын ажлыг гүйцэтгэгч (EPC)</div>
                {epcPages.map((p) => (
                  <Link key={p.to} to={p.to} className="dropdown-link" onClick={closeAll}>
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/" end className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>УБ метро төсөл</NavLink>
          <NavLink to="/planning" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Тогтвортой хөгжил</NavLink>
          <NavLink to="/planning#programs" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>2 2 Хөтөлбөр</NavLink>
          <NavLink to="/news" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Мэдээ Мэдээлэл</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}>Холбоо барих</NavLink>

          {/* small mobile dropdown toggle (visible in CSS under MOBILE_BP) */}
          <div className="mobile-dropdown-wrapper" ref={mobileDropdownRef}>
            <button
              className={`mobile-dropdown-toggle ${mobileDropdownOpen ? "open" : ""}`}
              aria-expanded={mobileDropdownOpen}
              aria-controls="mobile-dropdown-panel"
              aria-label={mobileDropdownOpen ? "Close menu" : "Open menu"}
              onClick={toggleMobileDropdown}
            >
              <span className="md-line" />
              <span className="md-line" />
              <span className="md-line" />
            </button>

            <div id="mobile-dropdown-panel" className={`mobile-dropdown-panel ${mobileDropdownOpen ? "open" : ""}`} role="menu" aria-hidden={!mobileDropdownOpen}>
              {/* Mobile panel content: "Бидний тухай" row + single combined submenu that also includes EPC group */}
              <div className="mobile-about-row">
                <NavLink
                  to="/about"
                  className="mobile-panel-link"
                  onClick={() => { setMobileDropdownOpen(false); setMobileSubOpen(false); setMobileEpcOpen(false); }}
                >
                  Бидний тухай
                </NavLink>

                <button
                  className={`mobile-submenu-toggle ${mobileSubOpen ? "open" : ""}`}
                  aria-expanded={mobileSubOpen}
                  aria-controls="mobile-submenu"
                  onClick={() => setMobileSubOpen((s) => !s)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M9.29 6.71a1 1 0 011.42 0l5.59 5.59a1 1 0 010 1.42l-5.59 5.59a1 1 0 01-1.42-1.42L14.17 13 9.29 8.12a1 1 0 010-1.41z"/>
                  </svg>
                </button>
              </div>

              {/* Single mobile submenu that contains two groups:
                  Group A = subPages (organization, vision, message, pmc)
                  Group B = EPC header + epcPages list (collapsible) */}
              <div id="mobile-submenu" className={`mobile-submenu ${mobileSubOpen ? "open" : ""}`} role="menu">
                {/* Group A - primary subpages */}
                <div className="mobile-submenu-group" style={{ paddingBottom: 8 }}>
                  {subPages.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="mobile-submenu-link"
                      onClick={() => { setMobileDropdownOpen(false); setMobileSubOpen(false); setMobileEpcOpen(false); }}
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>

                {/* Group B - EPC header with its own toggle */}
                <div className="mobile-submenu-group" style={{ marginTop: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: 800, color: "var(--banner-blue)" }}>
                      Төслийн бүтээн байгуулалтын ажлыг гүйцэтгэгч (EPC)
                    </div>

                    <button
                      className={`mobile-submenu-toggle ${mobileEpcOpen ? "open" : ""}`}
                      aria-expanded={mobileEpcOpen}
                      aria-controls="mobile-epc-list"
                      onClick={() => setMobileEpcOpen((s) => !s)}
                      style={{ background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path fill="currentColor" d="M9.29 6.71a1 1 0 011.42 0l5.59 5.59a1 1 0 010 1.42l-5.59 5.59a1 1 0 01-1.42-1.42L14.17 13 9.29 8.12a1 1 0 010-1.41z"/>
                      </svg>
                    </button>
                  </div>

                  {/* EPC links — will show/hide with mobileEpcOpen */}
                  <div id="mobile-epc-list" className={`mobile-submenu ${mobileEpcOpen ? "open" : ""}`} style={{ paddingLeft: 8, marginTop: 6 }}>
                    {epcPages.map((p) => (
                      <Link
                        key={p.to}
                        to={p.to}
                        className="mobile-submenu-link"
                        onClick={() => { setMobileDropdownOpen(false); setMobileSubOpen(false); setMobileEpcOpen(false); }}
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Primary nav mirror links after the single submenu (same as before) */}
              <NavLink to="/" end className="mobile-panel-link" onClick={() => setMobileDropdownOpen(false)}>УБ метро төсөл</NavLink>
              <NavLink to="/planning" className="mobile-panel-link" onClick={() => setMobileDropdownOpen(false)}>Тогтвортой хөгжил</NavLink>
              <NavLink to="/planning#programs" className="mobile-panel-link" onClick={() => setMobileDropdownOpen(false)}>2 2 Хөтөлбөр</NavLink>
              <NavLink to="/news" className="mobile-panel-link" onClick={() => setMobileDropdownOpen(false)}>Мэдээ Мэдээлэл</NavLink>
              <NavLink to="/contact" className="mobile-panel-link" onClick={() => setMobileDropdownOpen(false)}>Холбоо барих</NavLink>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
