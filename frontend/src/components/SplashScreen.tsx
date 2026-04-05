import { useEffect, useState } from "react";

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade-out at 2.4s, call onDone at 3s (after 600ms fade)
    const fadeTimer = setTimeout(() => setFading(true), 2400);
    const doneTimer = setTimeout(() => onDone(), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash-root ${fading ? "splash-fade-out" : ""}`}>
      {/* Subtle radial glow behind text */}
      <div className="splash-glow" />

      {/* Brand text */}
      <div className="splash-text-wrap">
        <p className="splash-sub">est. 2026</p>
        <h1 className="splash-title">
          VIVID
          <br />
          VITABLENDS
        </h1>
        <p className="splash-tagline">Pure · Natural · Crafted with Care</p>

        {/* Light sweep overlay — clipped to text area */}
        <div className="splash-sweep" />
      </div>

      {/* Bottom thin gold line */}
      <div className="splash-line" />
    </div>
  );
};

export default SplashScreen;
