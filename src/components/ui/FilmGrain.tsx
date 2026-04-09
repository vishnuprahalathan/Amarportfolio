"use client";

export default function FilmGrain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.05] overflow-hidden">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <style jsx>{`
        div {
          animation: noise 0.2s infinite;
        }
        @keyframes noise {
          0% { transform: translate(0,0) }
          10% { transform: translate(-1%,-1%) }
          20% { transform: translate(1%,1%) }
          30% { transform: translate(-1%,1%) }
          40% { transform: translate(1%,-1%) }
          50% { transform: translate(-1%,0) }
          60% { transform: translate(1%,1%) }
          70% { transform: translate(0,-1%) }
          80% { transform: translate(-1%,1%) }
          90% { transform: translate(1%,-1%) }
          100% { transform: translate(0,0) }
        }
      `}</style>
    </div>
  );
}
