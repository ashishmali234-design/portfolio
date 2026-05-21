import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  showText?: boolean;
  forceShowTextOnMobile?: boolean;
  onClick?: () => void;
}

export default function Logo({ className = "", showText = true, forceShowTextOnMobile = false, onClick }: LogoProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`flex items-center gap-3.5 cursor-pointer select-none ${className}`}
    >
      {/* Golden SVG Icon (Wrapped in motion.div for shared landing animation) */}
      <motion.div
        layoutId="rocketLogo"
        className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0"
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 18,
          mass: 1.2
        }}
      >
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
          fill="url(#logo-gold-gradient)"
        />
        <defs>
          <linearGradient
            id="logo-gold-gradient"
            x1="27.793"
            y1="5.58621"
            x2="28"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.137976" stopColor="#FFBF4F" />
            <stop offset="1" stopColor="#84580A" />
          </linearGradient>
        </defs>
      </svg>
      </motion.div>

      {/* Brand Text */}
      {showText && (
        <div className={`${forceShowTextOnMobile ? "flex" : "hidden md:flex"} flex-col text-left leading-tight`}>
          <span className="font-sans font-bold text-sm md:text-base tracking-wide text-white/90">
            Ashish C Mali
          </span>
          <span className="font-sans font-medium text-[10px] md:text-xs tracking-wider text-white/40 uppercase whitespace-nowrap">
            Product Designer
          </span>
        </div>
      )}
    </div>
  );
}
