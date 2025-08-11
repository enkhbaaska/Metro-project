// client/src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>UB Metro Project</h4>
          <p>Хотын бүтээн байгуулалтын талаарх мэдээллийн төв.</p>
        </div>
        <div>
          <h4>Холбоо барих</h4>
          <p>info@ubmetroproject.com</p>
          <p>+976 (xx) xxx-xxxx</p>
        </div>
        <div>
          <h4>Холбоос</h4>
          <ul>
            <li><a href="/news">Мэдээ</a></li>
            <li><a href="/planning">Төлөвлөгөө</a></li>
            <li><a href="/contact">Холбогдох</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} UB Metro Project</div>
    </footer>
  );
}
