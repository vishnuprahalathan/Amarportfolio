"use client";

import { motion } from "framer-motion";
import { VIDEOS } from "@/constants";
import NetflixCard, { Project } from "@/components/ui/NetflixCard";

interface RowProps {
  title: string;
  projects: Project[];
  startIndex: number;
}

function NetflixRow({ title, projects, startIndex }: RowProps) {
  return (
    <div className="mb-16">
      <div className="px-6 max-w-[1400px] mx-auto mb-5">
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          {title}
        </h3>
      </div>

      {/* Horizontal scroll row */}
      <div
        className="flex gap-4 overflow-x-auto overflow-y-hidden px-6 pb-4 snap-x snap-mandatory touch-pan-x"
        data-lenis-prevent
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-[80vw] md:w-[420px] lg:w-[480px]"
          >
            <NetflixCard project={project} index={startIndex + i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CinematicProjects() {
  const all = VIDEOS.projects;
  // Split uniquely: row 1 shows core narratives, row 2 shows social / commercial work
  const row1 = all.filter(p => {
    const type = p.type.toLowerCase();
    return !type.includes("social") && !type.includes("commercial");
  });
  const row2 = all.filter(p => {
    const type = p.type.toLowerCase();
    return type.includes("social") || type.includes("commercial");
  });

  return (
    <section id="work" className="py-24 bg-black">

      <motion.div
        className="px-6 max-w-[1400px] mx-auto mb-14"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-[10px] font-mono tracking-[0.5em] text-neutral-600 uppercase mb-3">
          Library
        </p>
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
          Explore <span className="text-neutral-700 italic">The Archive</span>
        </h2>
      </motion.div>

      <NetflixRow
        title="Cinematic Narratives"
        projects={row1.length > 0 ? row1 : all.slice(0, 3)}
        startIndex={0}
      />

      <NetflixRow
        title="High-Energy & Social"
        projects={row2.length > 0 ? row2 : all.slice(3)}
        startIndex={row1.length > 0 ? row1.length : 3}
      />

    </section>
  );
}
