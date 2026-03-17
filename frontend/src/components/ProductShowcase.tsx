import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Particles from "./Particles";

const SHOWCASE_CONFIG = {
  animation: {
    inDuration: 1.6,
    inEase: "elastic.out(1, 0.65)",
    wordFallDuration: 0.8,
    wordFallStagger: 0.15,
    wordFallEase: "bounce.out",
    glowDurationIn: 1.5,
    glowDurationOut: 1,
    glowEaseIn: "power3.out",
    glowEaseOut: "power2.in",
    floatDuration: 2,
    floatOffset: "-=20",
    readTime: 1.8,
    outDuration: 1.2,
    outEase: "back.in(1.2)",
    wordDropDuration: 0.6,
    wordDropStagger: 0.08,
    wordDropEase: "power3.in",
    detailInDuration: 0.8,
    detailInStagger: 0.1,
    detailOutDuration: 0.5,
    detailOutStagger: 0.05,
    parallaxDuration: 0.6,
    parallaxGlowDuration: 1,
  },
  transforms: {
    startImageX: 400,
    startImageY: -400,
    startImageScale: 0.3,
    startImageRotation: 45,
    endImageX: -400,
    endImageY: 400,
    endImageScale: 0.3,
    endImageRotation: -45,
    wordStartRotationX: 90,
    wordEndRotationX: -90,
    parallaxImageMultiplier: 40,
    parallaxGlowMultiplier: 60,
  },
};

const ProductShowcase = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const product = products[currentIndex];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // If reduced motion is preferred, use a simple crossfade instead of complex 3D animations
      if (prefersReducedMotion) {
        gsap.set(".product-image", { opacity: 0, scale: 1 });
        gsap.set(".word-block", { opacity: 0, y: 0, rotationX: 0 });
        gsap.set(".product-detail-sub", { opacity: 0, y: 0 });
        gsap.set(".light-glow", { opacity: 0, scale: 1 });

        tl.to(".light-glow", { opacity: 0.5, duration: 1 })
          .to(
            [".product-image", ".word-block", ".product-detail-sub"],
            { opacity: 1, duration: 1 },
            "<"
          )
          .to({}, { duration: SHOWCASE_CONFIG.animation.readTime * 2 })
          .to(
            [
              ".product-image",
              ".word-block",
              ".product-detail-sub",
              ".light-glow",
            ],
            { opacity: 0, duration: 1 }
          )
          .call(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length);
          });
        return;
      }

      // Reset states for the animation
      // Image starting from top-right corner, scaled down
      gsap.set(".product-image", {
        x: SHOWCASE_CONFIG.transforms.startImageX,
        y: SHOWCASE_CONFIG.transforms.startImageY,
        scale: SHOWCASE_CONFIG.transforms.startImageScale,
        rotation: SHOWCASE_CONFIG.transforms.startImageRotation,
        opacity: 0,
        filter: "blur(0px)",
      });

      // Text words rolling/falling in like blocks
      gsap.set(".word-block", {
        y: -100,
        opacity: 0,
        rotationX: SHOWCASE_CONFIG.transforms.wordStartRotationX,
        transformOrigin: "50% 0%",
      });

      // Other details
      gsap.set(".product-detail-sub", { y: 30, opacity: 0 });
      gsap.set(".light-glow", { scale: 0.5, opacity: 0 });

      // ================= ANIMATE IN =================
      tl.to(
        ".light-glow",
        {
          scale: 1,
          opacity: 0.8,
          duration: SHOWCASE_CONFIG.animation.glowDurationIn,
          ease: SHOWCASE_CONFIG.animation.glowEaseIn,
        },
        0
      )

        // Image jumps in from the top corner with an elastic/bounce feel
        .to(
          ".product-image",
          {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: SHOWCASE_CONFIG.animation.inDuration,
            ease: SHOWCASE_CONFIG.animation.inEase,
          },
          0.1
        )

        // Words fall down like square blocks rolling into place
        .to(
          ".word-block",
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: SHOWCASE_CONFIG.animation.wordFallDuration,
            stagger: SHOWCASE_CONFIG.animation.wordFallStagger,
            ease: SHOWCASE_CONFIG.animation.wordFallEase,
          },
          0.3
        )

        // Remaining details slide up
        .to(
          ".product-detail-sub",
          {
            y: 0,
            opacity: 1,
            duration: SHOWCASE_CONFIG.animation.detailInDuration,
            stagger: SHOWCASE_CONFIG.animation.detailInStagger,
            ease: "power3.out",
          },
          0.6
        )

        // Continuous floating animation for the product
        .to(
          ".product-image-container",
          {
            y: SHOWCASE_CONFIG.animation.floatOffset,
            duration: SHOWCASE_CONFIG.animation.floatDuration,
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut",
          },
          0
        )

        // Wait / Read time
        .to({}, { duration: SHOWCASE_CONFIG.animation.readTime })

        // ================= ANIMATE OUT =================
        .to(
          ".light-glow",
          {
            scale: 1.5,
            opacity: 0,
            duration: SHOWCASE_CONFIG.animation.glowDurationOut,
            ease: SHOWCASE_CONFIG.animation.glowEaseOut,
          },
          ">"
        )

        // Image jumps away to bottom-left
        .to(
          ".product-image",
          {
            x: SHOWCASE_CONFIG.transforms.endImageX,
            y: SHOWCASE_CONFIG.transforms.endImageY,
            scale: SHOWCASE_CONFIG.transforms.endImageScale,
            rotation: SHOWCASE_CONFIG.transforms.endImageRotation,
            opacity: 0,
            duration: SHOWCASE_CONFIG.animation.outDuration,
            ease: SHOWCASE_CONFIG.animation.outEase,
          },
          "<"
        )

        // Words drop out like blocks falling through the floor
        .to(
          ".word-block",
          {
            y: 100,
            opacity: 0,
            rotationX: SHOWCASE_CONFIG.transforms.wordEndRotationX,
            duration: SHOWCASE_CONFIG.animation.wordDropDuration,
            stagger: SHOWCASE_CONFIG.animation.wordDropStagger,
            ease: SHOWCASE_CONFIG.animation.wordDropEase,
          },
          "<0.2"
        )

        .to(
          ".product-detail-sub",
          {
            y: 30,
            opacity: 0,
            duration: SHOWCASE_CONFIG.animation.detailOutDuration,
            stagger: SHOWCASE_CONFIG.animation.detailOutStagger,
            ease: "power2.in",
          },
          "<0.1"
        )

        // Trigger next product
        .call(() => {
          setCurrentIndex((prev) => (prev + 1) % products.length);
        });
    }, containerRef);

    return () => ctx.revert();
  }, [currentIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(".product-image-wrapper", {
      rotationY: x * SHOWCASE_CONFIG.transforms.parallaxImageMultiplier,
      rotationX: -y * SHOWCASE_CONFIG.transforms.parallaxImageMultiplier,
      ease: "power3.out",
      duration: SHOWCASE_CONFIG.animation.parallaxDuration,
      transformPerspective: 1000,
    });

    gsap.to(".light-glow", {
      x: x * SHOWCASE_CONFIG.transforms.parallaxGlowMultiplier,
      y: y * SHOWCASE_CONFIG.transforms.parallaxGlowMultiplier,
      ease: "power2.out",
      duration: SHOWCASE_CONFIG.animation.parallaxGlowDuration,
    });
  };

  const handleMouseLeave = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.to(".product-image-wrapper", {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: SHOWCASE_CONFIG.animation.parallaxGlowDuration,
    });
    gsap.to(".light-glow", {
      x: 0,
      y: 0,
      ease: "power2.out",
      duration: SHOWCASE_CONFIG.animation.parallaxGlowDuration,
    });
  };

  if (!product) return null;

  // Split product name into words for the block-fall animation
  const productWords = product.name.split(" ");

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-100/40 to-background flex items-center justify-center min-h-[800px] perspective-[1000px]"
    >
      {/* Decorative Brand Colors Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-300/20 to-amber-200/20 rounded-full blur-[120px] -z-10" />

      <Particles />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* ================= TEXT DETAILS ================= */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8 order-2 lg:order-1">
          <div className="product-detail-sub inline-flex items-center rounded-sm border border-orange-200 bg-white/60 px-4 py-1.5 text-sm font-bold text-orange-600 backdrop-blur-md shadow-sm uppercase tracking-wider">
            {product.badge || "Featured Product"}
          </div>

          {/* Animated Words acting like falling square blocks */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-slate-900 flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 leading-[1.1]">
            {productWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 px-1">
                <span className="word-block inline-block bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent transform-gpu drop-shadow-sm">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p className="product-detail-sub text-lg md:text-xl text-slate-700 max-w-lg leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="product-detail-sub flex items-center gap-4 pt-2">
            <span className="text-4xl font-extrabold text-orange-600">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-slate-400 line-through decoration-slate-400/50 font-semibold">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <div className="product-detail-sub pt-4 w-full lg:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold h-14 px-8 text-lg rounded-xl shadow-[0_10px_25px_-5px_rgba(249,115,22,0.4)] transition-all hover:shadow-[0_15px_35px_-5px_rgba(249,115,22,0.5)] hover:-translate-y-1"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Pre-order Now
            </Button>
          </div>
        </div>

        {/* ================= IMAGE & 3D ROTATION ================= */}
        <div className="relative order-1 lg:order-2 flex justify-center items-center h-[400px] md:h-[500px]">
          {/* Rotating Warm Light Glow */}
          <div className="light-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-tr from-amber-400/50 to-orange-300/50 rounded-full blur-[60px] z-0 mix-blend-multiply" />

          <div className="product-image-container relative z-10 w-full h-full flex justify-center items-center">
            <div className="product-image-wrapper w-72 h-72 md:w-[400px] md:h-[400px] relative preserve-3d">
              {/* Product Image jumping from the top */}
              <img
                src={product.image}
                alt={product.name}
                className="product-image absolute inset-0 w-full h-full object-contain drop-shadow-[0_30px_40px_rgba(234,88,12,0.3)]"
                style={{ transformStyle: "preserve-3d" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
