"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VIDEOS } from "@/constants";

export default function HorizontalTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !triggerRef.current) return;
      
      gsap.fromTo(
        sectionRef.current,
        { xPercent: 0 },
        {
          xPercent: -75, // Since it's 400vw, moving -75% means moving exactly 3 screens left
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${window.innerWidth * 3}`, 
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            anticipatePin: 1
          },
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="relative overflow-hidden bg-black">
      <div 
        ref={sectionRef} 
        className="h-screen w-[400vw] flex flex-row relative bg-neutral-950 will-change-transform"
      >
        <div className="h-screen w-screen flex flex-col items-center justify-center p-20 shrink-0">
          <motion.h2 
            className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter text-white/5 opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
          >
            TIMELINE
          </motion.h2>
          <div className="z-10 text-center">
            <span className="text-xs font-mono uppercase tracking-[0.5em] text-neutral-500 mb-8 block">Project Sequence_01</span>
            <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">The <br /> <span className="text-neutral-700 italic">Evolution</span></h3>
          </div>
        </div>

        {VIDEOS.projects.slice(0, 3).map((project, i) => (
          <div key={i} className="h-screen w-screen flex items-center justify-center p-12 shrink-0">
            <div className="relative w-full max-w-6xl aspect-video group bg-neutral-900 rounded-sm overflow-hidden shadow-2xl">
              {/* Blurred Background Filler for mixed aspect ratios */}
              <video 
                src={project.preview}
                autoPlay loop muted playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-125 pointer-events-none"
              />
              
              {/* Main Crisp Video */}
              <video 
                src={project.preview}
                autoPlay loop muted playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-1000 z-10"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 z-20 pointer-events-none" />
              
              <div className="absolute bottom-12 left-12 z-30 pointer-events-none">
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 mb-2 block">Part 0{i+1}</span>
                <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">{project.title}</h4>
              </div>
              
              <motion.div 
                className="absolute top-12 right-12 text-8xl font-black text-white/5 select-none z-30"
                style={{ y: (i + 1) * 20 }}
              >
                0{i+1}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
