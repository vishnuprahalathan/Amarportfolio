"use client";

import { motion } from "framer-motion";
import { Zap, Share2, Clapperboard } from "lucide-react";
import { VIDEOS } from "@/constants";

const styles = [
  {
    title: "Cinematic Narrative",
    icon: <Clapperboard className="w-5 h-5" />,
    description: "Creating atmosphere and emotion through careful pacing and color grading.",
    video: VIDEOS.projects[0].preview,
  },
  {
    title: "High-Energy Edits",
    icon: <Zap className="w-5 h-5" />,
    description: "Fast cuts, sound design syncing, and dynamic transitions that demand attention.",
    video: VIDEOS.projects[3].preview,
  },
  {
    title: "Social & Reels",
    icon: <Share2 className="w-5 h-5" />,
    description: "Optimized for mobile viewing with engaging hooks and platform-specific storytelling.",
    video: VIDEOS.projects[5].preview,
  },
];

export default function EditingStyles() {
  return (
    <section className="py-32 bg-neutral-950 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/3">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">
              Post-Production <br /> <span className="text-neutral-600">Specialties</span>
            </h2>
            <div className="space-y-12">
              {styles.map((style, i) => (
                <motion.div 
                   key={i}
                  className="group relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4 text-white group-hover:text-neutral-400 transition-colors">
                    {style.icon}
                    <h3 className="text-xl font-bold uppercase tracking-wider">{style.title}</h3>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                    {style.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {styles.slice(0, 2).map((style, i) => (
              <motion.div
                key={i}
                className="relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900 shadow-2xl group border border-white/5"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />

                {/* Single cover video — 9:16 container matches portrait content */}
                <video
                  src={style.video}
                  autoPlay loop muted playsInline preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent z-30 pointer-events-none">
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 mb-2 block">0{i+1} Preview</span>
                  <h4 className="text-lg font-bold uppercase tracking-widest">{style.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
