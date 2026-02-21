const AnnouncementBar = () => {
  const text =
    "🎉 Free Shipping on Orders Above ₹499 • Use Code VIVID10 for 10% Off • Fresh Batch Available Now! •";

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
