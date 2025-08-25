// ./pages/UbMetroTusul/UbMetroTusul.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

/**
 * UbMetroTusul - layout + sidebar combined in one file with embedded CSS.
 * Paste this file into ./pages/UbMetroTusul/UbMetroTusul.jsx
 */
export default function UbMetroTusul() {
  const items = [
    { to: "project-info", label: "Төслийн мэдээлэл" },
    { to: "progress", label: "Төслийн явц" },
    { to: "feasibility", label: "Техник, эдийн засгийн үндэслэл (ТЭЗҮ)" },
    { to: "master-plan", label: "Эх загвар зураг" },
    { to: "financing", label: "Төслийн санхүүжилт" },
    { to: "benefits", label: "Төслийн үр өгөөж" },
    { to: "legal", label: "Хууль, эрх зүйн орчин" },
  ];

  return (
    <div className="ub-layout">
      <aside className="ub-sidebar" aria-label="UB Metro navigation">
        <nav>
          <ul>
            {items.map((it) => (
              <li key={it.to}>
                <NavLink
                  to={it.to}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="ub-content" role="main">
        {/* Child routes will render here */}
        <Outlet />
      </main>

      {/* Embedded CSS */}
      <style>{`
        /* Basic two-column layout for the UB METRO section. Tweak to match your site's design. */

        :root {
          --sidebar-bg: #cfe0f8;
          --text-color: #07224a;
          --divider: rgba(0,0,0,0.08);
          --active-accent: #0d47a1;
        }

        .ub-layout {
          display: flex;
          gap: 24px;
          width: 100%;
          box-sizing: border-box;
          padding: 12px 20px;
          align-items: flex-start;
        }

        .ub-sidebar {
          width: 220px;
          background: var(--sidebar-bg);
          padding: 18px 12px;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .ub-sidebar nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .ub-sidebar nav li {
          border-bottom: 1px solid var(--divider);
          padding: 16px 0;
          text-align: center;
        }

        .sidebar-link {
          color: var(--text-color);
          font-weight: 700;
          text-decoration: none;
          display: block;
        }

        .sidebar-link.active {
          color: var(--active-accent);
        }

        .ub-content {
          flex: 1 1 auto;
          min-height: 320px;
          padding: 6px 20px;
          box-sizing: border-box;
        }

        /* Responsive */
        @media (max-width: 880px) {
          .ub-layout { flex-direction: column; }
          .ub-sidebar { width: 100%; }
        }

        /* small accessibility/touch improvements */
        .sidebar-link:focus {
          outline: 3px solid rgba(13,71,161,0.15);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
