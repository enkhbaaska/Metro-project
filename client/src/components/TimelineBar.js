import React from 'react';

const TimelineBar = () => (
  <div className="timeline-bar">
    <span>1 жил 11 сар 5 хоног 12:00:00</span>
    <div className="timeline-track">
      <div className="timeline-progress" style={{ width: '22%' }} />
    </div>
    <span className="timeline-percent">(ХУГАЦАА 22.0%)</span>
  </div>
);

export default TimelineBar;
