import React from 'react';
import StatsBar from './StatsBar';
import TimelineBar from './TimelineBar';
import metroBg from '../assets/metro-bg.jpg'; // your background image

const HeroSection = () => (
  <div className="hero-section" style={{ backgroundImage: `url(${metroBg})` }}>
    <div className="overlay" />
    <div className="hero-content">
      <TimelineBar />
      <h1>УЛААНБААТАР МЕТРО</h1>
      <p>
        Хотын түгжрэлийг бууруулах, иргэдийн хөдөлгөөний хурдыг нэмэгдүүлэх Улаанбаатарын метро төсөл.
      </p>
      <StatsBar />
      <div className="scroll-down">&#8595;</div>
    </div>
  </div>
);

export default HeroSection;
