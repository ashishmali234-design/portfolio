"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
  onLoadComplete: () => void;
}

export default function ScrollyCanvas({ onLoadComplete }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLaunchingReady, setIsLaunchingReady] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isPreloaderFading, setIsPreloaderFading] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  const totalFrames = 60;

  // Track scroll progress through the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame indices (0 to 59)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Generate particle parameters once so they animate smoothly via CSS
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 3 + 2; // 2px to 5px
      const delay = Math.random() * 2; // 0s to 2s
      const duration = Math.random() * 1.2 + 0.8; // 0.8s to 2s
      const left = Math.random() * 60 + 20; // 20% to 80%
      const drift = (Math.random() - 0.5) * 24; // drift in px
      return { id: i, size, delay, duration, left, drift };
    });
  }, []);

  // Generate smoke puffs for the bottom billowing smoke effect
  const smokePuffs = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const size = Math.random() * 100 + 140; // 140px to 240px
      const left = Math.random() * 90 + 5; // 5% to 95%
      const delay = Math.random() * 4; // 0s to 4s
      const duration = Math.random() * 3 + 3; // 3s to 6s
      const driftX = (Math.random() - 0.5) * 80; // -40px to 40px drift
      const driftY = -Math.random() * 100 - 80; // -80px to -180px billowing up
      const maxOpacity = Math.random() * 0.12 + 0.08;
      const scaleFrom = Math.random() * 0.2 + 0.4;
      const scaleTo = Math.random() * 0.4 + 1.2;
      
      const gradients = [
        "linear-gradient(to top, rgba(236,72,153,0.14) 0%, rgba(245,158,11,0.06) 50%, rgba(0,0,0,0) 100%)",
        "linear-gradient(to top, rgba(249,115,22,0.16) 0%, rgba(239,68,68,0.08) 60%, rgba(0,0,0,0) 100%)",
        "linear-gradient(to top, rgba(168,85,247,0.12) 0%, rgba(56,189,248,0.06) 70%, rgba(0,0,0,0) 100%)"
      ];
      const gradient = gradients[i % gradients.length];
      return { id: i, size, left, delay, duration, driftX, driftY, maxOpacity, scaleFrom, scaleTo, gradient };
    });
  }, []);

  // Generate engine smoke puffs that shoot out of the engine nozzle and dissipate
  const engineSmokePuffs = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const size = Math.random() * 30 + 35; // 35px to 65px
      const delay = Math.random() * 1.5; // 0s to 1.5s
      const duration = Math.random() * 1.2 + 1.2; // 1.2s to 2.4s
      const driftX = (Math.random() - 0.5) * 80; // drift out wide horizontally
      const driftY = Math.random() * 100 + 120; // shoot down and dissipate
      const maxOpacity = Math.random() * 0.22 + 0.14;
      const scaleFrom = 0.3;
      const scaleTo = Math.random() * 0.8 + 1.8;
      
      const gradients = [
        "radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(236,72,153,0.1) 50%, rgba(0,0,0,0) 100%)",
        "radial-gradient(circle, rgba(239,68,68,0.22) 0%, rgba(249,115,22,0.1) 55%, rgba(0,0,0,0) 100%)",
        "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(56,189,248,0.08) 60%, rgba(0,0,0,0) 100%)"
      ];
      const gradient = gradients[i % gradients.length];
      return { id: i, size, delay, duration, driftX, driftY, maxOpacity, scaleFrom, scaleTo, gradient };
    });
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const getFramePath = (index: number) => {
      const paddedIndex = String(index).padStart(2, "0");
      return `/sequence/frame_${paddedIndex}_delay-0.066s.webp`;
    };

    const handleLoadOrError = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / totalFrames) * 100);
      setLoadingProgress(progress);

      if (loadedCount === totalFrames) {
        // Filter out any failed image loads, then sort by frame index
        const sorted = loadedImages
          .filter(Boolean)
          .sort((a, b) => {
            const indexA = parseInt(a.src.match(/frame_(\d+)_/)?.[1] || "0", 10);
            const indexB = parseInt(b.src.match(/frame_(\d+)_/)?.[1] || "0", 10);
            return indexA - indexB;
          });
        setImages(sorted);
        
        // Start the rocket ignition build-up!
        setIsLaunchingReady(true);
      }
    };

    const preloadImage = (index: number) => {
      const img = new Image();
      img.src = getFramePath(index);
      img.onload = () => {
        loadedImages.push(img);
        handleLoadOrError();
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
        handleLoadOrError();
      };
    };

    for (let i = 0; i < totalFrames; i++) {
      preloadImage(i);
    }
  }, []);

  // Launch Sequence Step 1: Ignition build-up
  useEffect(() => {
    if (!isLaunchingReady) return;

    // Rumble and fire build-up for 1000ms, then launch!
    const timer = setTimeout(() => {
      setIsLaunching(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLaunchingReady]);

  // Launch Sequence Step 2: Rocket shoots up, preloader background fades out
  useEffect(() => {
    if (!isLaunching) return;

    // Preloader background fades 200ms before we complete
    const fadeTimer = setTimeout(() => {
      setIsPreloaderFading(true);
    }, 1000);

    // Completely unmount preloader and reveal the homepage canvas & header
    const finishTimer = setTimeout(() => {
      setIsLoaded(true);
      setIsPreloaderActive(false);
      onLoadComplete();
    }, 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [isLaunching, onLoadComplete]);

  // Helper to draw current frame using cover logic
  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Set internal canvas resolution based on display size and pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Apply scaling to drawing context for high resolution
    ctx.scale(dpr, dpr);

    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Object-fit: cover calculation
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas viewport
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      // Image is taller than canvas viewport
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw the image centered
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Render when frame index updates on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    const index = Math.min(Math.max(Math.round(latest), 0), totalFrames - 1);
    const img = images[index];
    if (img) {
      requestAnimationFrame(() => drawFrame(img));
    }
  });

  // Handle canvas resize
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const handleResize = () => {
      // Draw first frame or current frame based on scroll progress
      const currentScroll = scrollYProgress.get();
      const index = Math.min(Math.max(Math.round(currentScroll * (totalFrames - 1)), 0), totalFrames - 1);
      const img = images[index];
      if (img) {
        drawFrame(img);
      }
    };

    window.addEventListener("resize", handleResize);
    // Trigger initial render
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
      {/* Sticky viewport for canvas */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover pointer-events-none transition-opacity duration-700"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
        {/* Subtle grid and vignette overlays */}
        <div className="absolute inset-0 grid-bg pointer-events-none mix-blend-overlay opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]/50 pointer-events-none" />
      </div>

      {/* Premium Rocket Flying Logo Preloader Screen */}
      {isPreloaderActive && (
        <div className={`fixed inset-0 bg-[#121212] z-50 flex flex-col justify-between items-center py-16 md:py-24 font-sans transition-all duration-1000 ease-out select-none ${
          isPreloaderFading ? "opacity-0 pointer-events-none scale-[1.02]" : "opacity-100"
        }`}>
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
          
          {/* Radial ambient lighting in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-40 blur-[80px]" 
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(245,158,11,0.06) 50%, rgba(0,0,0,0) 100%)"
            }}
          />

          {/* Background billowing smoke clouds */}
          <div className="absolute bottom-0 left-0 right-0 h-[280px] overflow-hidden pointer-events-none z-0 select-none">
            {smokePuffs.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full blur-[24px] md:blur-[36px] mix-blend-screen opacity-0"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `${p.left}%`,
                  bottom: "-40px",
                  marginLeft: `-${p.size / 2}px`,
                  backgroundImage: p.gradient,
                  animation: `billowSmoke ${p.duration}s ease-in-out infinite`,
                  animationDelay: `${p.delay}s`,
                  "--dx": `${p.driftX}px`,
                  "--dy": `${p.driftY}px`,
                  "--scale-from": p.scaleFrom,
                  "--scale-to": p.scaleTo,
                  "--max-opacity": isLaunchingReady ? p.maxOpacity * 2.2 : p.maxOpacity,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Interactive Ground Exhaust Cloud (Center bottom) */}
          <div 
            className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[100vw] md:w-[750px] h-64 rounded-full blur-[48px] pointer-events-none z-0 transition-all duration-[1000ms] ease-out mix-blend-screen"
            style={{
              transform: `translateX(-50%) scale(${isLaunching ? '2.0, 0.5' : isLaunchingReady ? '1.5, 1.2' : '1, 1'})`,
              opacity: isLaunching ? 0 : isLaunchingReady ? 0.95 : 0.45,
              background: "radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(236,72,153,0.14) 40%, rgba(239,68,68,0.05) 75%, rgba(0,0,0,0) 100%)",
            }}
          />

          {/* Top Header Section (Fades out on launch) */}
          <div className={`text-center z-10 transition-all duration-700 ease-out ${
            isLaunching ? "opacity-0 -translate-y-8" : "opacity-100"
          }`}>
            <h2 className="text-xl md:text-2xl font-black tracking-[0.3em] text-white/95 uppercase leading-none">
              ASHISH MALI
            </h2>
            <p className="text-[10px] tracking-[0.25em] text-amber-500/85 mt-2.5 uppercase font-bold">
              Creative Portfolio
            </p>
          </div>

          {/* Center Rocket Flight / Hover Area */}
          <div className="relative w-80 h-80 flex items-center justify-center z-10">
            {/* Main Launch Translation Wrapper */}
            <div
              className="relative transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: isLaunching 
                  ? "translateY(-150vh) scale(0.85)" 
                  : isLaunchingReady 
                    ? "translateY(0) scale(1.05)" 
                    : "translateY(0) scale(1)",
              }}
            >
              {/* Slow Floating Hover Animation */}
              <div 
                className="animate-[rocketHover_4s_easeInOut_infinite]"
                style={{ animationPlayState: isLaunching ? "paused" : "running" }}
              >
                {/* Shake/Rumble animation - gets intense during full launch ignition */}
                <div className={
                  isLaunching 
                    ? "animate-[rocketLaunchVibrate_0.08s_linear_infinite]" 
                    : isLaunchingReady 
                      ? "animate-[rocketLaunchVibrate_0.12s_linear_infinite]"
                      : "animate-[rocketVibrate_0.2s_linear_infinite]"
                }>
                  
                  {/* Layered Organic Plumes (Blown out behind the Logo) */}
                  <div className="absolute top-[62px] left-1/2 -translate-x-1/2 w-48 h-80 pointer-events-none z-0">
                    
                    {/* 1. Ambient Outer Plume Glow (Vibrant Pink-Orange, ultra-blurred) */}
                    <svg 
                      viewBox="0 0 100 200" 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-72 blur-[28px] origin-top opacity-65 transition-all duration-500"
                      style={{
                        transform: `scale(${isLaunching || isLaunchingReady ? '1.45, 1.25' : '1, 1'}) translateX(-50%)`,
                        animation: `plumeFlicker 0.15s ease-in-out infinite`,
                      }}
                    >
                      <path 
                        d="M 50,0 C 46,20 18,80 12,200 L 88,200 C 82,80 54,20 50,0 Z" 
                        fill="url(#outer-plume-grad)"
                      />
                    </svg>

                    {/* 2. Inner Plume Jet (Orange-Yellow, moderately blurred) */}
                    <svg 
                      viewBox="0 0 100 200" 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-52 blur-[10px] origin-top opacity-85 transition-all duration-500"
                      style={{
                        transform: `scale(${isLaunching || isLaunchingReady ? '1.35, 1.2' : '1, 1'}) translateX(-50%)`,
                        animation: `plumeFlicker 0.09s ease-in-out infinite`,
                      }}
                    >
                      <path 
                        d="M 50,0 C 48,15 25,70 20,200 L 80,200 C 75,70 52,15 50,0 Z" 
                        fill="url(#inner-plume-grad)"
                      />
                    </svg>

                    {/* 3. Core Fire Flame (Intense White-Yellow, low-blurred) */}
                    <svg 
                      viewBox="0 0 100 200" 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-32 blur-[3px] origin-top opacity-95 transition-all duration-500"
                      style={{
                        transform: `scale(${isLaunching || isLaunchingReady ? '1.25, 1.35' : '1, 1'}) translateX(-50%)`,
                        animation: `plumeFlicker 0.05s ease-in-out infinite`,
                      }}
                    >
                      <path 
                        d="M 50,0 C 49,10 35,60 30,200 L 70,200 C 65,60 51,10 50,0 Z" 
                        fill="url(#core-plume-grad)"
                      />
                    </svg>

                    {/* Gradient Definitions */}
                    <svg className="hidden">
                      <defs>
                        <linearGradient id="outer-plume-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                          <stop offset="35%" stopColor="#f97316" stopOpacity="0.45" />
                          <stop offset="70%" stopColor="#ef4444" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#121212" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="inner-plume-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="25%" stopColor="#facc15" stopOpacity="0.95" />
                          <stop offset="65%" stopColor="#f97316" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#121212" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="core-plume-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="45%" stopColor="#fef08a" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Micro-spark particles floating downward */}
                  <div className="absolute top-[75px] left-1/2 -translate-x-1/2 w-28 h-44 overflow-hidden pointer-events-none z-0">
                    {particles.map((p) => (
                      <div
                        key={p.id}
                        className="absolute bg-amber-400 rounded-full opacity-0"
                        style={{
                          width: p.size,
                          height: p.size,
                          left: `${p.left}%`,
                          bottom: "100%",
                          animation: `floatDown ${p.duration}s linear infinite`,
                          animationDelay: `${p.delay}s`,
                          "--px": `${p.drift}px`,
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>

                  {/* Engine plume smoke puffs billowing downwards and outwards */}
                  <div className="absolute top-[75px] left-1/2 -translate-x-1/2 w-48 h-64 overflow-hidden pointer-events-none z-0 mix-blend-screen">
                    {engineSmokePuffs.map((p) => (
                      <div
                        key={p.id}
                        className="absolute rounded-full blur-[10px] md:blur-[14px] opacity-0"
                        style={{
                          width: p.size,
                          height: p.size,
                          left: "50%",
                          top: "0px",
                          marginLeft: `-${p.size / 2}px`,
                          backgroundImage: p.gradient,
                          animation: `engineSmoke ${p.duration}s ease-out infinite`,
                          animationDelay: `${p.delay}s`,
                          "--edx": `${p.driftX}px`,
                          "--edy": `${p.driftY}px`,
                          "--escale-from": p.scaleFrom,
                          "--escale-to": p.scaleTo,
                          "--emax-opacity": isLaunchingReady ? p.maxOpacity * 2.0 : p.maxOpacity,
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>

                  {/* The Rocket Core - User's SVG Logo (Vibrant Gemini-inspired gradient) */}
                  <div className="relative z-10 w-20 h-20 filter drop-shadow-[0_0_20px_rgba(236,72,153,0.45)]">
                    <svg
                      viewBox="0 0 54 54"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M27.7906 5.5864C27.3385 5.59566 26.9705 5.94626 26.9476 6.38957C26.9252 6.82376 26.931 7.41494 26.9659 8.13723C26.8931 10.1656 26.5626 13.4374 25.9453 17.2112C25.2117 21.696 24.0885 26.7941 22.5679 31.2004C21.4191 29.577 20.1929 28.4157 18.91 27.6731C17.2435 26.7086 15.5252 26.4777 13.8693 26.8112C10.6225 27.4653 7.76289 30.2474 5.79722 33.4524C3.81979 36.6765 2.60077 40.5613 2.81789 43.7159C2.92699 45.3011 3.40569 46.7796 4.42435 47.8705C5.46131 48.9809 6.96111 49.5862 8.88479 49.5862C12.1856 49.5862 15.058 47.5921 17.4611 44.6719C19.5456 42.1388 21.3611 38.812 22.8881 35.1687C24.4118 38.3708 25.8125 42.9783 26.9631 48.8986C27.0408 49.2985 27.3977 49.5874 27.8124 49.5862C28.2272 49.585 28.5823 49.294 28.6576 48.8937C29.7584 43.0412 31.1224 38.6947 32.6181 35.5571C32.6734 35.441 32.7288 35.3267 32.7844 35.2141C33.9741 38.2551 35.3723 41.0847 37.002 43.4109C39.5334 47.0241 42.746 49.5862 46.735 49.5862C49.0063 49.5862 50.6659 48.7462 51.6712 47.2774C52.6429 45.8577 52.9145 43.9789 52.7465 42.0359C52.4103 38.1491 50.279 33.5511 47.3264 30.473C45.8449 28.9287 44.1051 27.7129 42.2159 27.1979C40.2951 26.6742 38.2703 26.8913 36.3266 28.133C35.2287 28.8344 34.1746 29.8505 33.1781 31.2131C32.9903 30.6412 32.8087 30.0643 32.6331 29.4839C31.1555 24.5985 30.1268 19.5283 29.4862 15.3237C29.0303 12.3308 28.776 9.80946 28.6908 8.11823C28.7151 7.3805 28.7073 6.78198 28.667 6.35435C28.6253 5.91237 28.2427 5.57714 27.7906 5.5864ZM27.793 16.1631C28.4469 20.3185 29.5366 25.1923 30.9803 29.9656C31.2947 31.005 31.6299 32.0393 31.9867 33.0583C31.6694 33.6115 31.3591 34.2049 31.0564 34.8399C29.8521 37.3663 28.7521 40.5835 27.8022 44.6049C26.6323 39.6778 25.2531 35.7841 23.7302 33.0518C25.5379 28.2339 26.8337 22.4553 27.6476 17.4795C27.7236 17.0151 27.7251 16.6141 27.793 16.1631ZM33.8779 33.2387C34.9965 31.4475 36.1468 30.2671 37.2671 29.5514C38.7842 28.5822 40.2964 28.4309 41.7544 28.8284C43.244 29.2345 44.7248 30.2297 46.0711 31.6331C48.774 34.4508 50.7272 38.6962 51.0285 42.179C51.1792 43.9208 50.9077 45.3583 50.2401 46.3337C49.6061 47.26 48.5301 47.8939 46.735 47.8939C43.5844 47.8939 40.8246 45.8804 38.4226 42.452C36.6526 39.9255 35.1432 36.7191 33.8779 33.2387ZM21.8304 33.2006C20.2292 37.2858 18.305 40.9532 16.1199 43.6085C13.8575 46.3577 11.4267 47.8939 8.88479 47.8939C7.34927 47.8939 6.34655 47.4243 5.69535 46.727C5.02585 46.01 4.63075 44.9479 4.53811 43.6018C4.35172 40.8937 5.4174 37.3529 7.27435 34.3252C9.14307 31.2783 11.6675 28.9824 14.216 28.469C15.4577 28.2188 16.7398 28.3818 18.0342 29.1309C19.2788 29.8512 20.5723 31.1367 21.8304 33.2006Z"
                        fill="url(#rocket-logo-grad)"
                      />
                      <defs>
                        <linearGradient
                          id="rocket-logo-grad"
                          x1="27.793"
                          y1="5.58621"
                          x2="28"
                          y2="48"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="45%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#fbbf24" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Bottom Loading Progress and State Details (Fades out on launch) */}
          <div className={`flex flex-col items-center gap-2 z-10 transition-all duration-500 ease-out ${
            isLaunching ? "opacity-0 translate-y-8" : "opacity-100"
          }`}>
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">
              {isLaunchingReady 
                ? "Engines Active • Ready" 
                : loadingProgress > 80 
                  ? "T-Minus Ignition" 
                  : "Initializing Systems"}
            </span>
            
            {/* Sleek Gradient Loading Bar */}
            <div className="relative w-44 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <span className="text-xl font-bold tracking-tight text-white/95 mt-1 font-mono">
              {loadingProgress}%
            </span>
          </div>

          {/* Embedded Custom Styles for Rocket & Flame Movement */}
          <style>{`
            @keyframes rocketHover {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-12px); }
            }
            @keyframes rocketVibrate {
              0%, 100% { transform: translate(0, 0); }
              20% { transform: translate(-0.4px, 0.4px); }
              40% { transform: translate(0.4px, -0.4px); }
              60% { transform: translate(-0.4px, -0.4px); }
              80% { transform: translate(0.4px, 0.4px); }
            }
            @keyframes rocketLaunchVibrate {
              0%, 100% { transform: translate(0, 0); }
              10% { transform: translate(-1.5px, 1.2px); }
              20% { transform: translate(1.2px, -1.5px); }
              30% { transform: translate(-1.8px, -1px); }
              40% { transform: translate(1.5px, 1.8px); }
              50% { transform: translate(-1px, 1.5px); }
              60% { transform: translate(1.8px, -1.2px); }
              70% { transform: translate(-1.2px, 1.8px); }
              80% { transform: translate(1px, -1px); }
              90% { transform: translate(-1.5px, 1px); }
            }
            @keyframes plumeFlicker {
              0%, 100% { opacity: 0.95; filter: brightness(1); }
              50% { opacity: 0.75; filter: brightness(1.25); }
            }
            @keyframes floatDown {
              0% {
                transform: translateY(0) scale(1) translateX(0);
                opacity: 0;
              }
              10% {
                opacity: 0.85;
              }
              90% {
                opacity: 0.4;
              }
              100% {
                transform: translateY(140px) scale(0.1) translateX(var(--px, 10px));
                opacity: 0;
              }
            }
            @keyframes engineSmoke {
              0% {
                transform: translateY(0) scale(var(--escale-from, 0.3)) translateX(0);
                opacity: 0;
              }
              15% {
                opacity: var(--emax-opacity, 0.3);
              }
              80% {
                opacity: var(--emax-opacity, 0.3);
              }
              100% {
                transform: translateY(var(--edy, 140px)) scale(var(--escale-to, 2.0)) translateX(var(--edx, 40px));
                opacity: 0;
              }
            }
            @keyframes billowSmoke {
              0% {
                transform: translateY(40px) scale(var(--scale-from, 0.5)) translateX(0);
                opacity: 0;
              }
              25% {
                opacity: var(--max-opacity, 0.3);
              }
              75% {
                opacity: var(--max-opacity, 0.3);
              }
              100% {
                transform: translateY(var(--dy, -80px)) scale(var(--scale-to, 1.4)) translateX(var(--dx, 25px));
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
