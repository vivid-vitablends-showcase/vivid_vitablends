const AnnouncementBar = () => {
  const text =
    "🎉Flat ₹200 off on all orders above ₹1999 • Fresh Batch Available Now! •";

  return (
    <div className="bg-accent overflow-hidden py-2">
      <div className="announcement-scroll flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-medium text-accent-foreground"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
