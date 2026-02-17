import { useState } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Health Powders", href: "/health-powders" },
    { label: "Premium Pickles", href: "/premium-pickles" },
    { label: "Combos", href: "/#combos" },
    { label: "About", href: "/#about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="/" className="font-display text-2xl font-bold text-primary tracking-tight">
          Vivid <span className="text-accent">Vitablends</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 text-foreground/70 transition-colors hover:bg-secondary hover:text-accent" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="relative rounded-lg p-2 text-foreground/70 transition-colors hover:bg-secondary hover:text-accent" aria-label="Cart">
            <ShoppingBag size={20} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              0
            </span>
          </button>
          <button
            className="rounded-lg p-2 text-foreground/70 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-card px-5 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

    </header>
  );
};

export default Header;
