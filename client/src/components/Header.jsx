import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const MOBILE_BP = 900; // match CSS breakpoint
  const CLOSE_DELAY = 180; // ms - grace period before closing the desktop dropdown

  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false); // mobile submenu (for "Бидний тухай")
  const [mobileEpcOpen, setMobileEpcOpen] = useState(false); // EPC group inside that submenu
  const [mobileUbOpen, setMobileUbOpen] = useState(false); // UB group when promoted to top-level mobile item
  const [subOpen, setSubOpen] = useState(false); // desktop "Бидний тухай" dropdown
  const [ubOpen, setUbOpen] = useState(false); // desktop "УБ метро төсөл" dropdown

  const mobileDropdownRef = useRef(null);
  const closeTimerRef = useRef(null); // holds timeout id for sub dropdown
  const closeUbTimerRef = useRef(null); // holds timeout id for ub dropdown
  const location = useLocation();

  const subPages = [
    { to: "/about/organization", label: "Байгууллагын мэдээлэл" },
    { to: "/about/vision", label: "Зорилго, алсын хараа, уриа" },
    { to: "/about/message", label: "Захирлын мэндчилгээ" },
    { to: "/about/pmc", label: "Төслийн менежментийн Зөвлөх (PMC)" },
  ];

  const epcPages = [
    { to: "/about/epc/eronhii", label: "Ерөнхий мэдээлэл" },
    { to: "/about/epc/duhua", label: "Духуа Инженеринг ХК" },
    { to: "/about/epc/ktz", label: "Солонгос Төмөр Зам ТӨХК" },
    { to: "/about/epc/korea-nr", label: "Кореа Нэйшнл Рэйлвэй" },
    { to: "/about/epc/suson", label: "Сусон Инженеринг ХХК" },
  ];

  const ubPages = [
    { to: "/ubmetrotusul/project-info", label: "Төслийн мэдээлэл" },
    { to: "/ubmetrotusul/progress", label: "Төслийн явц" },
    { to: "/ubmetrotusul/feasibility", label: "Техник, эдийн засгийн үндэслэл (ТЭЗҮ)" },
    { to: "/ubmetrotusul/master-plan", label: "Эх загвар зураг" },
    { to: "/ubmetrotusul/financing", label: "Төслийн санхүүжилт" },
    { to: "/ubmetrotusul/benefits", label: "Төслийн үр өгөөж" },
    { to: "/ubmetrotusul/legal", label: "Хууль, эрх зүйн орчин" },
  ];

  const closeAll = useCallback(() => {
    setMobileDropdownOpen(false);
    setMobileSubOpen(false);
    setMobileEpcOpen(false);
    setMobileUbOpen(false);
    setSubOpen(false);
    setUbOpen(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (closeUbTimerRef.current) {
      clearTimeout(closeUbTimerRef.current);
      closeUbTimerRef.current = null;
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
        setMobileEpcOpen(false);
        setMobileUbOpen(false);
      } else {
        // when switching to mobile hide desktop dropdowns
        setSubOpen(false);
        setUbOpen(false);
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

  // ---------------- Desktop hover handlers with grace-period (sub) ----------------
  const cancelPendingClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (closeUbTimerRef.current) {
      clearTimeout(closeUbTimerRef.current);
      closeUbTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setSubOpen(false);
      closeTimerRef.current = null;
    }, CLOSE_DELAY);
  };

  // handlers to attach to the wrapper (.has-dropdown) and the panel (.dropdown) for sub
  const onTriggerEnter = () => {
    cancelPendingClose();
    setSubOpen(true);
    // ensure UB dropdown isn't open at the same time
    setUbOpen(false);
  };
  const onTriggerLeave = () => {
    scheduleClose();
  };
  const onPanelEnter = () => {
    cancelPendingClose();
    setSubOpen(true);
    setUbOpen(false);
  };
  const onPanelLeave = () => {
    scheduleClose();
  };

  // ---------------- Desktop hover handlers with grace-period (ub) ----------------
  const scheduleUbClose = () => {
    if (closeUbTimerRef.current) {
      clearTimeout(closeUbTimerRef.current);
      closeUbTimerRef.current = null;
    }
    closeUbTimerRef.current = setTimeout(() => {
      setUbOpen(false);
      closeUbTimerRef.current = null;
    }, CLOSE_DELAY);
  };

  const onUbTriggerEnter = () => {
    cancelPendingClose();
    setUbOpen(true);
    setSubOpen(false);
  };
  const onUbTriggerLeave = () => {
    scheduleUbClose();
  };
  const onUbPanelEnter = () => {
    cancelPendingClose();
    setUbOpen(true);
    setSubOpen(false);
  };
  const onUbPanelLeave = () => {
    scheduleUbClose();
  };

  // helper to toggle mobile small-panel
  const toggleMobileDropdown = () => {
    setMobileDropdownOpen((s) => {
      const next = !s;
      if (!next) {
        setMobileSubOpen(false);
        setMobileEpcOpen(false);
        setMobileUbOpen(false);
      }
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

          {/* BIDNII TUKHAI dropdown (desktop) */}
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
                  setSubOpen((s) => !s);
                  setMobileDropdownOpen(true);
                }
              }}
            >
              Бидний тухай
            </NavLink>

            <div
              className={`dropdown ${subOpen ? "open" : ""}`}
              aria-label="Бидний тухай submenu"
              onMouseEnter={() => { if (window.innerWidth > MOBILE_BP) onPanelEnter(); }}
              onMouseLeave={() => { if (window.innerWidth > MOBILE_BP) onPanelLeave(); }}
            >
              <div className="dropdown-left" role="menu">
                {subPages.map((p) => (
                  <Link key={p.to} to={p.to} className="dropdown-link" onClick={closeAll}>
                    {p.label}
                  </Link>
                ))}
              </div>

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

          {/* UB METRO TUSUL - desktop dropdown */}
          <div
            className={`banner-link has-dropdown ${ubOpen ? "open" : ""}`}
            onMouseEnter={() => { if (window.innerWidth > MOBILE_BP) onUbTriggerEnter(); }}
            onMouseLeave={() => { if (window.innerWidth > MOBILE_BP) onUbTriggerLeave(); }}
          >
            <NavLink
              to="/ubmetrotusul"
              className={({ isActive }) => (isActive ? "banner-link active" : "banner-link")}
              onClick={(e) => {
                if (window.innerWidth <= MOBILE_BP) {
                  e.preventDefault();
                  setUbOpen((s) => !s);
                  setMobileDropdownOpen(true);
                }
              }}
            >
              УБ метро төсөл
            </NavLink>

            <div
              className={`dropdown ${ubOpen ? "open" : ""}`}
              aria-label="УБ метро төсөл submenu"
              onMouseEnter={() => { if (window.innerWidth > MOBILE_BP) onUbPanelEnter(); }}
              onMouseLeave={() => { if (window.innerWidth > MOBILE_BP) onUbPanelLeave(); }}
            >
              <div className="dropdown-left" role="menu">
                {ubPages.map((p) => (
                  <Link key={p.to} to={p.to} className="dropdown-link" onClick={closeAll}>
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

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
              {/* Top row: "Бидний тухай" with its chevron (mobileSubOpen), kept as before */}
              <div className="mobile-about-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <NavLink
                  to="/about"
                  className="mobile-panel-link"
                  onClick={() => { setMobileDropdownOpen(false); setMobileSubOpen(false); setMobileEpcOpen(false); setMobileUbOpen(false); }}
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

              {/* Mobile submenu: ONLY contains the 'Бидний тухай' subpages + EPC group (UB group REMOVED from here) */}
              <div id="mobile-submenu" className={`mobile-submenu ${mobileSubOpen ? "open" : ""}`} role="menu">
                <div className="mobile-submenu-group" style={{ paddingBottom: 8 }}>
                  {subPages.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="mobile-submenu-link"
                      onClick={() => { setMobileDropdownOpen(false); setMobileSubOpen(false); setMobileEpcOpen(false); setMobileUbOpen(false); }}
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>

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

                  {/* EPC links */}
                  <div id="mobile-epc-list" className={`mobile-submenu ${mobileEpcOpen ? "open" : ""}`} style={{ paddingLeft: 8, marginTop: 6 }}>
                    {epcPages.map((p) => (
                      <Link
                        key={p.to}
                        to={p.to}
                        className="mobile-submenu-link"
                        onClick={() => { setMobileDropdownOpen(false); setMobileSubOpen(false); setMobileEpcOpen(false); setMobileUbOpen(false); }}
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* === PROMOTED: UB METRO TUSUL is now a top-level mobile item (NOT inside "Бидний тухай") ===
                  Show with a chevron toggle so user can expand its pages without navigating. */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <NavLink
                  to="/ubmetrotusul"
                  className="mobile-panel-link"
                  onClick={() => setMobileDropdownOpen(false)}
                >
                  УБ метро төсөл
                </NavLink>

                <button
                  className={`mobile-submenu-toggle ${mobileUbOpen ? "open" : ""}`}
                  aria-expanded={mobileUbOpen}
                  aria-controls="mobile-ub-list"
                  onClick={() => setMobileUbOpen((s) => !s)}
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M9.29 6.71a1 1 0 011.42 0l5.59 5.59a1 1 0 010 1.42l-5.59 5.59a1 1 0 01-1.42-1.42L14.17 13 9.29 8.12a1 1 0 010-1.41z"/>
                  </svg>
                </button>
              </div>

              {/* UB mobile-submenu (collapsible) */}
              <div id="mobile-ub-list" className={`mobile-submenu ${mobileUbOpen ? "open" : ""}`} style={{ paddingLeft: 8, marginTop: 6 }}>
                {ubPages.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="mobile-submenu-link"
                    onClick={() => { setMobileDropdownOpen(false); setMobileSubOpen(false); setMobileEpcOpen(false); setMobileUbOpen(false); }}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>

              {/* Primary nav mirror links after the top-level items */}
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
