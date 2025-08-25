// bidniitukhai/EPC/eronhii.jsx
import React from "react";

export default function Eronhii() {
  // change this to the actual image you add in public/images/
  const heroUrl = "/images/eronhii-hero.png";

  return (
    <div className="eron-root">
      <style>{`
        /* Scoped styles for Eronhii component (kept inside the same file) */
        .eron-root { 
          --brand-blue: #08335a;
          --accent: #072d66;
          font-family: "Montserrat", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
          color: var(--brand-blue);
        }

        .eron-hero {
          height: 340px;
          background-image: url(${heroUrl});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }

        /* White overlapping panel */
        .eron-panel {
          max-width: 1100px;
          margin: -80px auto 60px; /* pulls the panel up to overlap hero */
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(3,51,90,0.12);
          padding: 44px 40px;
          box-sizing: border-box;
        }

        .eron-heading {
          text-align: center;
          font-size: 24px;
          font-weight: 800;
          color: var(--accent);
          margin: 0 0 18px;
          letter-spacing: 0.2px;
        }

        .eron-divider {
          height: 1px;
          background: rgba(7,45,102,0.06);
          margin: 6px auto 18px;
          max-width: 220px;
        }

        .eron-lead {
          max-width: 980px;
          margin: 0 auto;
          color: var(--brand-blue);
          font-size: 16.5px;
          line-height: 1.65;
          text-align: center;
          margin-bottom: 18px;
        }

        .eron-add {
          max-width: 980px;
          margin: 0 auto;
          color: var(--brand-blue);
          font-size: 16px;
          line-height: 1.65;
          text-align: center;
        }

        /* subtle responsive adjustments */
        @media (max-width: 900px) {
          .eron-hero { height: 220px; }
          .eron-panel { margin: -60px 16px 36px; padding: 28px 18px; }
          .eron-heading { font-size: 20px; }
          .eron-lead, .eron-add { font-size: 15px; padding: 0 6px; text-align: left; }
        }

        @media (max-width: 480px) {
          .eron-panel { margin: -48px 12px 32px; padding: 20px 12px; }
          .eron-heading { font-size: 18px; }
          .eron-lead, .eron-add { font-size: 14px; }
        }
      `}</style>

      {/* Hero image area (user should replace /images/eronhii-hero.jpg with actual image) */}
      <header className="eron-hero" role="img" aria-label="DOHWA building image" />

      {/* Content panel overlapping hero */}
      <main className="eron-panel" role="main">
        <h1 className="eron-heading">ДУХУА ИНЖЕНЕРИНГ ХК</h1>
        <div className="eron-divider" />

        <p className="eron-lead">
          DOHWA Engineering Co., LTD., is the Number 1 ranking multi-disciplinary engineering consulting firm
          in South Korea that provides Planning, Feasibility Studies, Design, Analysis, Testing, Supervision,
          Commissioning, Evaluation/Assessment, and Consulting and Training Services in all areas of Engineering
          such as the Water Supply and Wastewater Treatment, Water Resources Management, Urban Planning, Road
          Traffic, Structures, Harbor and Ports, Rail, Environmental Engineering, and more.
        </p>

        <p className="eron-add">
          DOHWA is also expanding its business to become an EPC services provider that covers not only pure
          engineering areas such as Design and Supervision but also Construction design, Procurement and supply
          of materials, Construction works, Commissioning, Permits and Licenses, etc. DOHWA is a global engineering
          company that has been first-of-its-kind in Korea and continues to exceed expectations by providing the
          best engineering services to help build a brighter future.
        </p>
      </main>
    </div>
  );
}
