// client/src/components/NewsCard.jsx
import { Link } from "react-router-dom";
export default function NewsCard({ id, title, date, image, excerpt }) {
  return (
    <article className="news-card">
      {image && <img src={image} alt="" />}
      <div className="news-card-body">
        <h4><Link to={`/news/${id || ""}`}>{title}</Link></h4>
        <small>{date}</small>
        {excerpt && <p>{excerpt}</p>}
      </div>
    </article>
  );
}
