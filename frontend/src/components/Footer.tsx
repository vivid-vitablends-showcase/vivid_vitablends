import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold text-primary">
              Vivid <span className="text-accent">Vitablends</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Premium homemade food products crafted from traditional recipes
              with 100% natural ingredients.
            </p>
            <div className="mt-4 flex gap-3">
              {(["instagram", "facebook", "whatsapp"] as const).map(
                (platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-accent hover:text-accent"
                    aria-label={
                      platform.charAt(0).toUpperCase() + platform.slice(1)
                    }
                  >
                    <SocialIcon type={platform} size={18} />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {["About Us", "Products", "Combos", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Support
            </h4>
            <ul className="space-y-2.5">
              {[
                "Shipping Policy",
                "Return Policy",
                "FAQ",
                "Privacy Policy",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vivid Vitablends. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
