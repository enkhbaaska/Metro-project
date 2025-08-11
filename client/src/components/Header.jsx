// client/src/components/Header.jsx
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-top">
        <Link to="/" className="brand">
          <img src="/ubmetrologo.png" alt="Logo" />
          <img src="/ubmetro2.png" alt="Logo" />
          <img src="/dohwa.svg" alt="Logo" />
          <span>UB Metro Project</span>
        </Link>
        <nav className="main-nav">
          <NavLink to="/" end>Нүүр</NavLink>
          <NavLink to="/news">Мэдээ</NavLink>
          <NavLink to="/planning">Төлөвлөгөө</NavLink>
          <NavLink to="/about">Танилцуулга</NavLink>
          <NavLink to="/contact">Холбогдох</NavLink>
        </nav>
      </div>
    </header>
  );
}
