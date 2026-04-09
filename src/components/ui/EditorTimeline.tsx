"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function EditorTimeline() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const playheadX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const playheadSpring = useSpring(playheadX, {
    stiffness: 100,
    damping: 30
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 flex items-center gap-6">
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/40 uppercase">
        <span className="text-white">00:00:00:24</span>
        <span className="opacity-20">|</span>
        <span>24 FPS</span>
      </div>

      <div className="flex-1 h-8 relative bg-neutral-900 overflow-hidden group">
        <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`w-[1px] h-full bg-white ${i % 5 === 0 ? 'opacity-100 h-full' : 'opacity-40 h-1/2 mt-auto'}`} />
          ))}
        </div>

        <motion.div 
          className="absolute inset-y-0 left-0 bg-blue-500/30 border-r-2 border-blue-400"
          style={{ scaleX, originX: 0 }}
        />

        <motion.div 
          className="absolute inset-y-0 left-0 w-[2px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] z-10 will-change-transform"
          style={{ x: playheadSpring }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rotate-45" />
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded border border-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors cursor-pointer text-[10px] font-mono">
          J
        </div>
        <div className="w-8 h-8 rounded border border-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors cursor-pointer text-[10px] font-mono">
          K
        </div>
        <div className="w-8 h-8 rounded border border-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors cursor-pointer text-[10px] font-mono">
          L
        </div>
      </div>

      <div className="md:hidden text-[10px] font-mono text-white/40 uppercase tracking-widest">
        Sequence_01_Build
      </div>
    </div>
  );
}
