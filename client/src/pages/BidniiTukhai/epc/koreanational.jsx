// ./pages/BidniiTukhai/epc/EPC.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function EpcKoreaNT() {
  return (
    <div className="epc-layout">
      <div className="epc-hero">
        {/* Replace the src below with your image path when you add the image */}
        <img
          className="epc-image"
          src="/images/nationalrail.jpg"
          alt="Korea National Railway"
        />

        <h2 className="epc-title">КОРЕА НЭЙШНЛ РЭЙЛВЭЙ</h2>

        <div className="epc-text">
          <p>
            Солонгос Улсын үндэсний төмөр замын туршлага, дэд бүтцийн технологи,
            техникийн зөвлөгөө, болон сургалтын туслалцааг нэвтрүүлэхэд чиглэсэн
            хамтын ажиллагаа.
          </p>

          <p>
            Энэхүү төсөл нь хотын тээврийн хүртээмжийг нэмэгдүүлж, аюулгүй, үр
            ашигтай, тогтвортой зорчигч тээврийг бий болгохыг зорьж байна.
          </p>
        </div>
      </div>

      {/* Child routes (if any) will render here */}
      <Outlet />

      <style>{`
        .epc-layout {
          font-family: "Helvetica Neue", Arial, sans-serif;
          color: #0d2b5a;
          background: #fff;
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .epc-hero {
          width: 100%;
          max-width: 1200px;
          margin: 48px auto;
          padding: 48px 24px;
          text-align: center;
        }

        /* Larger default image size */
        .epc-image {
          display: block;
          width: 360px;
          height: 360px;
          object-fit: contain;
          margin: 0 auto 32px;
        }

        /* Medium screens: slightly larger */
        @media (min-width: 900px) {
          .epc-image {
            width: 420px;
            height: 420px;
            margin-bottom: 36px;
          }
        }

        /* Very large screens: make it even bigger */
        @media (min-width: 1400px) {
          .epc-image {
            width: 520px;
            height: 520px;
            margin-bottom: 40px;
          }
        }

        .epc-title {
          margin: 0 0 18px;
          font-size: 22px;
          letter-spacing: 1px;
          font-weight: 800;
          color: #06214a;
        }

        .epc-text {
          color: #16335a;
          font-size: 16px;
          line-height: 1.8;
          max-width: 900px;
          margin: 0 auto;
        }

        .epc-text p {
          margin: 0 0 12px;
        }

        /* small screens: keep layout tidy */
        @media (max-width: 600px) {
          .epc-hero {
            padding: 28px 16px;
          }
          .epc-image {
            width: 240px;
            height: 240px;
          }
          .epc-title {
            font-size: 18px;
          }
          .epc-text {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
