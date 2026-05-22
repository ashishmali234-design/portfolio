"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Plus,
  Check,
  Search,
  Bell,
  ChevronLeft,
  Star,
  ExternalLink,
  Smartphone,
  Monitor,
  BookOpen,
  Sparkles,
  X,
  Volume2,
  VolumeX,
  ThumbsUp,
  RotateCcw
} from "lucide-react";

interface PrimeVideoRedesignProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Movie {
  id: string;
  title: string;
  thumbnail: string;
  rating: string;
  match: string;
  year: string;
  duration: string;
  description: string;
  category: string;
  tags: string[];
  glowColor: string;
}

export default function PrimeVideoRedesign({ isOpen, onClose }: PrimeVideoRedesignProps) {
  const [activeTab, setActiveTab] = useState<"demo" | "figma" | "case-study">("demo");
  const [figmaView, setFigmaView] = useState<"desktop" | "mobile">("desktop");
  const [activeCarousel, setActiveCarousel] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [likedMovies, setLikedMovies] = useState<string[]>([]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Core Carousel Items
  const carouselItems = [
    {
      title: "THE BOYS: SEASON 4",
      tagline: "SUPE-SAVIORS OR CORPORATE WEAPONS?",
      desc: "In a world where superheroes abuse their superpowers and celebrity status, a vigilante group called The Boys embarks on a heroic quest to expose the truth about Vought International.",
      rating: "18+",
      imdb: "8.7",
      match: "98% Match",
      genre: "Sci-Fi / Action / Dark Comedy",
      image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1920&auto=format&fit=crop",
      glowColor: "rgba(220, 38, 38, 0.4)", // Ruby Red glow
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-digital-cyber-panel-background-40098-large.mp4"
    },
    {
      title: "CITADEL",
      tagline: "TRUST NO ONE. REMEMBER EVERYTHING.",
      desc: "Eight years ago, Citadel, an independent spy agency, was destroyed by a syndicate called Manticore. Now, two elite agents must piece together their wiped memories to fight back.",
      rating: "16+",
      imdb: "7.9",
      match: "94% Match",
      genre: "Spy Thriller / Action / Suspense",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format&fit=crop",
      glowColor: "rgba(6, 182, 212, 0.4)", // Cyan glow
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41764-large.mp4"
    },
    {
      title: "THE RINGS OF POWER",
      tagline: "DARKNESS REROUTES THE DESTINY OF MIDDLE-EARTH.",
      desc: "Epic drama set thousands of years before the events of J.R.R. Tolkien's The Hobbit and The Lord of the Rings, following an ensemble cast as they confront the re-emergence of evil.",
      rating: "13+",
      imdb: "8.2",
      match: "96% Match",
      genre: "Epic Fantasy / Adventure",
      image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1920&auto=format&fit=crop",
      glowColor: "rgba(245, 158, 11, 0.4)", // Golden Amber glow
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fire-sparks-and-particles-4127-large.mp4"
    }
  ];

  // Movie Library with gorgeous thumbnails
  const moviesList: Movie[] = [
    {
      id: "m1",
      title: "The Boys",
      thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&auto=format&fit=crop",
      rating: "18+",
      match: "98%",
      year: "2024",
      duration: "8 episodes",
      description: "A fun, bloody, and hyper-realistic take on superheroes.",
      category: "Sci-Fi & Fantasy",
      tags: ["Action", "Sci-Fi", "Dark"],
      glowColor: "rgba(239, 68, 68, 0.6)"
    },
    {
      id: "m2",
      title: "Citadel",
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop",
      rating: "16+",
      match: "94%",
      year: "2023",
      duration: "6 episodes",
      description: "Elite spies fight back after memory wipes.",
      category: "Action & Adventure",
      tags: ["Thriller", "Action", "Espionage"],
      glowColor: "rgba(6, 182, 212, 0.6)"
    },
    {
      id: "m3",
      title: "The Rings of Power",
      thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&auto=format&fit=crop",
      rating: "13+",
      match: "96%",
      year: "2024",
      duration: "8 episodes",
      description: "Confront the legendary re-emergence of evil in Middle-earth.",
      category: "Sci-Fi & Fantasy",
      tags: ["Fantasy", "Adventure", "Epic"],
      glowColor: "rgba(245, 158, 11, 0.6)"
    },
    {
      id: "m4",
      title: "Jack Ryan",
      thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop",
      rating: "16+",
      match: "91%",
      year: "2023",
      duration: "4 Seasons",
      description: "Tom Clancy's hero uncovers complex global conspiracies.",
      category: "Action & Adventure",
      tags: ["Spy", "Action", "Military"],
      glowColor: "rgba(59, 130, 246, 0.6)"
    },
    {
      id: "m5",
      title: "Invincible",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop",
      rating: "18+",
      match: "95%",
      year: "2024",
      duration: "2 Seasons",
      description: "An animated supe-show packed with heavy emotions and brutal impacts.",
      category: "Sci-Fi & Fantasy",
      tags: ["Animation", "Sci-Fi", "Gory"],
      glowColor: "rgba(168, 85, 247, 0.6)"
    },
    {
      id: "m6",
      title: "Fleabag",
      thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop",
      rating: "18+",
      match: "89%",
      year: "2019",
      duration: "2 Seasons",
      description: "Dry-witted, award-winning comedy about love and healing.",
      category: "Trending",
      tags: ["Comedy", "Drama", "Witty"],
      glowColor: "rgba(236, 72, 153, 0.6)"
    },
    {
      id: "m7",
      title: "Reacher",
      thumbnail: "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?w=400&auto=format&fit=crop",
      rating: "18+",
      match: "97%",
      year: "2024",
      duration: "2 Seasons",
      description: "Jack Reacher uses his massive build and sharp brains to bring justice.",
      category: "Action & Adventure",
      tags: ["Crime", "Action", "Justice"],
      glowColor: "rgba(16, 185, 129, 0.6)"
    },
    {
      id: "m8",
      title: "The Marvelous Mrs. Maisel",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&auto=format&fit=crop",
      rating: "15+",
      match: "93%",
      year: "2023",
      duration: "5 Seasons",
      description: "A 1950s housewife pursues a wild career in stand-up comedy.",
      category: "Trending",
      tags: ["Comedy", "Drama", "Stand-Up"],
      glowColor: "rgba(244, 63, 94, 0.6)"
    }
  ];

  // Auto-scroll carousel
  useEffect(() => {
    if (isTrailerPlaying) return;
    const interval = setInterval(() => {
      setActiveCarousel((prev) => (prev + 1) % carouselItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isTrailerPlaying, carouselItems.length]);

  // Prevent background scrolling when overlay is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Toggle watchlist helper
  const toggleWatchlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle like helper
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMovies((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtering logic
  const filteredMovies = moviesList.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCategory === "All") return matchesSearch;
    return movie.category === selectedCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 120 }}
        className="fixed inset-0 z-50 bg-[#070709] overflow-y-auto flex flex-col font-sans text-neutral-100 select-none text-left"
      >
        {/* Navigation & Controls Top Bar */}
        <div className="sticky top-0 z-[100] bg-[#070709]/95 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 w-full md:w-auto">
            {/* Immersive Pill Back Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 active:scale-95 shrink-0"
            >
              <ChevronLeft size={16} /> Back to Portfolio
            </button>
            <div className="h-5 w-[1px] bg-white/10 hidden md:block" />
            <h2 className="text-sm font-black tracking-[0.2em] text-cyan-400 uppercase truncate">
              Prime Video Redesign <span className="font-light text-white/50 text-[10px]">Case Study & Demo</span>
            </h2>
          </div>

          {/* Core Tab Toggles */}
          <div className="flex bg-[#121216] border border-white/5 p-1 rounded-full w-full md:w-auto overflow-x-auto shrink-0">
            <button
              onClick={() => setActiveTab("demo")}
              className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 w-full md:w-auto whitespace-nowrap ${
                activeTab === "demo"
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles size={14} /> Interactive Demo
            </button>
            <button
              onClick={() => setActiveTab("figma")}
              className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 w-full md:w-auto whitespace-nowrap ${
                activeTab === "figma"
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Smartphone size={14} /> Figma Prototypes
            </button>
            <button
              onClick={() => setActiveTab("case-study")}
              className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 w-full md:w-auto whitespace-nowrap ${
                activeTab === "case-study"
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen size={14} /> UX Insights
            </button>
          </div>
        </div>

        {/* Dynamic Inner Content */}
        <div className="flex-1 flex flex-col bg-[#070709]">
          
          {/* TAB 1: FULLY INTERACTIVE LIVE DEMO */}
          {activeTab === "demo" && (
            <div className="flex-1 flex flex-col pb-24 relative overflow-hidden">
              {/* Dynamic Glow Overlay matching active carousel item */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] rounded-full blur-[160px] pointer-events-none z-0 transition-all duration-1000"
                style={{
                  background: `radial-gradient(circle, ${carouselItems[activeCarousel].glowColor} 0%, rgba(7,7,9,0) 70%)`
                }}
              />

              {/* Streaming Portal Header (Redesigned) */}
              <header className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
                {/* Logo & Navigation Links */}
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-1">
                    <svg className="w-24 h-7 text-[#00A8E1]" viewBox="0 0 256 75" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.3 22.8c1.6 0 3.2.1 4.7.4V14c-1.5-.2-3.1-.3-4.7-.3C5.6 13.7.8 17.6.8 25.5c0 6.6 3.6 11.2 10.6 11.2 4.1 0 7-1.7 8.7-3.9v3.4h7.5V11h-7.8v3c-1.7-2.1-4.7-3.8-8.8-3.8-7 0-11 4.8-11 12.3.1 7.2 4.4 10.3 11.7 10.3zm4.7-6.1v10.3c-.6.9-1.8 1.9-3.4 1.9-2.8 0-4-1.5-4-5.2 0-3.6 1.2-5.1 4-5.1 1.7 0 2.8.9 3.4 3.1zM50.2 11.4c-4.2 0-7.3 2.1-8.7 4.5v-4.1h-7.6V36h7.8V22c0-4.6 2.2-6.5 5.5-6.5 3 0 4.3 1.9 4.3 5.4V36h7.8V19.4c.1-5.6-2.5-8-9.1-8zM95.6 11c-4.3 0-7.3 2-8.9 4.3v-3.5h-7.5V36H87V22c0-4.6 2.3-6.5 5.6-6.5 3 0 4.2 1.9 4.2 5.4V36H105.1V22c0-4.6 2.3-6.5 5.6-6.5 3 0 4.2 1.9 4.2 5.4V36h7.8V19.4c0-5.6-2.6-8-9.1-8a8.8 8.8 0 0 0-8.8 4.4c-1.3-2.6-4.5-4.4-9.2-4.4zM152.1 11.1c-10 0-16.7 6.4-16.7 12.9 0 6.3 6.6 12.8 16.7 12.8 9.9 0 16.7-6.5 16.7-12.8S162 11.1 152.1 11.1zm0 18.2c-5.2 0-8.5-3.3-8.5-5.3 0-2.1 3.3-5.3 8.5-5.3 5.1 0 8.5 3.2 8.5 5.3 0 2.1-3.3 5.3-8.5 5.3z" />
                      <path d="M239.5.8h-11.4l-11.7 27.6L204.7.8H193L211.2 36l-3 7c-2.3 5.3-5.5 6.6-8.8 6.6-1.5 0-2.8-.2-3.8-.4V56c1.1.2 2.6.3 4.2.3 8.3 0 12.7-4.1 16-11.6l23.7-43.9zM245.3 11c-10 0-16.7 6.4-16.7 12.9 0 6.3 6.6 12.8 16.7 12.8 9.9 0 16.7-6.5 16.7-12.8S255.2 11c-9.9 0-16.7 6.4-16.7 12.9zm0 18.2c-5.2 0-8.5-3.3-8.5-5.3 0-2.1 3.3-5.3 8.5-5.3 5.1 0 8.5 3.2 8.5 5.3 0 2.1-3.3 5.3-8.5 5.3z" />
                      <path d="M22.8 47C59 62.7 106.8 67 151.7 61.5c34.7-4.2 73-14.7 93.3-29.3.8-.6 1.8-.1 1.7 1C244 49 203.2 64.7 151.7 69c-43 3.6-91.8.8-129.4-16.3-.9-.4-1.2-1.3-.5-1.7v3.2c0-3.3 0-3.3-.5-3.3z" fill="#FF9900" />
                    </svg>
                  </div>
                  <nav className="hidden lg:flex items-center gap-7 text-[13px] font-bold text-white/70 tracking-wide">
                    <a href="#demo" className="text-white border-b-2 border-[#00A8E1] pb-1">Home</a>
                    <a href="#demo" className="hover:text-white transition-colors">Movies</a>
                    <a href="#demo" className="hover:text-white transition-colors">TV Shows</a>
                    <a href="#demo" className="hover:text-white transition-colors">Sports</a>
                    <a href="#demo" className="hover:text-white transition-colors">My Stuff</a>
                  </nav>
                </div>

                {/* Search, Notifications, Profile */}
                <div className="flex items-center gap-5">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-full py-1.5 px-3.5 hover:border-white/20 transition-all duration-300">
                    <Search size={16} className="text-neutral-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search title, genre..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs w-28 md:w-44 text-white placeholder-neutral-500 focus:placeholder-neutral-400"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="text-neutral-400 hover:text-white">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <button className="p-2 rounded-full hover:bg-white/5 text-neutral-300 hover:text-white transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-xs text-black border border-cyan-400 cursor-pointer shadow-lg shadow-cyan-500/10">
                    AM
                  </div>
                </div>
              </header>

              {/* Cinematic Hero Slider Area */}
              <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-4 z-20">
                <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-white/5 group/hero shadow-[0_24px_50px_rgba(0,0,0,0.8)] bg-black">
                  {/* Dynamic Slide Background */}
                  <AnimatePresence mode="wait">
                    {!isTrailerPlaying ? (
                      <motion.div
                        key={`hero-bg-${activeCarousel}`}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${carouselItems[activeCarousel].image})` }}
                      >
                        {/* Immersive overlay gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/95 via-[#070709]/30 to-transparent" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black"
                      >
                        {/* Mock Trailer Video Loop */}
                        <video
                          src={carouselItems[activeCarousel].videoUrl}
                          autoPlay
                          loop
                          muted={isMuted}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/90 via-transparent to-transparent opacity-80" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Interactive Carousel Content Info Card */}
                  <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 md:px-16 max-w-lg md:max-w-xl z-20">
                    <motion.div
                      key={`hero-info-${activeCarousel}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-4"
                    >
                      {/* Original Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest leading-none">
                        <Sparkles size={10} /> Prime Original
                      </span>

                      <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">
                        {carouselItems[activeCarousel].title}
                      </h1>
                      <p className="text-[#00A8E1] text-[11px] md:text-xs font-black tracking-[0.25em] uppercase">
                        {carouselItems[activeCarousel].tagline}
                      </p>

                      {/* Movie Metrics */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 font-semibold pt-1">
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold text-[10px]">
                          {carouselItems[activeCarousel].rating}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-400">
                          <Star size={14} fill="currentColor" /> {carouselItems[activeCarousel].imdb}
                        </span>
                        <span className="text-cyan-400 font-bold">{carouselItems[activeCarousel].match}</span>
                        <span className="text-white/40">•</span>
                        <span>{carouselItems[activeCarousel].genre}</span>
                      </div>

                      <p className="text-xs md:text-sm text-neutral-300 font-light leading-relaxed max-w-sm">
                        {carouselItems[activeCarousel].desc}
                      </p>

                      {/* Hero Actions */}
                      <div className="flex flex-wrap items-center gap-3.5 pt-3">
                        <button
                          onClick={() => setIsTrailerPlaying(!isTrailerPlaying)}
                          className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg shadow-cyan-500/15"
                        >
                          {isTrailerPlaying ? (
                            <>
                              <RotateCcw size={16} fill="currentColor" /> Restart Teaser
                            </>
                          ) : (
                            <>
                              <Play size={16} fill="currentColor" /> Play Trailer
                            </>
                          )}
                        </button>

                        <button
                          onClick={(e) => toggleWatchlist(`carousel-${activeCarousel}`, e)}
                          className="flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                          title="Add to Watchlist"
                        >
                          {watchlist.includes(`carousel-${activeCarousel}`) ? (
                            <Check size={16} className="text-cyan-400" />
                          ) : (
                            <Plus size={16} />
                          )}
                        </button>

                        {isTrailerPlaying && (
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                            title={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Indicator Dots */}
                  <div className="absolute bottom-6 right-8 flex gap-2.5 z-20">
                    {carouselItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveCarousel(idx);
                          setIsTrailerPlaying(false);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === activeCarousel ? "w-6 bg-cyan-400" : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Lean UX Category Filter Bar */}
              <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-4">
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                  <h3 className="text-lg font-bold tracking-tight text-white uppercase flex items-center gap-2">
                    Discover Collection <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                    Showing {filteredMovies.length} Titles
                  </span>
                </div>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none select-none">
                  {["All", "Action & Adventure", "Sci-Fi & Fantasy", "Trending"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4.5 py-2 rounded-full text-xs font-semibold border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-white text-black border-white shadow-lg shadow-white/5 font-bold"
                          : "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Content Grid (Animated Filtiltering) */}
              <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-2">
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredMovies.map((movie) => (
                      <motion.div
                        layout
                        key={movie.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="group/card relative rounded-2xl overflow-hidden border border-white/5 bg-[#121216]/90 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col h-full shadow-lg"
                      >
                        {/* Movie Thumbnail */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                          <img
                            src={movie.thumbnail}
                            alt={movie.title}
                            className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover/card:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-60" />
                          
                          {/* Active Hover Glow */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover/card:opacity-30 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background: `radial-gradient(circle at center, ${movie.glowColor} 0%, transparent 80%)`
                            }}
                          />
                        </div>

                        {/* Card Details */}
                        <div className="p-4 flex flex-col flex-grow relative z-10">
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <h4 className="text-sm font-bold text-white tracking-wide truncate group-hover/card:text-cyan-400 transition-colors duration-200">
                              {movie.title}
                            </h4>
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-white/10 text-white/80 shrink-0 uppercase tracking-widest">
                              {movie.rating}
                            </span>
                          </div>

                          <p className="text-[10px] text-neutral-400 font-light leading-relaxed mb-4 flex-grow line-clamp-2">
                            {movie.description}
                          </p>

                          {/* Controls Row */}
                          <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-white/[0.04]">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-cyan-400">{movie.match} Match</span>
                              <span className="text-white/20">•</span>
                              <span className="text-[10px] text-neutral-400">{movie.year}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Add Watchlist */}
                              <button
                                onClick={(e) => toggleWatchlist(movie.id, e)}
                                className="p-1.5 rounded-full bg-white/5 border border-white/5 text-neutral-300 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all cursor-pointer"
                                title="Add to Watchlist"
                              >
                                {watchlist.includes(movie.id) ? (
                                  <Check size={12} className="text-cyan-400" />
                                ) : (
                                  <Plus size={12} />
                                )}
                              </button>

                              {/* Like */}
                              <button
                                onClick={(e) => toggleLike(movie.id, e)}
                                className="p-1.5 rounded-full bg-white/5 border border-white/5 text-neutral-300 hover:text-white hover:border-red-500/30 hover:bg-red-500/10 transition-all cursor-pointer"
                                title="Like Title"
                              >
                                <ThumbsUp
                                  size={12}
                                  className={likedMovies.includes(movie.id) ? "text-red-400 fill-red-400" : ""}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          )}

          {/* TAB 2: FIGMA INTERACTIVE EMBEDS */}
          {activeTab === "figma" && (
            <div className="flex-1 flex flex-col p-6 md:p-12 pb-24 bg-[#0a0a0d]">
              {/* Figma View Controls */}
              <div className="max-w-7xl mx-auto w-full mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-2xl font-light text-white">
                    Figma <span className="font-extrabold text-cyan-400">Interactive Prototypes</span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    Play directly with the user flows designed in the Prime Video Lean UX case study.
                  </p>
                </div>

                <div className="flex bg-[#121216] border border-white/5 p-1 rounded-lg">
                  <button
                    onClick={() => setFigmaView("desktop")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      figmaView === "desktop"
                        ? "bg-white/10 text-white font-extrabold"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <Monitor size={14} /> Desktop Prototype
                  </button>
                  <button
                    onClick={() => setFigmaView("mobile")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      figmaView === "mobile"
                        ? "bg-white/10 text-white font-extrabold"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <Smartphone size={14} /> Mobile Prototype
                  </button>
                </div>
              </div>

              {/* Viewport Render */}
              <div className="flex-1 flex justify-center items-center w-full max-w-7xl mx-auto relative min-h-[500px]">
                {figmaView === "desktop" ? (
                  /* Desktop Embed Frame */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full min-h-[600px] rounded-3xl overflow-hidden border border-white/5 bg-[#121216]/50 p-3 shadow-2xl relative"
                  >
                    <div className="absolute top-4 left-6 flex gap-1.5 z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <iframe
                      style={{ border: "none" }}
                      width="100%"
                      height="100%"
                      src="https://embed.figma.com/proto/mqD4Qed8LIwK2LCaXbB2bc/Prime-Video?node-id=519-1046&viewport=-163%2C261%2C0.17&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                      allowFullScreen
                      className="w-full h-full min-h-[580px] rounded-2xl bg-black"
                    />
                  </motion.div>
                ) : (
                  /* Mobile Embed Frame inside high-fidelity Phone Frame */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-[340px] h-[680px] rounded-[50px] border-[10px] border-[#1f2025] bg-[#121216] shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-2.5"
                  >
                    {/* Speaker/Camera Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#1f2025] rounded-b-2xl z-20 flex items-center justify-center">
                      <div className="w-12 h-1 bg-white/10 rounded-full" />
                    </div>
                    
                    <iframe
                      style={{ border: "none" }}
                      width="100%"
                      height="100%"
                      src="https://embed.figma.com/proto/mqD4Qed8LIwK2LCaXbB2bc/Prime-Video?node-id=442-6739&viewport=55%2C271%2C0.41&scaling=scale-down&content-scaling=fixed&page-id=107%3A528&embed-host=share"
                      allowFullScreen
                      className="w-full h-full rounded-[38px] bg-black"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: BEHANCE CASE STUDY INSIGHTS */}
          {activeTab === "case-study" && (
            <div className="flex-1 max-w-4xl mx-auto px-6 md:px-12 py-16 pb-32">
              <div className="space-y-16">
                
                {/* Intro */}
                <div className="text-left space-y-4">
                  <span className="text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase block">
                    Product Design Case Study
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
                    Prime Video <span className="font-light text-neutral-400">Lean UX Redesign</span>
                  </h3>
                  <p className="text-lg text-neutral-300 font-light leading-relaxed">
                    A comprehensive strategic overhaul of Amazon Prime Video&apos;s landing portal, solving content discoversability and subscription flow clutter through structured UX refinement.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://www.behance.net/gallery/219780733/Prime-Video-Redesigned-Landing-Page-%28Lean-UX%29"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 tracking-wider uppercase transition-colors"
                    >
                      View Original Behance Presentation <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Grid Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  
                  {/* Problem */}
                  <div className="glass-card p-8 rounded-3xl space-y-4 border border-white/5">
                    <h4 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> The Problem
                    </h4>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed">
                      Amazon Prime Video&apos;s landing portal suffers from severe cognitive load. Visual hierarchy is cluttered, the global navigation is highly nested and obscure, and original content tags compete aggressively with rented assets, creating transactional friction.
                    </p>
                  </div>

                  {/* Core Idea */}
                  <div className="glass-card p-8 rounded-3xl space-y-4 border border-white/5">
                    <h4 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> The Lean Solution
                    </h4>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed">
                      We restructured the landing portal around high-impact immersive rows and a clean, dynamic category system. The global header was simplified to expose active streaming choices immediately, and movie cards were enhanced with visual ratings, matching factors, and instant watchlist shortcuts.
                    </p>
                  </div>
                </div>

                {/* Key UX Enhancements */}
                <div className="space-y-6 text-left">
                  <h4 className="text-2xl font-bold tracking-tight text-white uppercase">
                    Core UX Enhancements
                  </h4>
                  
                  <div className="space-y-4">
                    {[
                      {
                        title: "1. Immersive Hero Teaser Carousel",
                        desc: "High-impact key art with dynamic backlighting colors that match the cinematic content. Direct action options for trailers and watchlists reduce discovery loops."
                      },
                      {
                        title: "2. Flattened Information Architecture",
                        desc: "Simplified structural channels ('Movies', 'TV Shows', 'Sports', 'My Stuff') directly visible in the global navigation bar, providing instantaneous paths."
                      },
                      {
                        title: "3. Interactive Ratings & Badging System",
                        desc: "Clear visual indicators for IMDb score, maturity constraints, and personal match percentage on hovering, optimizing critical selection criteria."
                      },
                      {
                        title: "4. Clean Premium Subscription Flow",
                        desc: "Removed complex checkout widgets and replaced them with seamless, glassmorphic selection panels that highlight the raw value of the Prime tier."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                        <h5 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">
                          {item.title}
                        </h5>
                        <p className="text-xs text-neutral-300 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Design Philosophy Footer */}
                <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/10 flex flex-col md:flex-row items-center gap-6 text-left">
                  <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-white uppercase tracking-wide mb-1">
                      Lean Research, Iterative Designs
                    </h5>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      By focusing heavily on rapid prototyping and user journey mappings, we transformed the landing portal from a complex e-commerce catalog layout into an immersive, premium cinema experience.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
