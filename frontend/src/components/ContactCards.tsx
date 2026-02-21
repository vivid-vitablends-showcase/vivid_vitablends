import { useState } from "react";
import { Mail, Phone, MessageCircle, Star } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@vividvitablends.com",
    href: "mailto:hello@vividvitablends.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
];

const ContactCards = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            Get in Touch
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            We'd Love to Hear from You
          </h2>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex flex-col items-center rounded-lg bg-card p-8 text-center transition-all"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <c.icon size={26} className="text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {c.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.value}</p>
            </a>
          ))}
        </div>

        {/* Review Form */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-card p-8 shadow-md">
          <h3 className="mb-6 text-center font-display text-2xl font-bold text-foreground">
            Share Your Experience
          </h3>

          <ReviewForm />
        </div>
      </div>
    </section>
  );
};

export default ContactCards;

// =======================
// Review Form Component
// =======================

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || rating === 0 || !message.trim()) {
      alert("Please fill required fields and select a rating.");
      return;
    }

    // 🔥 For now just log it
    console.log({
      name,
      email,
      rating,
      message,
    });

    alert("Review submitted successfully!");

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ⭐ Star Rating */}
      <div className="text-center">
        <p className="mb-3 text-sm font-medium text-foreground">
          Your Rating *
        </p>

        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          Name *
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* Email (Optional) */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          Email (Optional)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* Message */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          Review *
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your experience..."
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
      >
        Submit Review
      </button>
    </form>
  );
};
