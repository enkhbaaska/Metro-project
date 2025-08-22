// Vision.jsx
import React from "react";

export default function Vision() {
  const styles = `
/* Embedded styles for Vision component (keeps layout self-contained) */
.vision-section {
  max-width: 1200px;
  margin: 36px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.vision-main-title {
  text-align: center;
  font-size: 1.4rem;
  color: #072d66;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: 0.2px;
}

/* grid with three columns */
.vision-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  align-items: start;
}

/* card style */
.vision-card {
  background: #ffffff;
  border: 1px solid #e6e1e1;
  border-radius: 36px;
  padding: 28px 22px;
  min-height: 360px;
  box-shadow: 0 6px 18px rgba(3, 51, 90, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* card title */
.vision-card-title {
  color: #072d66;
  font-size: 1.05rem;
  font-weight: 800;
  margin: 0 0 12px;
  text-align: center;
}

/* card body text: compact, centered */
.vision-card-text {
  color: #12314a;
  font-size: 0.98rem;
  line-height: 1.7;
  text-align: center;
  margin: 0;
  max-width: 86%;
}

/* responsive: stack to single column on small screens */
@media (max-width: 900px) {
  .vision-grid {
    grid-template-columns: 1fr;
  }
  .vision-card {
    min-height: auto;
    padding: 20px;
  }
  .vision-card-text {
    max-width: 100%;
  }
}
`;

  return (
    <section className="vision-section" aria-labelledby="vision-heading">
      {/* Inject styles scoped to this component */}
      <style>{styles}</style>

      <div className="vision-grid" role="list">
        <article className="vision-card" role="listitem" aria-label="Зорилго">
          <h3 className="vision-card-title">Зорилго</h3>
          <p className="vision-card-text">
            • Хотын тээврийн хүртээмжийг нэмэгдүүлж, иргэдийн замд зарцуулдаг цаг,
            зардлыг бууруулна.<br />
            • Аюулгүй, найдвартай, тасралтгүй нийтийн тээврийн үйлчилгээг бий болгоно.<br />
            • Олон талт, хүртээмжтэй дэд бүтцээр иргэдийн амьдралын чанарыг сайжруулна.
          </p>
        </article>

        <article className="vision-card" role="listitem" aria-label="Алсын хараа">
          <h3 className="vision-card-title">Алсын хараа</h3>
          <p className="vision-card-text">
            • 2035 он гэхэд Улаанбаатар нь ухаалаг, ногоон, агаарт бага ялгаруулалттай тээвэр бүхий
            хот болно.<br />
            • Тогтвортой хот төлөвлөлт, хүртээмжтэй тээврийн сүлжээ нь иргэдийн өдөр тутмын амьдралыг дэмжнэ.<br />
            • Хотын хөгжлийг иргэд төвтэй, ирээдүйд чиглэсэн бодлогоор удирдана.
          </p>
        </article>

        <article className="vision-card" role="listitem" aria-label="Уриа">
          <h3 className="vision-card-title">Уриа</h3>
          <p className="vision-card-text">
            • Хүн төвтэй хот — хөдөлгөөнтэй ирээдүй.<br />
            • Ил тод, мэргэжлийн шийдвэрээр үр дүнтэй төслүүдийг хэрэгжүүлнэ.<br />
            • Байгаль орчин, иргэдийн эрх ашгийг нийцүүлсэн хөгжлийг эрхэмлэнэ.
          </p>
        </article>
      </div>
    </section>
  );
}
