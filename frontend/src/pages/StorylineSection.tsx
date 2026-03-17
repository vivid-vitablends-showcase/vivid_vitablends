import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import storyImage from "@/assets/hero-banner.jpg";

gsap.registerPlugin(ScrollTrigger);

const StorylineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);

  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);

  const textContentRef = useRef<HTMLDivElement>(null);
  const lineRef1 = useRef<HTMLDivElement>(null);
  const lineRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%", // Trigger animation when top of section hits 65% down the viewport
          toggleActions: "play none none reverse", // Replay on scroll back
        },
      });

      // 1. Cinematic Image Reveal
      // The container unmasks from bottom to top using clip-path
      tl.fromTo(
        imageContainerRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "power4.inOut" }
      )
        // The image inside slowly zooms out (parallax-like effect)
        .fromTo(
          imageInnerRef.current,
          { scale: 1.4 },
          { scale: 1, duration: 2.2, ease: "power3.out" },
          "<" // start at the exact same time
        );

      // 2. Headline Text Reveal (Masked sliding up)
      tl.fromTo(
        [headingLine1Ref.current, headingLine2Ref.current],
        { y: "120%", opacity: 0, rotateZ: 2 },
        {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=1.4" // overlap heavily with image reveal
      );

      // 3. Staggered Paragraphs
      const paragraphs = textContentRef.current?.querySelectorAll("p");
      if (paragraphs) {
        tl.fromTo(
          paragraphs,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
          "-=0.8"
        );
      }

      // 4. Decorative lines expanding
      tl.fromTo(
        [lineRef1.current, lineRef2.current],
        { width: 0, opacity: 0 },
        {
          width: (i) => (i === 0 ? "4rem" : "2rem"),
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-background"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-200/15 to-amber-200/15 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-5 md:px-10 py-16">
        <div className="grid items-center gap-16 md:grid-cols-2 lg:gap-24">
          {/* ================= IMAGE ================= */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700" />
            <div
              ref={imageContainerRef}
              className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/5] md:aspect-auto md:h-[600px] w-full"
            >
              <img
                ref={imageInnerRef}
                src={storyImage}
                alt="Traditional homemade preparation"
                className="h-full w-full object-cover origin-center transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>

          {/* ================= TEXT ================= */}
          <div className="text-center md:text-left flex flex-col justify-center space-y-10">
            <div className="space-y-2">
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                {/* Overflow hidden allows the text to slide up from "beneath" a mask */}
                <span className="block overflow-hidden pb-2">
                  <span
                    ref={headingLine1Ref}
                    className="block bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 bg-clip-text text-transparent transform origin-bottom-left"
                  >
                    Food the way
                  </span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span
                    ref={headingLine2Ref}
                    className="block text-foreground transform origin-bottom-left"
                  >
                    it was meant to be.
                  </span>
                </span>
              </h2>
            </div>

            <div
              className="space-y-8 text-lg md:text-xl leading-relaxed"
              ref={textContentRef}
            >
              <p className="font-medium text-muted-foreground/90 md:pr-10">
                In a world full of{" "}
                <span className="text-orange-600 font-semibold relative inline-block">
                  preservatives
                  <span className="absolute bottom-1 left-0 w-full h-[0.15em] bg-orange-200/60 -z-10"></span>
                </span>
                ,{" "}
                <span className="text-orange-600 font-semibold relative inline-block">
                  shortcuts
                  <span className="absolute bottom-1 left-0 w-full h-[0.15em] bg-orange-200/60 -z-10"></span>
                </span>
                , and{" "}
                <span className="text-orange-600 font-semibold relative inline-block">
                  artificial flavors
                  <span className="absolute bottom-1 left-0 w-full h-[0.15em] bg-orange-200/60 -z-10"></span>
                </span>
                , we chose a distinctly different path.
              </p>

              <p className="text-muted-foreground/80 md:pr-10">
                Every pickle we prepare, every wellness blend we craft, begins
                with{" "}
                <span className="font-semibold text-amber-700">
                  real ingredients
                </span>
                ,{" "}
                <span className="font-semibold text-amber-700">
                  slow processes
                </span>
                , and{" "}
                <span className="font-semibold text-amber-700">
                  generations of tradition
                </span>
                . We refuse to compromise on authenticity.
              </p>

              <div className="pt-6 border-l-4 border-orange-400 pl-6">
                <p className="text-2xl md:text-3xl font-display font-semibold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent leading-snug tracking-tight">
                  Because good food doesn't just fill you{" "}
                  <br className="hidden md:block" /> — it cares for you.
                </p>
              </div>
            </div>

            {/* Decorative Line */}
            <div className="flex items-center gap-3 pt-6">
              <div
                ref={lineRef1}
                className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
              />
              <div
                ref={lineRef2}
                className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorylineSection;
