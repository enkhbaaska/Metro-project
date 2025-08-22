// Message.jsx
import React from "react";

export default function Message() {
  const styles = `
.message-section {
  max-width: 1150px;
  margin: 28px auto;
  padding: 0 20px;
  box-sizing: border-box;
  text-align: center;
}

.message-title {
  font-size: 1.6rem;
  color: #072d66;
  font-weight: 800;
  margin-bottom: 26px;
  letter-spacing: 0.4px;
}

/* two-column layout */
.message-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  align-items: start;
}

/* each card */
.message-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* rounded image */
.message-card img {
  width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(3,51,90,0.08);
  margin-bottom: 18px;
}

/* greeting text */
.message-text {
  font-style: italic;
  color: #12314a;
  line-height: 1.7;
  max-width: 360px;
  text-align: left;
  margin-bottom: 18px;
}

/* name + title */
.person-name {
  margin-top: 6px;
  color: #072d66;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.person-title {
  color: #08335a;
  font-weight: 700;
  font-size: 0.92rem;
  margin-top: 6px;
}

/* responsive: stack on narrow screens */
@media (max-width: 880px) {
  .message-grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .message-card img {
    width: 100%;
    max-width: 520px;
    height: auto;
    aspect-ratio: 1/1;
  }
  .message-text { max-width: 100%; text-align: left; }
}
`;

  return (
    <section className="message-section" aria-labelledby="message-heading">
      <style>{styles}</style>

      <h2 id="message-heading" className="message-title">Захирлын мэндчилгээ</h2>

      <div className="message-grid">
        <article className="message-card" aria-label="Захирал 1">
          {/* replace src with your image */}
          <img src="/images/director-1.png" alt="Э. Түвшинжаргал" />

          <p className="message-text">
            Эрхэм хүндэт иргэд, хамтрагч байгууллагууд аа — <br />
            Бид хотын амьдралын чанарыг дээшлүүлэх, иргэдийн зорчих нөхцөлийг сайжруулах
            томоохон төслүүдийг мэргэжлийн өндөр түвшинд, ил тод хэрэгжүүлэхийг эрхэмлэдэг.
            Та бүхний оролцоо, санал зөвлөмж бидэнд үнэ цэнэтэй бөгөөд хамтран ажиллахыг урьж байна.
          </p>

          <div className="person-name">Э. Түвшинжаргал</div>
          <div className="person-title">НТУГ ОНТУГ ЗАХИРАЛ</div>
        </article>

        <article className="message-card" aria-label="Захирал 2">
          {/* replace src with your image */}
          <img src="/images/director-2.png" alt="Т. Мөнхдалай" />

          <p className="message-text">
            Бид төслийн бүх шатанд техник, чанар, аюулгүй байдлыг нэн тэргүүнд тавин,
            олон улсын стандарт, шилдэг туршлагыг нутагшуулж ажиллана. Иргэдийн аюулгүй
            ба тав тухтай зорчих нөхцөлийг бүрдүүлэхийн төлөө тууштай ажиллах болно.
          </p>

          <div className="person-name">Т. Мөнхдалай</div>
          <div className="person-title">УБ МЕТРО ТӨСЛИЙН ЗАХИРАЛ</div>
        </article>
      </div>
    </section>
  );
}
