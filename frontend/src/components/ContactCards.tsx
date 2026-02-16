import { Mail, Phone, MessageCircle } from "lucide-react";

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
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Get in Touch</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">We'd Love to Hear from You</h2>
        </div>

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
              <h3 className="font-display text-lg font-bold text-foreground">{c.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactCards;
