"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<"default" | "link" | "video" | "magnetic">("default");
  const [isMobile, setIsMobile] = useState(false);
  
  // Tracking mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for "liquid" feel
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const trailConfig = { damping: 30, stiffness: 100, mass: 1 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, 0);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Interactive elements detection
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        setHoverType("link");
      }
      if (target.closest("#work")) {
        setHoverType("video");
      }
    };

    const handleMouseLeave = () => setHoverType("default");

    const refreshListeners = () => {
      const elements = document.querySelectorAll('a, button, .group, [role="button"]');
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter as unknown as EventListener);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    refreshListeners();
    const interval = setInterval(refreshListeners, 2000); // Re-calculate for dynamic content

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] mix-blend-difference">
      {/* Liquid Trail */}
      <motion.div
        className="absolute w-12 h-12 rounded-full border border-white/10"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverType !== "default" ? 1.5 : 1,
          opacity: hoverType === "default" ? 0.3 : 0.1,
        }}
      />

      {/* Main Interactive Cursor */}
      <motion.div
        className="absolute flex items-center justify-center whitespace-nowrap"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hoverType === "video" ? 80 : 12,
          height: hoverType === "video" ? 80 : 12,
          backgroundColor: hoverType === "default" ? "#fff" : "rgba(255,255,255,0.9)",
          borderRadius: "100%",
        }}
      >
        <AnimatePresence>
          {hoverType === "video" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-black text-[10px] font-black uppercase tracking-widest"
            >
              Play
            </motion.span>
          )}
          {hoverType === "link" && (
            <motion.div
              className="w-16 h-16 rounded-full border border-white flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <div className="w-1 h-1 bg-white rounded-full animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Crosshair Dots (Cinematic Touch) */}
      <motion.div 
        className="absolute h-[1px] bg-white/40"
        style={{ 
          x: cursorX, 
          y: cursorY, 
          width: hoverType === "default" ? 40 : 0,
          translateX: "-50%",
          opacity: 0.2
        }}
      />
      <motion.div 
        className="absolute w-[1px] bg-white/40"
        style={{ 
          x: cursorX, 
          y: cursorY, 
          height: hoverType === "default" ? 40 : 0,
          translateY: "-50%",
          opacity: 0.2
        }}
      />
    </div>
  );
}
