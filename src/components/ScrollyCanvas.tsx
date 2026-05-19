"use client";

import { useEffect, useRef, useState } from "react";
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

  const totalFrames = 60;

  // Track scroll progress through the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame indices (0 to 59)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const getFramePath = (index: number) => {
      const paddedIndex = String(index).padStart(2, "0");
      return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
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
        setIsLoaded(true);
        onLoadComplete();
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
  }, [onLoadComplete]);

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

      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-[#121212] z-50 flex flex-col justify-center items-center font-sans">
          <div className="relative w-48 h-48 flex justify-center items-center">
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
            
            {/* Text details */}
            <div className="text-center">
              <span className="text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase block mb-1">
                Loading
              </span>
              <span className="text-4xl font-extrabold tracking-tight text-white">
                {loadingProgress}%
              </span>
            </div>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-lg font-bold tracking-widest uppercase text-white/80">
              ASHISH MALI
            </h2>
            <p className="text-xs tracking-wider text-amber-400 mt-1 uppercase">
              Creative Portfolio
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
