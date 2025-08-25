// ./pages/BidniiTukhai/epc/EPC.jsx
import React from "react";
import { Outlet } from "react-router-dom";

/**
 * EpcSuson component — big centered image, title and descriptive text.
 * Replace the image src below with the real image you will add.
 */
export default function EpcSuson() {
  return (
    <div className="epc-layout">
      <main className="epc-hero" role="main" aria-labelledby="epc-title">
        {/* Replace this src with your image path when you add the image */}
        <img
          className="epc-image"
          src="/images/suson-placeholder.png"
          alt="Сусон Инженеринг ХХК логo / төсөл зураг"
        />

        <h2 id="epc-title" className="epc-title">
          СУСОН ИНЖЕНЕРИНГ ХХК
        </h2>

        <div className="epc-text">
          <p>
            Сусон Инженеринг ХХК нь дэд бүтэц, төмөр зам, нийтийн тээвэрт чиглэсэн
            техник үйлчилгээ, инженерийн төсөл хэрэгжүүлэлтээр мэргэшсэн компани
            юм. Бид төслийн зохицуулалт, чанарын хяналт, техникийн зөвлөх үйлчилгээг
            олон улсын стандартын дагуу нийлүүлдэг.
          </p>

          <p>
            Манай зорилго нь хотын тээврийг аюулгүй, найдвартай, үр ашигтай болгох
            инженерийн шийдлүүдийг нийлүүлэхэд оршино. Түнш байгууллагуудтайгаа
            хамтран дэд бүтцийн тогтвортой хөгжлийг дэмжин ажиллана.
          </p>
        </div>
      </main>

      {/* render any nested child routes here */}
      <Outlet />

      {/* Embedded styles for quick drop-in */}
      <style>{`
        /* reset potential browser margins that create unwanted whitespace */
        html, body {
          margin: 0;
          padding: 0;
        }

        .epc-layout {
          font-family: "Helvetica Neue", Arial, sans-serif;
          color: #07224a; /* deep navy */
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .epc-hero {
          width: 100%;
          max-width: 1200px;
          /* small top margin so the hero sits nicely under the header bar */
          margin: 28px auto 40px;
          padding: 8px 20px;
          text-align: center;
        }

        /* Responsive image sizing:
           - uses clamp so it increases on larger screens but stays reasonable
           - height:auto preserves aspect ratio
        */
        .epc-image {
          display: block;
          width: clamp(220px, 36vw, 560px);
          height: auto;
          object-fit: contain;
          margin: 0 auto 26px;
        }

        .epc-title {
          margin: 0 0 20px;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.6px;
          color: #07224a;
        }

        .epc-text {
          color: #143a66;
          font-size: 16px;
          line-height: 1.9;
          max-width: 900px;
          margin: 0 auto;
        }

        .epc-text p {
          margin: 0 0 12px;
        }

        /* Mobile adjustments */
        @media (max-width: 680px) {
          .epc-hero { margin: 18px auto 28px; padding: 6px 12px; }
          .epc-image { width: 68vw; margin-bottom: 18px; }
          .epc-title { font-size: 18px; }
          .epc-text { font-size: 15px; line-height: 1.7; padding: 0 4px; }
        }

        /* If you prefer the image larger on very wide screens, tweak the clamp upper bound */
        @media (min-width: 1400px) {
          .epc-image { width: clamp(320px, 34vw, 720px); }
        }
      `}</style>
    </div>
  );
}
