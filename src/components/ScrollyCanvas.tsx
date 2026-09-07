"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Overlay from "./Overlay";
import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";
import WhatIDo from "./WhatIDo";
import AboutMe from "./AboutMe";
import Contact from "./Contact";
import CustomCursor from "./CustomCursor";

const frameCount = 60;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLaunchingReady, setIsLaunchingReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Audio elements
  const launchAudioRef = useRef<HTMLAudioElement | null>(null);
  const rocketPassRef = useRef<HTMLAudioElement | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Sounds initialization
  useEffect(() => {
    launchAudioRef.current = new Audio("/sounds/launch.mp3");
    launchAudioRef.current.volume = 0.4;

    rocketPassRef.current = new Audio("/sounds/rocket-pass.mp3");
    rocketPassRef.current.volume = 0.3;

    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("scroll", handleFirstInteraction, { passive: true });
    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  // Preload images with concurrency pooling and fallback recovery
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const loadedFrames: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);

    const getFramePath = (index: number) => {
      const paddedIndex = String(index).padStart(2, "0");
      return `/sequence/frame_${paddedIndex}_delay-0.066s.webp`;
    };

    const loadSingleImage = (index: number, attempt = 0): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        if (isCancelled) return resolve(null);
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          if (isCancelled) return resolve(null);
          loadedFrames[index] = img;
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
          resolve(img);
        };
        img.onerror = () => {
          if (isCancelled) return resolve(null);
          if (attempt < 3) {
            setTimeout(() => {
              loadSingleImage(index, attempt + 1).then(resolve);
            }, 100 * Math.pow(2, attempt));
          } else {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
            resolve(null);
          }
        };
      });
    };

    const loadAllFrames = async () => {
      const concurrency = 6;
      const queue = Array.from({ length: frameCount }, (_, i) => i);

      const worker = async () => {
        while (queue.length > 0 && !isCancelled) {
          const index = queue.shift();
          if (index !== undefined) {
            await loadSingleImage(index);
          }
        }
      };

      await Promise.all(
        Array.from({ length: Math.min(concurrency, frameCount) }, () => worker())
      );

      if (isCancelled) return;

      let lastValidImg: HTMLImageElement | null = null;
      for (let i = 0; i < frameCount; i++) {
        if (loadedFrames[i]) {
          lastValidImg = loadedFrames[i];
        } else if (lastValidImg) {
          loadedFrames[i] = lastValidImg;
        }
      }
      if (lastValidImg) {
        for (let i = frameCount - 1; i >= 0; i--) {
          if (!loadedFrames[i]) {
            loadedFrames[i] = lastValidImg;
          } else {
            lastValidImg = loadedFrames[i];
          }
        }
      }

      const validFrames = loadedFrames.filter(Boolean) as HTMLImageElement[];
      if (validFrames.length > 0) {
        setImages(validFrames);
        setIsLaunchingReady(true);
      }
    };

    loadAllFrames();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Canvas render logic
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index] || images[0];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Object-fit: cover equivalent
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // Scroll listener for frame scrubbing
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current || images.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const currentScroll = -rect.top;

      let progress = currentScroll / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      const frameIndex = Math.min(
        images.length - 1,
        Math.floor(progress * images.length)
      );

      setCurrentFrameIndex(frameIndex);

      // Play sound on rocket liftoff frame
      if (hasUserInteracted && frameIndex > 10 && frameIndex < 15) {
        if (launchAudioRef.current && launchAudioRef.current.paused) {
          launchAudioRef.current.play().catch(() => {});
        }
      }

      animationFrameId = requestAnimationFrame(() => {
        renderFrame(frameIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, hasUserInteracted]);

  // Initial resize and render
  useEffect(() => {
    if (images.length > 0) {
      renderFrame(0);
    }
  }, [images]);

  return (
    <div className="relative w-full bg-[#121212] selection:bg-red-500 selection:text-white">
      <CustomCursor />

      {/* Hero sequence container */}
      <div ref={containerRef} className="relative h-[450vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: isLaunchingReady ? 1 : 0 }}
          />

          {/* Initial Loading Screen */}
          {!isLaunchingReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-50">
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-red-600 transition-all duration-300 rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-white/50 font-mono">
                Initiating System {loadingProgress}%
              </p>
            </div>
          )}

          {/* Hero text overlay */}
          <Overlay />
        </div>
      </div>

      {/* Main sections */}
      <WhatIDo />
      <Projects />
      <Experience />
      <Skills />
      <AboutMe />
      <Contact />
    </div>
  );
}
