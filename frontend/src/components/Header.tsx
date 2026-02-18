import { useState } from "react";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="/" className="font-display text-2xl font-bold text-primary tracking-tight">
          Vivid <span className="text-accent">Vitablends</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <div 
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-accent">
              Shop <ChevronDown size={16} />
            </button>
            {shopOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
                <a href="/premium-pickles" className="block px-4 py-3 text-sm hover:bg-secondary">Premium Pickles</a>
                <a href="/health-powders" className="block px-4 py-3 text-sm hover:bg-secondary">Health Powders</a>
                <a href="/#combos" className="block px-4 py-3 text-sm hover:bg-secondary">Combos</a>
              </div>
            )}
          </div>
          <a href="/#about" className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent">About</a>
          <a href="/#contact" className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="relative rounded-lg p-2 text-foreground/70 transition-colors hover:bg-secondary hover:text-accent" aria-label="Cart">
            <ShoppingBag size={20} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">0</span>
          </button>
          <button className="rounded-lg p-2 text-foreground/70 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-card px-5 py-4 md:hidden">
          <a href="/premium-pickles" className="block py-3 text-sm font-medium" onClick={() => setMobileOpen(false)}>Premium Pickles</a>
          <a href="/health-powders" className="block py-3 text-sm font-medium" onClick={() => setMobileOpen(false)}>Health Powders</a>
          <a href="/#combos" className="block py-3 text-sm font-medium" onClick={() => setMobileOpen(false)}>Combos</a>
          <a href="/#about" className="block py-3 text-sm font-medium" onClick={() => setMobileOpen(false)}>About</a>
          <a href="/#contact" className="block py-3 text-sm font-medium" onClick={() => setMobileOpen(false)}>Contact</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
