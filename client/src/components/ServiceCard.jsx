// client/src/components/ServiceCard.jsx
export default function ServiceCard({ title, icon, href = "#" }) {
  return (
    <a className="service-card" href={href}>
      {icon && <img src={icon} alt="" />}
      <span>{title}</span>
    </a>
  );
}

