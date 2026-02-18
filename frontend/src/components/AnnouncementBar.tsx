import { useState, useEffect } from "react";

const offers = [
  "🔥 Fresh Batch Available — Limited Stock",
  "🎉 Free Shipping on Orders Above ₹499",
  "💰 Use Code VIVID10 for 10% Off"
];

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div 
      className="bg-accent py-2.5 text-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <p className="text-sm font-semibold text-accent-foreground transition-opacity duration-300">
        {offers[index]}
      </p>
    </div>
  );
};

export default AnnouncementBar;
