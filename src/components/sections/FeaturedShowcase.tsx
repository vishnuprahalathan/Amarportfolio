"use client";

import { motion } from "framer-motion";
import { VIDEOS } from "@/constants";
import NetflixCard from "@/components/ui/NetflixCard";

export default function FeaturedShowcase() {
  const heroProject = VIDEOS.projects[0];
  const supporting = VIDEOS.projects.slice(1, 3);

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 max-w-[1400px]">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] font-mono tracking-[0.5em] text-neutral-600 uppercase mb-3">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Cinematic <span className="text-neutral-700 italic">Masterpieces</span>
          </h2>
        </motion.div>

        {/* Hero card — full width */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <NetflixCard project={heroProject} index={0} featured={true} />
        </motion.div>

        {/* Two supporting cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supporting.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <NetflixCard project={project} index={i + 1} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
