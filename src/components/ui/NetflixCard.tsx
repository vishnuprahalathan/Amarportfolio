"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useShowreel } from "@/components/providers/ShowreelProvider";
import { Play } from "lucide-react";

export interface Project {
  title: string;
  role: string;
  type: string;
  preview: string;
}

interface NetflixCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function NetflixCard({ project, index, featured = false }: NetflixCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { startShowreel } = useShowreel();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-white/10 group cursor-pointer bg-neutral-950 ${
        featured
          ? "w-full aspect-video"
          : "w-full aspect-video"
      }`}
      onMouseMove={handleMouseMove}
      onClick={() => startShowreel(index)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cursor glow */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.12), transparent 70%)`,
        }}
      />

      {/* Video: always autoplaying, muted — plays ambient preview */}
      <video
        ref={videoRef}
        src={project.preview}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay — lifts on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />

      {/* Play button — visible on hover */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
          <Play size={18} fill="white" className="ml-0.5" />
        </div>
      </div>

      {/* Card label */}
      <div className={`absolute bottom-0 left-0 right-0 z-30 pointer-events-none ${featured ? "p-8 md:p-10" : "p-5"}`}>
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/40 mb-2 block">
          {project.type}
        </span>
        <h4 className={`font-black uppercase tracking-tighter text-white leading-none ${featured ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>
          {project.title}
        </h4>
        {featured && (
          <p className="mt-3 text-sm text-white/50 font-light hidden md:block">
            {project.role}
          </p>
        )}
      </div>
    </motion.div>
  );
}
