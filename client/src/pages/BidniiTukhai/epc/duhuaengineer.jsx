// ./pages/BidniiTukhai/epc/EPC.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function EpcDuhua() {
  return (
    <div className="epc-layout">
      <h1>Төслийн бүтээн байгуулалтын ажлыг гүйцэтгэгч (EPC)</h1>
      <Outlet />
    </div>
  );
}
