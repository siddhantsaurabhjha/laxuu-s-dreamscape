import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

interface Props {
  density?: number;
  color?: string;
}

export const ParticleField = ({ density = 60, color = "#ff4fd8" }: Props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: density, density: { enable: true, width: 800, height: 800 } },
          color: { value: [color, "#9d4dff", "#ffffff"] },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.1, max: 0.7 },
            animation: { enable: true, speed: 0.6, sync: false },
          },
          size: {
            value: { min: 0.5, max: 2.5 },
          },
          move: {
            enable: true,
            speed: { min: 0.1, max: 0.5 },
            direction: "top",
            outModes: { default: "out" },
            random: true,
            straight: false,
          },
        },
        detectRetina: true,
      }}
    />
  );
};
