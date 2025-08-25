// src/pages/BidniiTukhai/epc/EpcDuhua.jsx
import React from "react";

/**
 * EpcDuhua page component (self-contained CSS inside the JSX)
 *
 * Props:
 *  - imageSrc (string): path or import for the image you'll add
 *
 * Example usage:
 *  import EpcDuhua from "./epc/EpcDuhua";
 *  <EpcDuhua imageSrc="/assets/dohwa.png" />
 */
export default function EpcDuhua({ imageSrc }) {
  const src = imageSrc || "/images/duhuaimage.png";

  const css = `
  /* Scoped-ish styles for EpcDuhua */
  .epc-duhua-page {
    padding: 36px 18px;
    background: #ffffff;
    color: #0b2b5a;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, "Noto Sans", "Liberation Sans", sans-serif;
  }

  .epc-duhua-container {
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
  }

  .epc-duhua-title {
    color: #0b2b5a;
    font-size: 34px;
    font-weight: 800;
    margin: 6px 0 18px 0;
    letter-spacing: 0.6px;
  }

  .epc-duhua-subtitle {
    color: #15355f;
    font-size: 18px;
    line-height: 1.6;
    max-width: 960px;
    margin: 0 auto 28px auto;
    font-weight: 600;
    padding: 0 10px;
  }

  .epc-duhua-image-panel {
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
  }

  .epc-duhua-image-card {
    background: #f5f9fb;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 10px 24px rgba(13, 40, 75, 0.06);
    max-width: 760px;
    width: 100%;
    display: block;
  }

  .epc-duhua-image-card img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 4px;
  }

  .epc-duhua-link {
    display: inline-block;
    margin-top: 8px;
    color: #123a78;
    font-weight: 700;
    text-decoration: none;
    font-size: 16px;
  }

  .epc-duhua-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 640px) {
    .epc-duhua-title {
      font-size: 24px;
    }
    .epc-duhua-subtitle {
      font-size: 15px;
      padding: 0 8px;
    }
    .epc-duhua-image-card {
      padding: 12px;
    }
  }
  `;

  return (
    <div className="epc-duhua-page">
      {/* Inject component-scoped CSS */}
      <style>{css}</style>

      <div className="epc-duhua-container">
        <h1 className="epc-duhua-title">ДУХУА ИНЖЕНЕРИНГ ХК</h1>

        <p className="epc-duhua-subtitle">
          Consulting and Training Services in all areas of Engineering such as the Water Supply and
          Wastewater Treatment, Water Resources Management, Urban Planning, Road Traffic, Structures,
          Harbor and Ports, Rail, Environmental Engineering, etc.
        </p>

        <div className="epc-duhua-image-panel" aria-hidden={false}>
          <div className="epc-duhua-image-card">
            {/* Replace src prop or the fallback with your actual image path */}
            <img src={src} alt="Dohwa charts and diagrams" />
          </div>
        </div>

        <a
          className="epc-duhua-link"
          href="https://www.dohwa.co.kr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.dohwa.co.kr/
        </a>
      </div>
    </div>
  );
}
