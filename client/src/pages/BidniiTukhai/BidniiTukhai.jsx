// client/src/pages/BidniiTukhai/BidniiTukhai.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import "./BidniiTukhai.css";

/**
 * Simplified parent layout for the "Бидний тухай" section.
 * - No internal state or tab buttons here.
 * - Header (dropdown) or other links should navigate to /about/organization, /about/vision, etc.
 * - The matching child route component will render inside <Outlet />.
 */
export default function BidniiTukhai() {
  return (
    <div className="bidnii-wrapper">
      {/* Left column: static title / short intro */}
      <aside className="bidnii-left">
        <div className="bidnii-title">БИДНИЙ ТУХАЙ</div>

        <div className="bidnii-intro">
          <p style={{ margin: 0, fontWeight: 600 }}>
            Менежмент, зорилго болон төслийн талаархи товч мэдээлэл.
          </p>
          <p style={{ marginTop: 8, fontSize: "0.95rem", color: "#e6f0ff" }}>
            Баруун талын хэсэгт холбогдох хуудас нь дэлгэнэ. Дээд навигацийн "Бидний тухай" бүрт холбоосууд байрлана.
          </p>
        </div>
      </aside>

      {/* Right column: nested route content */}
      <main className="bidnii-content" role="main">
        <div className="bidnii-panel">
          {/* The routed child (Organization, Vision, Message, etc.) will render here */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
