import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ParticleField } from "./ParticleField";
import { FloatingHearts } from "./FloatingHearts";

export const FinalReveal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setExplode(true), 1400);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const sparks = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => {
        const angle = (i / 36) * Math.PI * 2;
        const dist = 120 + Math.random() * 240;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          color: i % 3 === 0 ? "#9d4dff" : i % 3 === 1 ? "#ff4fd8" : "#ffffff",
          delay: Math.random() * 0.4,
          size: 4 + Math.random() * 8,
        };
      }),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[120vh] overflow-hidden flex flex-col items-center justify-center px-6 py-24"
      style={{
        background:
          "radial-gradient(ellipse at center, hsl(270 80% 8%) 0%, hsl(270 90% 3%) 50%, hsl(270 100% 1%) 100%)",
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              boxShadow: `0 0 ${s.size * 2}px hsl(var(--primary) / 0.6)`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      <ParticleField density={90} />
      <FloatingHearts count={20} />

      {/* Heart explosion */}
      {explode && (
        <div className="absolute top-1/2 left-1/2 z-10 pointer-events-none">
          {sparks.map((s) => (
            <motion.div
              key={s.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{ x: s.x, y: s.y, opacity: 0, scale: 1.5 }}
              transition={{ duration: 1.6, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                borderRadius: "9999px",
                background: s.color,
                boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
              }}
            />
          ))}
          {/* heart burst symbols */}
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            const d = 80 + Math.random() * 160;
            return (
              <motion.div
                key={`h-${i}`}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * d,
                  y: Math.sin(angle) * d - 40,
                  opacity: 0,
                  scale: 1.4,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 2.2, delay: 0.1 + Math.random() * 0.5, ease: "easeOut" }}
                className="absolute text-2xl text-primary"
                style={{ filter: "drop-shadow(0 0 10px hsl(318 100% 65%))" }}
              >
                ♥
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Main reveal text */}
      <div className="relative z-20 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs font-grotesk uppercase tracking-[0.5em] text-foreground/60"
        >
          and finally
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.7, filter: "blur(40px)", y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-5xl sm:text-6xl font-black leading-[1.05] tracking-wider"
        >
          <motion.span
            className="block text-gradient-neon"
            animate={{
              textShadow: [
                "0 0 20px hsl(318 100% 65% / 0.6), 0 0 50px hsl(318 100% 65% / 0.4)",
                "0 0 50px hsl(318 100% 65% / 1), 0 0 100px hsl(270 100% 65% / 0.7), 0 0 150px hsl(318 100% 65% / 0.4)",
                "0 0 20px hsl(318 100% 65% / 0.6), 0 0 50px hsl(318 100% 65% / 0.4)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            HAPPY
          </motion.span>
          <motion.span
            className="block text-gradient-neon"
            animate={{
              textShadow: [
                "0 0 20px hsl(270 100% 65% / 0.6)",
                "0 0 60px hsl(270 100% 65% / 1), 0 0 120px hsl(318 100% 65% / 0.6)",
                "0 0 20px hsl(270 100% 65% / 0.6)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            BIRTHDAY
          </motion.span>
          <motion.span
            className="block text-gradient-neon mt-2"
            animate={{
              textShadow: [
                "0 0 30px hsl(318 100% 65% / 0.8)",
                "0 0 80px hsl(318 100% 65% / 1), 0 0 160px hsl(270 100% 65% / 0.8)",
                "0 0 30px hsl(318 100% 65% / 0.8)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          >
            LAXUU 💖
          </motion.span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="mt-10 h-[1px] w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ boxShadow: "0 0 12px hsl(var(--primary))" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.6, delay: 2 }}
          className="mt-10 font-grotesk text-xl sm:text-2xl text-foreground/95 text-glow-soft italic max-w-sm leading-relaxed"
        >
          I love you Laxuu<br />
          <span className="text-primary text-glow-pink not-italic font-semibold">forever.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 3 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <span className="text-2xl">💖</span>
          <p className="text-[10px] font-display tracking-[0.4em] uppercase text-foreground/40">
            made with love · 01.05.2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};
