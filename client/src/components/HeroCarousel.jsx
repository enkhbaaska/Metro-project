// client/src/components/HeroCarousel.jsx
import React, { useEffect, useRef, useState } from "react";
import "./HeroCarousel.css";

export default function HeroCarousel({ slides = [], autoPlay = true, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);

  // protect against undefined / non-array
  const items = Array.isArray(slides) ? slides : [];

  // auto-advance
  useEffect(() => {
    mountedRef.current = true;
    if (!autoPlay || paused || items.length <= 1) return;

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
      mountedRef.current = false;
    };
  }, [autoPlay, paused, interval, items.length]);

  // ensure index valid when slides change
  useEffect(() => {
    if (index >= items.length && items.length > 0) {
      setIndex(0);
    }
  }, [items.length, index]);

  // manual nav
  const go = (to) => {
    if (items.length === 0) return;
    if (to < 0) to = items.length - 1;
    if (to >= items.length) to = 0;
    setIndex(to);
  };

  // ensure only active video is playing (helps with resources)
  useEffect(() => {
    // pause all videos except active
    const container = document.querySelector(".hero-carousel");
    if (!container) return;
    const videos = container.querySelectorAll("video");
    videos.forEach((v, i) => {
      try {
        if (i === index) {
          // ensure muted so autoplay allowed
          v.muted = true;
          // play active (some browsers require user gesture for play with sound; muted is set)
          const playPromise = v.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
              /* ignore autoplay error */
            });
          }
        } else {
          if (!v.paused) v.pause();
        }
      } catch (e) {
        // ignore cross-browser video controls errors
      }
    });
  }, [index, items.length]);

  if (items.length === 0) {
    return null; // nothing to show
  }

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Hero carousel"
    >
      <div className="hc-slides" role="group">
        {items.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              className={`hc-slide ${active ? "active" : ""}`}
              aria-hidden={!active}
              tabIndex={active ? 0 : -1}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
            >
              {s.video ? (
                <video
                  className="hc-media"
                  src={s.video}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
              ) : (
                <img className="hc-media" src={s.image} alt={s.title || `Slide ${i + 1}`} />
              )}

              {s.title && <div className="hc-caption">{s.title}</div>}
            </div>
          );
        })}
      </div>

      {items.length > 1 && (
        <>
          <button className="hc-prev" onClick={() => go(index - 1)} aria-label="Previous slide">‹</button>
          <button className="hc-next" onClick={() => go(index + 1)} aria-label="Next slide">›</button>

          <div className="hc-indicators" role="tablist" aria-label="Slide indicators">
            {items.map((_, i) => (
              <button
                key={i}
                className={`hc-dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-pressed={i === index}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
