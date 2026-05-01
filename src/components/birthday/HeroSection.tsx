import { motion } from "framer-motion";
import { AmbientOrbs } from "./AmbientOrbs";
import { FloatingHearts } from "./FloatingHearts";
import { ParticleField } from "./ParticleField";
import heroImage from "@/assets/file_00000000cac471faaa1ed913e818263f.png"

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      <AmbientOrbs />
      <ParticleField density={50} />
      <FloatingHearts count={12} />

      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, filter: "blur(30px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative mb-10"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Outer rotating glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              background: "conic-gradient(from 0deg, hsl(318 100% 65%), hsl(270 100% 65%), hsl(318 100% 65%))",
              filter: "blur(20px)",
              opacity: 0.7,
              transform: "scale(1.15)",
            }}
          />
          {/* Inner ring */}
          <div
            className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-[3px] animate-pulse-glow"
            style={{ background: "var(--gradient-neon)" }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-background">
              <img
                src={heroPhoto}
                alt="Laxmi Yadav (Laxuu)"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
          {/* Floating sparkles */}
          <motion.span
            className="absolute -top-2 -right-2 text-3xl"
            animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl sm:text-5xl font-black text-center text-gradient-neon text-glow-pink leading-tight"
      >
        Happy Birthday<br />Laxuu <span className="text-primary">💖</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 text-center font-grotesk text-sm sm:text-base text-foreground/80 max-w-sm leading-relaxed text-glow-soft"
      >
        1 May 2007 — The day someone truly special was born.
      </motion.p>

      {/* Glass overlay chip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="mt-10 glass-pink rounded-full px-5 py-2 text-xs font-grotesk uppercase tracking-[0.3em] text-foreground/90"
      >
        a digital love letter
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-foreground/60"
      >
        <span className="text-[10px] font-grotesk uppercase tracking-[0.3em]">scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};
