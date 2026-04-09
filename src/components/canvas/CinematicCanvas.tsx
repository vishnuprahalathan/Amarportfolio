"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { Float, Environment, PerspectiveCamera, useVideoTexture } from "@react-three/drei";
import { VIDEOS } from "@/constants";

const initialVideoData = [
  { position: [-2.8, 1.4, -1] as [number, number, number], rotation: [0.05, 0.3, -0.05] as [number, number, number] },
  { position: [2.8, 1.2, -2] as [number, number, number], rotation: [-0.05, -0.3, 0.05] as [number, number, number] },
  { position: [-2.4, -1.8, -3] as [number, number, number], rotation: [-0.1, 0.4, 0.02] as [number, number, number] },
  { position: [2.6, -1.5, -1] as [number, number, number], rotation: [0.1, -0.2, -0.02] as [number, number, number] },
  { position: [-0.5, 2.2, -4] as [number, number, number], rotation: [0, 0.1, 0.1] as [number, number, number] },
  { position: [0.8, -2.2, -3] as [number, number, number], rotation: [-0.1, -0.1, -0.1] as [number, number, number] },
];

function VideoCard({ url, position, rotation }: { url: string; position: [number, number, number]; rotation: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useVideoTexture(url);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    mesh.current.rotation.y = rotation[1] + Math.cos(time * 0.5) * 0.1;
  });

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <planeGeometry args={[1.6, 0.9]} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

function FloatingScene() {
  const videos = VIDEOS.projects;
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <ambientLight intensity={0.2} />
      
      <pointLight position={[10, 10, 10]} intensity={2} color="#4f46e5" />
      <pointLight position={[-10, -5, 5]} intensity={1.5} color="#9333ea" />
      <pointLight position={[0, 5, -5]} intensity={1} color="#06b6d4" /> 
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {videos.map((v, i) => (
          <VideoCard 
            key={i} 
            url={v.preview} 
            position={initialVideoData[i].position} 
            rotation={initialVideoData[i].rotation}
          />
        ))}
      </Float>
      
      <Environment preset="night" />
    </>
  );
}

export default function CinematicCanvas() {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none opacity-40 cinematic-canvas">
      <Canvas 
        dpr={[1, 1.2]} 
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: true 
        }}
      >
        <Suspense fallback={null}>
          <FloatingScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
