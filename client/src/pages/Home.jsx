// client/src/pages/Home.jsx
import { useEffect, useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import ServiceCard from "../components/ServiceCard";
import NewsCard from "../components/NewsCard";

const API_BASE =
  (process.env.REACT_APP_API_URL || "http://localhost:3001") + "/api";

export default function Home({ serverMsg }) {
  const [news, setNews] = useState([]);
  const [ann, setAnn] = useState([]);

  useEffect(() => {
    // TODO: replace with your real endpoints
    // fetch(`${API_BASE}/news`).then(r=>r.json()).then(setNews);
    // fetch(`${API_BASE}/announcements`).then(r=>r.json()).then(setAnn);

    // Temporary demo data:
    setNews([
      { id: 1, title: "Шинэ замын ажил эхэллээ", date: "2025-08-10", image: "/placeholder.jpg", excerpt: "Хотын зүүн хэсэгт..." },
      { id: 2, title: "Метроны зураг төсөл", date: "2025-08-07", image: "/placeholder.jpg", excerpt: "Судалгаа, төлөвлөлт..." },
    ]);
    setAnn([
      { id: 1, title: "Цахим уулзалт", date: "2025-08-12" },
      { id: 2, title: "Зам хаалт", date: "2025-08-14" },
    ]);
  }, []);

  const slides = [
  { image: "/images/hero-1.jpg", title: "Хотын хөгжилд хамтдаа" },
  { image: "/videos/hero-2.mp4", title: "Дэд бүтэц, төлөвлөлт" }
];


  const services = [
    { title: "Иргэдийн санал", icon: "/icons/feedback.svg", href: "/contact" },
    { title: "Төлөвлөгөө", icon: "/icons/plan.svg", href: "/planning" },
    { title: "Мэдээ", icon: "/icons/news.svg", href: "/news" },
    { title: "Газрын зураг", icon: "/icons/map.svg", href: "#" },
  ];

  return (
    <>
      {/* Hero */}
      <HeroCarousel slides={slides} />

      {/* Services/quick links */}
      <section className="container section">
        <h2 className="section-title">Үйлчилгээ</h2>
        <div className="services-grid">
          {services.map((s, idx) => (
            <ServiceCard key={idx} {...s} />
          ))}
        </div>
      </section>

      {/* Announcements */}
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
