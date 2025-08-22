// PMC.jsx
import React from "react";

export default function PMC() {
  const styles = `
/* PMC component styles (embedded) */
.pmc-section {
  max-width: 1200px;
  margin: 28px auto;
  padding: 0 20px;
  box-sizing: border-box;
  color: #12314a;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.pmc-title {
  text-align: center;
  color: #072d66;
  font-weight: 800;
  font-size: 1.45rem;
  margin-bottom: 6px;
}

.pmc-subtitle {
  text-align: center;
  color: #072d66;
  font-weight: 700;
  margin-bottom: 22px;
  opacity: 0.95;
}

/* two-column layout: text left, image right */
.pmc-grid {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 28px;
  align-items: start;
  align-content: start;
}

/* text area */
.pmc-text {
  color: #12314a;
  line-height: 1.85;
  font-size: 0.98rem;
}

/* make paragraphs spaced and readable */
.pmc-text p {
  margin-bottom: 18px;
  text-align: left;
}

/* image container and style */
.pmc-image {
  width: 100%;
  max-width: 420px;
  display: block;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(3,51,90,0.08);
  margin-left: auto;
}
.pmc-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* small-screen: stack, image below text */
@media (max-width: 900px) {
  .pmc-grid {
    grid-template-columns: 1fr;
  }
  .pmc-image {
    max-width: 100%;
    margin: 12px 0 0 0;
  }
  .pmc-text p { font-size: 1rem; }
}
`;

  return (
    <section className="pmc-section" aria-labelledby="pmc-heading">
      <style>{styles}</style>

      <h2 id="pmc-heading" className="pmc-title">Төслийн менежментийн Зөвлөх (PMC)</h2>
      <div className="pmc-subtitle">Ерөнхий мэдээлэл</div>

      <div className="pmc-grid">
        <div className="pmc-text" role="article" aria-label="PMC ерөнхий мэдээлэл">
          <p>
            Улаанбаатар Метро төслийн хүрээнд Төслийн менежментийн зөвлөх үйлчилгээг Бүгд Найрамдах
            Солонгос Улсын тэргүүлэх Духуа Инженеринг ХК-иар удирдуулсан түншлэл үзүүлж байна.
          </p>

          <p>
            2024 оны 02 дугаар сарын 29-ний өдөр олон нийтэд нээлттэйгээр НХААГ/20240103208 дугаартай
            тендерийг Төрийн худалдан авах ажиллагааны цахим системд зарласан.
          </p>

          <p>
            2024 оны 07 дугаар сарын 05-ний өдөр шалгарсан Духуа Инженеринг ХК болон түншлэлтэй Төслийн
            менежментийн зөвлөх үйлчилгээний гэрээг үзэглэсэн.
          </p>

          <p>
            Энэхүү гэрээ нь Улаанбаатар Метро төсөл хэрэгжиж дуустал хүчинтэй бөгөөд тус хугацаанд
            Зөвлөхүүд нь бүхий л чиглэлийн мэргэжил, арга зүйгээр ханган ажиллах юм.
          </p>
        </div>

        {/* Right-side image: replace src with your image path */}
        <div className="pmc-image" aria-hidden="true">
          <img src="/images/pmc-right.png" alt="PMC signing / partnership" />
        </div>
      </div>

      <div className="pmc-grid">
        {/* LEFT: image (replace src with your image) */}
        <div className="pmc-image" aria-hidden="true">
          <img src="/images/pmc-left.png" alt="Төслийн менежментийн гэрээний ёслол" />
        </div>

        {/* RIGHT: link + meaningful text */}
        <div className="pmc-right">
          <a
            className="pmc-link"
            href="https://www.tender.gov.mn/mn/invitation/detail/1708914096703"
            target="_blank"
            rel="noreferrer"
            aria-label="Tender details"
          >
            https://www.tender.gov.mn/mn/invitation/detail/1708914096703
          </a>

          <div className="pmc-text" role="article" aria-label="PMC ерөнхий мэдээлэл">
            <p>
              Улаанбаатар Метро төслийн хүрээнд Төслийн менежментийн зөвлөх үйлчилгээг Бүгд Найрамдах
              Солонгос Улсын тэргүүлэх Духуа Инженеринг ХХК болон түншлэлийн хамтран гүйцэтгэгчид
              удирдан гүйцэтгэж байна. Зөвлөхүүд нь төслийн төлөвлөлт, гүйцэтгэл, чанар, аюулгүй байдлыг хангах
              үндсэн үүргийг хүлээн ажиллана.
            </p>

            <p>
              2024 оны 02 дугаар сарын 29-ний өдөр Төрийн худалдан авах ажиллагааны цахим системээр НХААГ/20240103208
              дугаартай тендер зарлагдсан бөгөөд шаардлага хангасан шалгарсан багийг 2024-07-05-нд гэрээ байгуулан
              томилсон.
            </p>

            <p>
              Төслийн менежментийн зөвлөхийн хүрээнд гүйцэтгэлийн хяналт, гэрээний удирдлага, эрсдэл удирдлага,
              чанарын баталгаажуулалт, хуваарь болон төсвийн хяналт, худалдан авалтын зөвлөмж зэрэг өргөн цар хүрээтэй
              үйлчилгээг үзүүлнэ.
            </p>

            <ul className="pmc-list">
              <li>Төлөвлөлт ба барилга угсралтын үе шат бүрийн техникийн хяналт;</li>
              <li>Төсөл төлөвлөгөөний хэрэгжилт, хугацаа, төсвийн хяналт;</li>
              <li>Худалдан авалтын үйл явцыг удирдан зохион байгуулахад зөвлөх үйлчилгээ;</li>
              <li>Үр дүнгийн хяналт, тайлан бэлтгэх болон олон талт зохицуулалт хийх.</li>
            </ul>

            <div className="pmc-outcome">
              Энэхүү гэрээ нь Улаанбаатар Метро төсөл амжилттай хэрэгжиж дуусах хүртэл хүчинтэй бөгөөд
              зөвлөхүүд нь төслийн чанар, аюулгүй байдал, ил тод байдлыг хангах замаар иргэдэд хүртээмжтэй,
              үр ашигтай дэд бүтцийг цаг хугацаанд нь нийлүүлэхэд гол үүрэг гүйцэтгэнэ.
            </div>
          </div>
        </div>
        </div>
    </section>
  );
}
