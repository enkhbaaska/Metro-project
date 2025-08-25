// ./pages/BidniiTukhai/epc/EPC.jsx
import React from "react";
import { Outlet } from "react-router-dom";

/**
 * EpcKtz page
 *
 * Props:
 *  - imageSrc (string) optional: path to an image you will add to the project.
 *
 * Example:
 *  <EpcKtz imageSrc="/assets/ktz-logo.png" />
 */
export default function EpcKtz({ imageSrc }) {
  const heroUrl = "/images/eronhii-hero.png";

  // A simple inline SVG fallback that matches the "image placeholder" look in your screenshot.

  const styles = `
    /* EpcKtz page (inline styles) */
    .epc-ktz-page {
      padding: 40px 18px;
      background: #ffffff;
      color: #0b2b5a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
        Arial, "Noto Sans", "Liberation Sans", sans-serif;
    }

    .epc-ktz-container {
      max-width: 980px;
      margin: 0 auto;
      text-align: center;
      padding-top: 8px;
    }

    .epc-ktz-figure {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px 0 18px;
    }

    .epc-ktz-figure img,
    .epc-ktz-figure svg {
      width: 220px;
      height: 220px;
      display: block;
    }

    .epc-ktz-title {
      margin-top: 8px;
      color: #0b2b5a;
      font-weight: 800;
      font-size: 22px;
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }

    .epc-ktz-desc {
      margin: 18px auto 12px;
      color: #15355f;
      font-size: 16px;
      line-height: 1.7;
      max-width: 820px;
      font-weight: 500;
      padding: 0 12px;
      text-align: left;
    }

    .epc-ktz-desc p {
      margin: 0 0 12px 0;
    }

    .epc-ktz-link {
      display: inline-block;
      margin-top: 6px;
      color: #0b3a78;
      font-weight: 700;
      text-decoration: none;
      font-size: 15px;
    }

    @media (max-width: 720px) {
      .epc-ktz-figure img,
      .epc-ktz-figure svg {
        width: 160px;
        height: 160px;
      }
      .epc-ktz-title {
        font-size: 18px;
      }
      .epc-ktz-desc {
        font-size: 15px;
        text-align: left;
      }
    }
  `;

  return (
    <div className="epc-ktz-page" role="region" aria-label="EPC - Солонгос Төмөр Зам">
      <style>{styles}</style>

      <div className="epc-ktz-container">

        <h2 className="epc-ktz-title">СОЛОНГОС ТӨМӨР ЗАМ ТӨХК</h2>

        <div className="epc-ktz-desc">
          <p>
            Солонгос Төмөр Зам ТӨХК нь төмөр замын дэд бүтэц, зам барилга,
            систем интеграц, техникийн үйл ажиллагаа, болон засвар үйлчилгээнд мэргэшсэн олон
            улсын түвшний компанид тооцогддог. Тус компани нь аюулгүй байдал, найдвартай ажиллагаа,
            болон хугацаа баримтлалыг хангах дээр онцгой анхаардаг.
          </p>

        </div>

        {/* Keep Outlet so nested child routes still render under this layout */}
        <div style={{ marginTop: 28 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
