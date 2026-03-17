import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const PARTICLE_CONFIG = {
  count: 20,
  size: "w-3 h-3",
  color: "bg-orange-400",
  blur: "blur-[3px]",
  opacity: "opacity-50",
  animation: {
    yOffset: -150,
    xOffsetRange: [-80, 80],
    durationRange: [12, 25],
    scaleRange: [0.5, 1.5],
    initialOpacityRange: [0.2, 0.6],
    rotationRange: [-180, 180],
    staggerAmount: 5,
  },
};

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!containerRef.current || prefersReducedMotion) return;

    const particles = containerRef.current.children;

    gsap.set(particles, {
      x: "random(0, 100vw)",
      y: "random(0, 100vh)",
      scale: `random(${PARTICLE_CONFIG.animation.scaleRange[0]}, ${PARTICLE_CONFIG.animation.scaleRange[1]})`,
      opacity: `random(${PARTICLE_CONFIG.animation.initialOpacityRange[0]}, ${PARTICLE_CONFIG.animation.initialOpacityRange[1]})`,
    });

    gsap.to(particles, {
      y: `+=${PARTICLE_CONFIG.animation.yOffset}`,
      x: `+=random(${PARTICLE_CONFIG.animation.xOffsetRange[0]}, ${PARTICLE_CONFIG.animation.xOffsetRange[1]})`,
      rotation: `random(${PARTICLE_CONFIG.animation.rotationRange[0]}, ${PARTICLE_CONFIG.animation.rotationRange[1]})`,
      duration: `random(${PARTICLE_CONFIG.animation.durationRange[0]}, ${PARTICLE_CONFIG.animation.durationRange[1]})`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: PARTICLE_CONFIG.animation.staggerAmount,
        from: "random",
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {[...Array(PARTICLE_CONFIG.count)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-md ${PARTICLE_CONFIG.size} ${PARTICLE_CONFIG.color} ${PARTICLE_CONFIG.blur} ${PARTICLE_CONFIG.opacity}`}
          style={{ transform: `rotate(${Math.random() * 45}deg)` }}
        />
      ))}
    </div>
  );
};

export default Particles;
