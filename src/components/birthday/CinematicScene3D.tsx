import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

// Heart shape geometry (extruded)
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0.5);
heartShape.bezierCurveTo(0, 0.5, -0.4, 1, -0.8, 0.6);
heartShape.bezierCurveTo(-1.3, 0.1, -0.7, -0.6, 0, -1);
heartShape.bezierCurveTo(0.7, -0.6, 1.3, 0.1, 0.8, 0.6);
heartShape.bezierCurveTo(0.4, 1, 0, 0.5, 0, 0.5);

const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 0.25,
  bevelEnabled: true,
  bevelSegments: 4,
  steps: 1,
  bevelSize: 0.08,
  bevelThickness: 0.08,
});
heartGeometry.center();
heartGeometry.scale(0.5, 0.5, 0.5);

function FloatingHeart({ position, color, speed, scale }: { position: [number, number, number]; color: string; speed: number; scale: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * speed * 0.5;
    ref.current.rotation.z = Math.sin(t * speed) * 0.2;
    ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.4;
  });
  return (
    <mesh ref={ref} position={position} scale={scale} geometry={heartGeometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

function NeonParticles() {
  const ref = useRef<THREE.Points>(null!);
  const { positions, colors } = useMemo(() => {
    const count = 250;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color("#ff4fd8"), new THREE.Color("#9d4dff"), new THREE.Color("#ffffff")];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.15) * 0.4;
    state.camera.position.y = Math.cos(t * 0.12) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const HEARTS: Array<{ position: [number, number, number]; color: string; speed: number; scale: number }> = [
  { position: [-2.5, 1, -1], color: "#ff4fd8", speed: 0.6, scale: 0.9 },
  { position: [2.2, -0.5, 0], color: "#9d4dff", speed: 0.8, scale: 1.1 },
  { position: [0, 1.5, -2], color: "#ff4fd8", speed: 0.5, scale: 0.7 },
  { position: [-1.5, -1.5, 1], color: "#ff85e6", speed: 0.7, scale: 0.6 },
  { position: [3, 1.8, -1.5], color: "#9d4dff", speed: 0.4, scale: 0.5 },
  { position: [-3, -0.8, 0.5], color: "#ff4fd8", speed: 0.9, scale: 0.45 },
];

export const CinematicScene3D = () => {
  return (
    <section className="relative w-full overflow-hidden h-[100vh]">
      {/* Ambient background fog */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(318 80% 12% / 0.6), hsl(270 80% 5%) 70%)",
        }}
      />

      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} color="#ff4fd8" intensity={3} distance={20} />
            <pointLight position={[-5, -3, 3]} color="#9d4dff" intensity={3} distance={20} />
            <pointLight position={[0, 0, 4]} color="#ffffff" intensity={1} distance={10} />
            {HEARTS.map((h, i) => (
              <FloatingHeart key={i} {...h} />
            ))}
            <NeonParticles />
            <CameraDrift />
            <fog attach="fog" args={["#0d0322", 5, 12]} />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay text */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-xs font-grotesk uppercase tracking-[0.4em] text-primary/90"
        >
          chapter 04
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="mt-4 font-display text-3xl sm:text-4xl font-black text-gradient-neon text-glow-pink max-w-xs leading-tight"
        >
          A universe<br />made of you
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-6 text-sm text-foreground/70 max-w-xs leading-relaxed"
        >
          Floating hearts, neon dust, soft light — a little dream space, just for you.
        </motion.p>
      </div>

      {/* Top/bottom fades for cinematic blend */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
