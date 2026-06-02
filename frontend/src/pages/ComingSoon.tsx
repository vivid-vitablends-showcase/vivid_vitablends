import { useEffect, useState } from "react";

// 🚀 LAUNCH DAY: Delete this file (ComingSoon.tsx) and in App.tsx:
//   1. Remove:  import ComingSoon from "./pages/ComingSoon";
//   2. Change:  <Route path="/" element={<ComingSoon />} />  →  <Route path="/" element={<Index />} />
//   3. Remove:  <Route path="/app" element={<Index />} />

const LAUNCH_DATE = new Date("2026-04-05T20:00:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <span className="coming-soon-particle" style={style} />
);

const CountBox = ({ value, label }: { value: number; label: string }) => (
  <div className="cs-count-box">
    <span className="cs-count-num">{String(value).padStart(2, "0")}</span>
    <span className="cs-count-label">{label}</span>
  </div>
);

const particles = Array.from({ length: 18 }, (_, i) => ({
  style: {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${4 + Math.random() * 6}px`,
    height: `${4 + Math.random() * 6}px`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${5 + Math.random() * 6}s`,
    opacity: 0.15 + Math.random() * 0.25,
  },
  id: i,
}));

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = "Vivid VitaBlends – Coming Soon";
    const t = setTimeout(() => setVisible(true), 80);
    return () => {
      clearTimeout(t);
      document.title = prev;
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className={`cs-root${visible ? " cs-visible" : ""}`}>
        {/* Ambient blobs */}
        <div className="cs-blob cs-blob-1" />
        <div className="cs-blob cs-blob-2" />
        <div className="cs-blob cs-blob-3" />

        {/* Floating particles */}
        {particles.map((p) => (
          <Particle key={p.id} style={p.style} />
        ))}

        {/* Content */}
        <div className="cs-content">
          {/* Badge */}
          <div className="cs-badge cs-anim cs-anim-1">
            <span className="cs-badge-dot" />
            Something delicious is brewing
          </div>

          {/* Brand name */}
          <h1 className="cs-title cs-anim cs-anim-2">
            <span className="cs-title-vivid">Vivid</span>
            <br />
            <span className="cs-title-vita">VitaBlends</span>
          </h1>

          {/* Divider */}
          <div className="cs-divider cs-anim cs-anim-3">
            <span className="cs-divider-line" />
            <span className="cs-divider-icon">✦</span>
            <span className="cs-divider-line" />
          </div>

          {/* Tagline */}
          <p className="cs-tagline cs-anim cs-anim-4">
            Premium homemade pickles &amp; health powders — crafted with love,
            <br className="hidden sm:block" /> rooted in tradition.
          </p>

          {/* Countdown */}
          <div className="cs-countdown cs-anim cs-anim-5">
            <CountBox value={days} label="Days" />
            <span className="cs-colon">:</span>
            <CountBox value={hours} label="Hours" />
            <span className="cs-colon">:</span>
            <CountBox value={minutes} label="Minutes" />
            <span className="cs-colon">:</span>
            <CountBox value={seconds} label="Seconds" />
          </div>

          {/* CTA */}
          <p className="cs-cta cs-anim cs-anim-6">
            We're putting the final touches on something special.
            <br />
            <strong>Stay tuned.</strong>
          </p>

          {/* Footer */}
          <p className="cs-footer cs-anim cs-anim-6">
            © {new Date().getFullYear()} Vivid VitaBlends · All rights reserved
          </p>
        </div>
      </div>
    </>
  );
}

const CSS = `
  @keyframes cs-blob-drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(40px, -30px) scale(1.08); }
    66%       { transform: translate(-25px, 20px) scale(0.95); }
  }
  @keyframes cs-float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50%       { transform: translateY(-22px) rotate(180deg); }
  }
  @keyframes cs-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes cs-pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }
  @keyframes cs-line-grow {
    from { width: 0; opacity: 0; }
    to   { width: 60px; opacity: 1; }
  }
  @keyframes cs-fade-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes cs-count-flip {
    0%   { transform: translateY(-6px); opacity: 0; }
    100% { transform: translateY(0);    opacity: 1; }
  }

  .cs-root {
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    background: #f5f1ea;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
  }

  /* Ambient blobs */
  .cs-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    animation: cs-blob-drift 12s ease-in-out infinite;
  }
  .cs-blob-1 {
    width: 520px; height: 520px;
    background: radial-gradient(circle, rgba(212,170,80,0.22) 0%, transparent 70%);
    top: -120px; left: -100px;
    animation-duration: 14s;
  }
  .cs-blob-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(140,100,40,0.15) 0%, transparent 70%);
    bottom: -80px; right: -80px;
    animation-duration: 11s;
    animation-delay: -4s;
  }
  .cs-blob-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(180,140,60,0.12) 0%, transparent 70%);
    top: 40%; left: 55%;
    animation-duration: 16s;
    animation-delay: -8s;
  }

  /* Particles */
  .coming-soon-particle {
    position: absolute;
    border-radius: 50%;
    background: #c8922a;
    pointer-events: none;
    animation: cs-float linear infinite;
  }

  /* Content wrapper */
  .cs-content {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 2rem 1.5rem;
    max-width: 680px;
    width: 100%;
  }

  /* Staggered fade-up animations */
  .cs-anim { opacity: 0; }
  .cs-visible .cs-anim-1 { animation: cs-fade-up 0.7s ease forwards 0.1s; }
  .cs-visible .cs-anim-2 { animation: cs-fade-up 0.7s ease forwards 0.25s; }
  .cs-visible .cs-anim-3 { animation: cs-fade-up 0.7s ease forwards 0.4s; }
  .cs-visible .cs-anim-4 { animation: cs-fade-up 0.7s ease forwards 0.55s; }
  .cs-visible .cs-anim-5 { animation: cs-fade-up 0.7s ease forwards 0.7s; }
  .cs-visible .cs-anim-6 { animation: cs-fade-up 0.7s ease forwards 0.85s; }

  /* Badge */
  .cs-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(200,146,42,0.12);
    border: 1px solid rgba(200,146,42,0.3);
    color: #a87020;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 999px;
    margin-bottom: 1.8rem;
  }
  .cs-badge-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #c8922a;
    animation: cs-pulse-dot 1.6s ease-in-out infinite;
  }

  /* Title */
  .cs-title {
    font-family: 'Playfair Display', serif;
    line-height: 1.05;
    margin: 0 0 0.2rem;
    letter-spacing: 0.04em;
  }
  .cs-title-vivid {
    font-size: clamp(3.2rem, 10vw, 6.5rem);
    font-weight: 900;
    background: linear-gradient(135deg, #c8922a 0%, #f0c060 40%, #d4aa50 60%, #a87020 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: cs-shimmer 4s linear infinite;
    display: block;
  }
  .cs-title-vita {
    font-size: clamp(1.6rem, 5vw, 3rem);
    font-weight: 400;
    color: #7a5c2e;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    display: block;
  }

  /* Divider */
  .cs-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 1.6rem auto;
  }
  .cs-divider-line {
    height: 1px;
    background: linear-gradient(90deg, transparent, #c8922a, transparent);
    animation: cs-line-grow 0.8s ease forwards;
    width: 60px;
  }
  .cs-divider-icon {
    color: #c8922a;
    font-size: 0.75rem;
  }

  /* Tagline */
  .cs-tagline {
    font-size: clamp(0.9rem, 2.2vw, 1.05rem);
    color: #7a6040;
    line-height: 1.75;
    margin: 0 0 2.4rem;
    font-weight: 400;
  }

  /* Countdown */
  .cs-countdown {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 2.4rem;
    flex-wrap: wrap;
  }
  .cs-count-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255,255,255,0.65);
    border: 1px solid rgba(200,146,42,0.2);
    border-radius: 14px;
    padding: 14px 18px 10px;
    min-width: 72px;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 20px rgba(140,100,40,0.08);
  }
  .cs-count-num {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 700;
    color: #c8922a;
    line-height: 1;
    animation: cs-count-flip 0.3s ease;
  }
  .cs-count-label {
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #a08050;
    margin-top: 5px;
  }
  .cs-colon {
    font-size: 1.8rem;
    font-weight: 700;
    color: #c8922a;
    opacity: 0.5;
    margin-bottom: 18px;
    line-height: 1;
  }

  /* CTA */
  .cs-cta {
    font-size: 0.9rem;
    color: #8a6840;
    line-height: 1.8;
    margin: 0 0 2.5rem;
  }
  .cs-cta strong { color: #c8922a; }

  /* Footer */
  .cs-footer {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    color: #b09060;
    margin: 0;
  }
`;
