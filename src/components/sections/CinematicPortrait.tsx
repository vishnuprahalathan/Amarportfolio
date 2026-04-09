"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function CinematicPortrait() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const clipProgress = useTransform(scrollYProgress, [0, 0.5], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-1/2 h-[70vh] md:h-screen relative overflow-hidden">
        <motion.div 
          className="w-full h-full relative"
          style={{ clipPath: clipProgress }}
          transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.div 
            className="w-full h-full relative"
            style={{ scale }}
          >
            <Image
              src="/images/portrait.jpg"
              alt="Amar Portrait"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              priority
            />
          </motion.div>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>

      <div className="w-full md:w-1/2 px-12 md:px-24 py-20 z-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-blue-500 mb-6 block">The Person Behind the Lens</span>
          <h2 className="text-5xl md:text-8xl font-serif text-white italic -tracking-widest leading-none mb-12 capitalize">
            Hi, I’m Amar
          </h2>
          <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-xl">
            I don’t just edit videos — I craft <span className="text-white italic">emotions</span>, 
            <span className="text-white italic"> rhythm</span>, and <span className="text-white">story</span>.
          </p>
          
          <div className="mt-16 flex items-center gap-8">
            <div className="w-12 h-[1px] bg-blue-600" />
            <p className="text-sm font-mono text-neutral-600 uppercase tracking-widest leading-loose">
              Based in India // <br />
              Available for Global Projects
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden mix-blend-screen opacity-20">
        <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-blue-600/10 blur-[150px] rounded-full" />
      </div>
    </section>
  );
}
