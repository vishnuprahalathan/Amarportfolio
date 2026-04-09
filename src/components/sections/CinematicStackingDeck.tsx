"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { VIDEOS } from "@/constants";

const projects = VIDEOS.projects.slice(0, 4);

export default function CinematicStackingDeck() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    // CRITICAL: Set initial opacities via GSAP before paint
    videoLayerRefs.current.forEach((layer, i) => {
      if (layer) gsap.set(layer, { opacity: i === 0 ? 1 : 0 });
    });

    // Start only first video
    const firstVideo = videoRefs.current[0];
    if (firstVideo) firstVideo.play().catch(() => {});

    const ctx = gsap.context(() => {
      // Pin this section while we scroll through all 4 projects
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (projects.length - 1)}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.6,
        onUpdate: (self) => {
          // Float index: 0.0 → 3.0 as scroll goes 0 → 100%
          const floatIndex = self.progress * (projects.length - 1);

          // Crossfade layers: opacity = 1 - |i - floatIndex|, clamped 0-1
          videoLayerRefs.current.forEach((layer, i) => {
            if (!layer) return;
            const dist = Math.abs(i - floatIndex);
            // Crossfade window of 0.5 — feels cinematic
            const opacity = Math.max(0, 1 - dist * 2);
            gsap.set(layer, { opacity });
          });

          // Use integer index for switching playback + text
          const newIndex = Math.min(
            projects.length - 1,
            Math.round(floatIndex)
          );

          if (newIndex !== activeIndexRef.current) {
            const prevIdx = activeIndexRef.current;
            activeIndexRef.current = newIndex;

            // Pause old, play new video
            const oldVid = videoRefs.current[prevIdx];
            const newVid = videoRefs.current[newIndex];
            if (oldVid) oldVid.pause();
            if (newVid) newVid.play().catch(() => {});

            // Update text content (React re-render)
            setActiveIndex(newIndex);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // height: 100vh (visible) — GSAP pin extends the scroll distance itself
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* ── Video Layers (all stacked, opacity-controlled) ── */}
      {projects.map((project, index) => (
        <div
          key={index}
          ref={(el) => { videoLayerRefs.current[index] = el; }}
          className="absolute inset-0 w-full h-full pointer-events-none"
          // All same z-index — opacity drives visibility, not z-order
          style={{ zIndex: 1 }}
        >
          <video
            ref={(el) => { videoRefs.current[index] = el; }}
            src={project.preview}
            muted
            loop
            playsInline
            // First video eager, rest metadata-only until needed
            preload={index === 0 ? "auto" : "metadata"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* ── Lens Vignette ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ── Bottom gradient for text legibility ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10 pointer-events-none" />

      {/* ── Film grain ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── Top-left: sequence counter ── */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-30 pointer-events-none flex items-center gap-3">
        <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/40">
          {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;
          {String(projects.length).padStart(2, "0")}
        </span>
        <span className="hidden md:inline text-[9px] font-mono uppercase tracking-[0.3em] text-white/20">
          {projects[activeIndex].type}
        </span>
      </div>

      {/* ── Right edge: vertical progress bars ── */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-30 flex flex-col gap-2 pointer-events-none">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-700 ${
              i === activeIndex
                ? "w-[2px] h-10 bg-white"
                : i < activeIndex
                ? "w-[2px] h-4 bg-white/50"
                : "w-[2px] h-4 bg-white/15"
            }`}
          />
        ))}
      </div>

      {/* ── Bottom: animated title + role ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-8 md:p-16 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-end justify-between gap-6 md:gap-16"
          >
            <div>
              <h3 className="text-5xl md:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-2xl">
                {projects[activeIndex].title}
              </h3>
              <p className="mt-4 text-xs font-light text-white/50 uppercase tracking-[0.35em]">
                {projects[activeIndex].role}
              </p>
            </div>

            {activeIndex === 0 && (
              <div className="flex items-center gap-3 shrink-0 opacity-40">
                <div className="w-6 h-px bg-white" />
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white">
                  Scroll to explore
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Film-strip progress bar */}
        <div className="mt-6 md:mt-10 flex gap-2">
          {projects.map((_, i) => (
            <div key={i} className="h-px flex-1 relative bg-white/10 overflow-hidden">
              <div
                className="absolute inset-0 bg-white origin-left transition-transform duration-700"
                style={{
                  transform: `scaleX(${
                    i < activeIndex ? 1 : i === activeIndex ? 0.5 : 0
                  })`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
