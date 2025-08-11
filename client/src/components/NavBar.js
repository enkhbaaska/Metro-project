import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar">
    <div className="logo">UB METRO</div>
    <ul>
      <li><Link to="/">Нүүр</Link></li>
      <li><Link to="/about">Төсөл Тухай</Link></li>
      <li><Link to="/planning">Төлөвлөлт</Link></li>
      <li><Link to="/news">Мэдээ</Link></li>
      <li><Link to="/contact">Холбоо барих</Link></li>
    </ul>
  </nav>
);

export default NavBar;
