import React from "react";
import { Outlet } from "react-router-dom";
import "./BidniiTukhai.css";

/**
 * Layout for the "Бидний тухай" section.
 * Shows a page title and renders child routes inside <Outlet />.
 */
export default function BidniiTukhai() {
  return (
    <div className="bidnii-wrapper">
      {/* Page title (full width) */}

      {/* Panel that child routes render into */}
      <div className="bidnii-panel">
        <Outlet />
      </div>
    </div>
  );
}
