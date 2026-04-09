"use client";

import { motion } from "framer-motion";
import { Aperture, Settings, Monitor } from "lucide-react";
import { VIDEOS } from "@/constants";

const tools = [
  { name: "Adobe Premiere Pro", description: "Mastery in narrative & commercial assembly." },
  { name: "After Effects", description: "Design-led VFX and high-impact motion graphics." },
  { name: "DaVinci Resolve", description: "Precision color grading for cinematic aesthetics." },
];

export default function FilmAbout() {
  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <video 
          src={VIDEOS.showreel} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-32">
          
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              <h2 className="text-4xl md:text-7xl font-serif text-white italic -tracking-widest mb-8 leading-none relative z-10">
                Stories are <br /> <span className="text-neutral-800 italic">Built in the Cut.</span>
              </h2>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-xl text-neutral-400 font-light leading-relaxed">
                Amar is a cinematic storyteller dedicated to high-end video editing. 
                With a deep focus on pacing, rhythm, and color, I transform raw 
                footage into immersive visual narratives.
              </p>
              <p className="text-neutral-600 text-lg lowercase font-serif italic">
                I turn raw footage into cinematic stories. Every frame, every cut, every beat — crafted with intention.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-32">
            {tools.map((tool, i) => (
              <motion.div 
                key={i}
                className="group p-8 bg-neutral-900/40 rounded-sm border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2 duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center text-white/40 mb-6 group-hover:text-white group-hover:bg-white/10 transition-all">
                  {i === 0 && <Monitor size={20} />}
                  {i === 1 && <Aperture size={20} />}
                  {i === 2 && <Settings size={20} />}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-4">{tool.name}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed italic">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center pb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex flex-col items-center">
              <span className="text-[10px] font-mono tracking-[0.5em] text-neutral-700 uppercase mb-4 block">Ready to collaborate?</span>
              <a 
                href="#contact" 
                className="text-5xl md:text-9xl font-serif italic -tracking-widest text-white hover:text-neutral-500 transition-colors duration-500"
              >
                START THE PROJECT
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
