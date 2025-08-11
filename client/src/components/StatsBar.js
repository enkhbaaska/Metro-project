import React from 'react';

const StatsBar = () => (
  <div className="stats-bar">
    <div className="stat">
      <span className="stat-title">Төслийн талбай</span>
      <span className="stat-value">25 км</span>
    </div>
    <div className="stat">
      <span className="stat-title">Санхүүжилт</span>
      <span className="stat-value">Олон улсын зээл, хөрөнгө оруулалт</span>
    </div>
    <div className="stat">
      <span className="stat-title">Улаанбаатарын иргэдэд</span>
      <span className="stat-value">600,000+ өдөр тутмын зорчигч</span>
    </div>
    <div className="stat">
      <span className="stat-title">Хэрэгжих хугацаа</span>
      <span className="stat-value">2025.01 - 2029.12</span>
    </div>
  </div>
);

export default StatsBar;
