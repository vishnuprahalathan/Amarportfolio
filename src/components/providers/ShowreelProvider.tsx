"use client";

import React, { createContext, useContext, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";
import { VIDEOS } from "@/constants";

interface ShowreelContextType {
  isActive: boolean;
  startShowreel: (startIndex?: number) => void;
  stopShowreel: () => void;
}

const ShowreelContext = createContext<ShowreelContextType | undefined>(undefined);

export function ShowreelProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playlist = [VIDEOS.showreel, ...VIDEOS.projects.map(p => p.preview)];

  const startShowreel = (startIndex = 0) => {
    setCurrentIndex(startIndex);
    setIsActive(true);
    setIsPlaying(true);
  };

  const stopShowreel = () => {
    setIsActive(false);
    setIsPlaying(false);
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <ShowreelContext.Provider value={{ isActive, startShowreel, stopShowreel }}>
      {children}
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-6 md:p-12"
          >
            <div className="absolute top-8 right-8 z-[1010]">
              <button onClick={stopShowreel} className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="relative w-full max-w-6xl aspect-video rounded-lg overflow-hidden glass-dark border border-white/10 shadow-2xl">
              {/* Blurred Background Filler */}
              <video
                src={playlist[currentIndex]}
                autoPlay loop muted playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-125 pointer-events-none"
              />

              {/* Main Crisp Video */}
              <video
                ref={videoRef}
                src={playlist[currentIndex]}
                autoPlay={isPlaying}
                muted={isMuted}
                onEnded={nextVideo}
                className="absolute inset-0 w-full h-full object-contain z-10"
              />
              
              <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-white text-black rounded-full">
                      {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" />}
                    </button>
                    <div className="flex gap-4">
                      <button onClick={prevVideo} className="p-2 text-white/40 hover:text-white transition-colors">
                        <SkipBack size={20} />
                      </button>
                      <button onClick={nextVideo} className="p-2 text-white/40 hover:text-white transition-colors">
                        <SkipForward size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1 block">Sequence</span>
                      <p className="text-sm font-bold">{currentIndex + 1} / {playlist.length}</p>
                    </div>
                    <button onClick={() => setIsMuted(!isMuted)} className="p-3 bg-white/5 rounded-full">
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 text-center pointer-events-none opacity-20 translate-y-4">
              <p className="text-sm font-mono tracking-[0.5em] uppercase">Cinematic Sequence Mode // Playing Library</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ShowreelContext.Provider>
  );
}

export const useShowreel = () => {
  const context = useContext(ShowreelContext);
  if (!context) throw new Error("useShowreel must be used within a ShowreelProvider");
  return context;
};
