"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Clapperboard } from "lucide-react";
import { SITE_CONFIG, VIDEOS } from "@/constants";
import Magnetic from "@/components/ui/Magnetic";
import { useShowreel } from "@/components/providers/ShowreelProvider";

export default function ShowreelHero() {
  const { startShowreel } = useShowreel();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = VIDEOS.showreel;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <nav className="fixed top-0 left-0 right-0 z-[60] py-8 px-12 flex items-center justify-between">
        <Magnetic>
          <motion.div 
            className="group relative flex items-center justify-center px-6 py-3 cursor-pointer overflow-hidden rounded-sm border border-white/10 bg-black/20 backdrop-blur-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
            <motion.span 
              className="relative z-10 text-white font-black tracking-[0.2em] text-sm group-hover:tracking-[0.4em] transition-all duration-700"
            >
              AMAR
            </motion.span>
          </motion.div>
        </Magnetic>
        
        <div className="hidden md:flex items-center gap-12">
          {["Projects", "About", "Services"].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-6">
          <Magnetic>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all">
              Hire me
            </button>
          </Magnetic>
        </div>
      </nav>

      <motion.div 
        className="absolute inset-0 bg-black z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 1 }}
      />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover scale-[1.05] will-change-transform"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
        >
          <span className="text-sm font-mono tracking-[0.4em] uppercase opacity-60 mb-6 block">
            Crafting Stories Through Motion
          </span>
          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-8 text-white uppercase">
            {SITE_CONFIG.name}
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Magnetic>
              <button 
                onClick={() => startShowreel(0)}
                className="bg-white text-black px-10 py-5 rounded-sm font-black uppercase tracking-[0.2em] text-xs hover:bg-neutral-200 transition-all flex items-center gap-3"
              >
                <Clapperboard size={18} />
                Watch Showreel
              </button>
            </Magnetic>
            
            <motion.div 
              className="w-12 h-[1px] bg-white hidden md:block opacity-20"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1, delay: 2.5 }}
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-12 z-20 flex gap-6">
        <Magnetic>
          <button 
            onClick={toggleMute}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all group"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            <span className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-mono uppercase tracking-widest translate-y-1">
              {isMuted ? "Unmute Sound" : "Mute Sound"}
            </span>
          </button>
        </Magnetic>
        
        <Magnetic>
          <button 
            onClick={togglePlay}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all group"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            <span className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-mono uppercase tracking-widest translate-y-1">
              {isPlaying ? "Pause Intro" : "Play Intro"}
            </span>
          </button>
        </Magnetic>
      </div>

      <motion.div 
        className="absolute bottom-12 right-12 z-20 flex items-center gap-4 group cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3 }}
        whileHover={{ opacity: 1 }}
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em]">Scroll to Discover</span>
        <div className="w-12 h-[1px] bg-white group-hover:w-16 transition-all" />
      </motion.div>
    </section>
  );
}
