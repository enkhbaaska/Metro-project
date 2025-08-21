// client/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import "./Home.css";
import BackgroundHero from "../components/BackgroundHero";
import ServiceCard from "../components/ServiceCard";
import NewsCard from "../components/NewsCard";

const API_BASE =
  (process.env.REACT_APP_API_URL || "http://localhost:3001") + "/api";

export default function Home({ serverMsg }) {
  const [news, setNews] = useState([]);
  const [ann, setAnn] = useState([]);

  useEffect(() => {
    // demo content
    setNews([
      { id: 1, title: "Шинэ замын ажил эхэллээ", date: "2025-08-10", image: "/placeholder.jpg", excerpt: "Хотын зүүн хэсэгт..." },
      { id: 2, title: "Метроны зураг төсөл", date: "2025-08-07", image: "/placeholder.jpg", excerpt: "Судалгаа, төлөвлөлт..." },
      { id: 3, title: "Төмөр замын шинэ загвар", date: "2025-06-08", image: "/placeholder.jpg", excerpt: "Шинэ дизайн..." },
      { id: 4, title: "Орон нутгийн уулзалт", date: "2025-05-31", image: "/placeholder.jpg", excerpt: "Иргэдийн оролцоо..." }
    ]);
    setAnn([
      { id: 1, title: "Цахим уулзалт", date: "2025-08-12" },
      { id: 2, title: "Зам хаалт", date: "2025-08-14" },
    ]);
  }, []);

  // BackgroundHero video sources (mp4 + optional webm fallback)
  const videoSources = [
    { src: "/videos/hero-2.mp4", type: "video/mp4" },
    // { src: "/videos/hero-2.webm", type: "video/webm" }, // optional fallback
  ];

  const services = [
    { title: "Иргэдийн санал", icon: "/icons/feedback.svg", href: "/contact" },
    { title: "Төлөвлөгөө", icon: "/icons/plan.svg", href: "/planning" },
    { title: "Мэдээ", icon: "/icons/news.svg", href: "/news" },
    { title: "Газрын зураг", icon: "/icons/map.svg", href: "#" },
  ];

  return (
    <>
      {/* Background hero (Meta-style) */}
      <BackgroundHero
        sources={videoSources}
        poster="/images/hero-1.jpg"
        title="Хотын хөгжилд хамтдаа"
      />

      {/* SERVICES */}
      <section className="container section">
        <h2 className="section-title">Үйлчилгээ</h2>
        <div className="services-grid">
          {services.map((s, idx) => <ServiceCard key={idx} {...s} />)}
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="container section">
        <div className="section-head">
          <h2 className="section-title">Зарлал</h2>
          <a href="#" className="see-all">Бүгдийг харах</a>
        </div>
        <ul className="ann-list">
          {ann.map(a => (
            <li key={a.id}>
              <span className="ann-date">{a.date}</span>
              <span className="ann-title">{a.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/** FEATURED CENTER + STATS RIGHT (left menu removed) */}
      <section className="container section featured-stats">
        <div className="featured-list">
          {/* replicate 4 stacked card look, word-for-word text comes from your image */}
          {news.slice(0,4).map((n) => (
            <article className="featured-card" key={n.id}>
              <figure className="featured-thumb">
                <img src={n.image} alt={n.title} />
              </figure>
              <div className="featured-body">
                <h4 className="featured-title">{n.title}</h4>
                <p className="featured-excerpt">{n.excerpt}</p>
                <div className="featured-meta">{n.date}</div>
              </div>
            </article>
          ))}
        </div>

        <aside className="stats-column" aria-label="Төслийн статистик">
          <div className="stat-block">
            <div className="stat-label">Техник, эдийн засгийн үнэлгээ (ТЭЗҮ)</div>
            <div className="stat-value">100%</div>
          </div>

          <div className="stat-block">
            <div className="stat-label">Төсөлтийн э х загвар зураг</div>
            <div className="stat-value">100%</div>
          </div>

          <div className="stat-block">
            <div className="stat-label">БОННҮ Тайлан</div>
            <div className="stat-value">28.5%</div>
          </div>

          <div className="stat-block">
            <div className="stat-label">Төслийн явц</div>
            <div className="stat-value">12%</div>
          </div>

          <div className="stat-side-caption">
            17,200 зорчигч/цаг • 560,000 зорчигч/өдөр (жишээ)
          </div>
        </aside>
      </section>

      {/* News */}
      <section className="container section">
        <div className="section-head">
          <h2 className="section-title">Мэдээ мэдээлэл</h2>
          <a href="/news" className="see-all">Бүгдийг харах</a>
        </div>
        <div className="news-grid">
          {news.map(n => <NewsCard key={n.id} {...n} />)}
        </div>
      </section>
    </>
  );
}
