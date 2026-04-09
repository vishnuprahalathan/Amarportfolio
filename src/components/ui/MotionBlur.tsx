"use client";


import { useScroll, useVelocity, useTransform, motion, useSpring } from "framer-motion";

export default function MotionBlur({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Transform velocity into blur amount (0 to 10px)
  const blurValue = useTransform(scrollVelocity, [-2000, 0, 2000], [10, 0, 10]);
  const smoothBlur = useSpring(blurValue, { stiffness: 400, damping: 50 });

  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="cinematic-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
          </filter>
        </defs>
      </svg>
      <motion.div
        style={{
          filter: useTransform(smoothBlur, (v) => `blur(${v}px)`),
          willChange: "filter"
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
