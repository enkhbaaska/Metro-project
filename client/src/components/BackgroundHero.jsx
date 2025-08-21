// client/src/components/BackgroundHero.jsx
import React, { useEffect, useRef, useState } from "react";
import "./BackgroundHero.css";

export default function BackgroundHero({
  sources = [{ src: "/videos/hero-2.mp4", type: "video/mp4" }],
  poster = "/images/hero-1.jpg",
  title,
  children,
  allowMobileVideo = false,
}) {
  const videoRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.loop = true;

    const isDesktopPointer =
      window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    const tryAutoplay = isDesktopPointer || allowMobileVideo;

    if (tryAutoplay) {
      const play = async () => {
        try {
          await videoEl.play();
          setVideoVisible(true);
        } catch (err) {
          // autoplay prevented — leave poster visible
          // eslint-disable-next-line no-console
          console.warn("Autoplay prevented for background video:", err);
          setVideoVisible(false);
        }
      };

      // attempt to play programmatically (source tags are present)
      play();
    } else {
      setVideoVisible(false);
    }
  }, [allowMobileVideo]);

  // Inline style uses poster value; if `poster` is like '/images/hero-1.jpg' it will load from public/
  const heroStyle = {
    backgroundImage: `url(${poster})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  return (
    <section className="bg-hero" aria-label={title || "Hero"} style={heroStyle}>
      <video
        ref={videoRef}
        className={`bg-video ${videoVisible ? "visible" : "hidden"}`}
        poster={poster}
        muted
        playsInline
        loop
        preload="metadata"
      >
        {sources.map((s, idx) => (
          <source key={idx} src={s.src} type={s.type} />
        ))}
      </video>

      <div className="bg-overlay">
        {title && <h1 className="bg-title">{title}</h1>}
        {children}
      </div>
    </section>
  );
}
