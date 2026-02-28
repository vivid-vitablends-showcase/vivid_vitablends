import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: "Home", type: "route", to: "/" },
    { label: "Shop", type: "dropdown" },
    { label: "Combos", type: "scroll", to: "combos" },
    { label: "About", type: "scroll", to: "about" },
  ];

  const categories = [
    { label: "Premium Pickles", to: "/premium-pickles" },
    { label: "Health & Smoothie Mix Powders", to: "/health-powders" },
    { label: "Everyday Essentials Powders (Spices)", to: "/spices" },
    { label: "Jams", to: "/jams" },
    { label: "Cookies", to: "/cookies" },
    { label: "Chocolate Candies", to: "/chocolates" },
    { label: "Fruit & Vegetable Powders", to: "/fruit-veg-powders" },
  ];

  const handleScroll = (id: string) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">

        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold text-amber-500">
          Vivid <span className="text-amber-400">Vitablends</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {/* Home */}
          <Link
            to="/"
            className="text-sm font-medium text-foreground/70 hover:text-accent"
          >
            Home
          </Link>

          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="text-sm font-medium text-foreground/70 hover:text-accent">
              Shop
            </button>

            {shopOpen && (
              <div className="absolute left-0 top-8 w-64 rounded-lg border border-border bg-card p-3 shadow-lg">
                {categories.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.to}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Combos */}
          <button
            onClick={() => handleScroll("combos")}
            className="text-sm font-medium text-foreground/70 hover:text-accent"
          >
            Combos
          </button>

          {/* About */}
          <button
            onClick={() => handleScroll("about")}
            className="text-sm font-medium text-foreground/70 hover:text-accent"
          >
            About
          </button>

          {/* Contact (External Link) */}
          <a
            href="http://localhost:8081/#/contact"
            className="text-sm font-medium text-foreground/70 hover:text-accent"
          >
            Contact
          </a>
        </nav>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-foreground/70 hover:bg-secondary"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="rounded-lg p-2 text-foreground/70 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
{mobileOpen && (
  <nav className="border-t border-border bg-card px-5 py-4 md:hidden">
    {/* Home */}
    <Link
      to="/"
      onClick={() => setMobileOpen(false)}
      className="block py-3 text-sm font-medium text-foreground/70 hover:text-accent"
    >
      Home
    </Link>

    {/* Shop Dropdown */}
    <div className="py-3">
      <button
        onClick={() => setShopOpen(!shopOpen)}
        className="flex w-full items-center justify-between text-sm font-medium text-foreground/70 hover:text-accent"
      >
        Shop
        <span className="text-xs">
          {shopOpen ? "▲" : "▼"}
        </span>
      </button>

      {shopOpen && (
        <div className="mt-2 space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.to}
              onClick={() => {
                setMobileOpen(false);
                setShopOpen(false);
              }}
              className="block py-2 pl-4 text-sm text-foreground/70 hover:text-accent"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </div>

    {/* Combos */}
    <button
      onClick={() => {
        handleScroll("combos");
        setMobileOpen(false);
      }}
      className="block w-full py-3 text-left text-sm font-medium text-foreground/70 hover:text-accent"
    >
      Combos
    </button>

    {/* About */}
    <button
      onClick={() => {
        handleScroll("about");
        setMobileOpen(false);
      }}
      className="block w-full py-3 text-left text-sm font-medium text-foreground/70 hover:text-accent"
    >
      About
    </button>

    {/* Contact */}
    <a
      href="http://localhost:8081/#/contact"
      className="block py-3 text-sm font-medium text-foreground/70 hover:text-accent"
    >
      Contact
    </a>
  </nav>
)}
    </header>
  );
};

export default Header;