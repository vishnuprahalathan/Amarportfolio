"use client";

import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { VIDEOS } from "@/constants";

export default function CinematicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black pt-32 pb-48 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <video 
          src={VIDEOS.projects[1].preview} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover grayscale blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-32">
          
          <div className="md:w-1/2 space-y-12">
            <motion.h2 
              className="text-6xl md:text-8xl font-serif text-white italic -tracking-widest leading-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let&apos;s craft the <br /> <span className="text-neutral-700">Next Frame.</span>
            </motion.h2>

            <div className="flex flex-col gap-6">
              <a 
                href="mailto:amar@film.dev" 
                className="text-2xl md:text-4xl font-light hover:text-neutral-400 transition-colors flex items-center gap-4 group"
              >
                amar@film.dev
                <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
              </a>
              <a 
                href="https://wa.me/919952688029" 
                className="text-xl md:text-2xl text-neutral-500 hover:text-white transition-colors flex items-center gap-4 group"
              >
                +91 99526 88029
                <span className="text-xs font-mono uppercase tracking-widest bg-neutral-900 px-3 py-1 rounded">WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="md:w-1/3 w-full">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-600">Project Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-neutral-800 py-4 focus:outline-none focus:border-white transition-colors text-xl font-bold uppercase tracking-tight" 
                  placeholder="The Vision"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-600">Your Email</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-neutral-800 py-4 focus:outline-none focus:border-white transition-colors text-xl font-bold uppercase tracking-tight" 
                  placeholder="Director@studio.com"
                />
              </div>
              <Magnetic>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white py-6 font-black uppercase tracking-[0.2em] mt-8 hover:bg-blue-500 transition-colors rounded-full"
                >
                  Send Brief
                </motion.button>
              </Magnetic>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-12 border-t border-white/5">
          <div className="space-y-4">
            <div className="text-8xl font-black text-neutral-900 leading-none select-none">
              AMAR
            </div>
            <div className="text-[10px] font-mono tracking-[0.4em] text-neutral-700">
              © {currentYear} ALL FOOTAGE RIGHTS RESERVED
            </div>
          </div>

          <div className="flex gap-12 items-center">
            <Magnetic>
              <SocialIcon icon={<Globe size={20} />} label="Instagram" href="#" />
            </Magnetic>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-700">
              Indian Standard Time (IST)
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-neutral-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />
    </footer>
  );
}

function SocialIcon({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <a href={href} className="group flex flex-col items-center gap-2">
      <div className="text-neutral-700 group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-800 group-hover:text-white transition-opacity">
        {label}
      </span>
    </a>
  );
}
