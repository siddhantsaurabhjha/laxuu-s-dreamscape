import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AmbientOrbs } from "./AmbientOrbs";

const COMPLIMENTS = [
  "beautiful",
  "pretty",
  "cute",
  "queen",
  "special",
  "gorgeous smile",
  "lovely soul",
  "my favorite person",
];

const POSITIONS = [
  { top: "8%", left: "10%", delay: 0 },
  { top: "18%", right: "8%", delay: 0.4 },
  { top: "32%", left: "20%", delay: 0.8 },
  { top: "44%", right: "15%", delay: 1.2 },
  { top: "56%", left: "8%", delay: 1.6 },
  { top: "68%", right: "10%", delay: 2.0 },
  { top: "78%", left: "25%", delay: 2.4 },
  { top: "88%", right: "20%", delay: 2.8 },
];

export const FloatingCompliments = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: false });

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] w-full overflow-hidden flex items-center justify-center px-4"
    >
      <AmbientOrbs />

      <div className="absolute inset-0">
        {COMPLIMENTS.map((word, i) => {
          const pos = POSITIONS[i % POSITIONS.length];
          const isPink = i % 2 === 0;
          return (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              animate={
                inView
                  ? {
                      opacity: [0, 1, 1, 0.85],
                      y: [40, 0, -10, -20],
                      filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(2px)"],
                    }
                  : {}
              }
              transition={{
                duration: 4,
                delay: pos.delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className={`absolute font-display font-bold tracking-wider whitespace-nowrap ${
                isPink ? "text-primary text-glow-pink" : "text-secondary text-glow-purple"
              }`}
              style={{
                top: pos.top,
                left: (pos as any).left,
                right: (pos as any).right,
                fontSize: `clamp(1rem, ${1.2 + (i % 3) * 0.4}rem, 2rem)`,
              }}
            >
              {word}
            </motion.div>
          );
        })}
      </div>

      {/* Center text */}
      <div className="relative z-10 text-center max-w-md">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-xs font-grotesk uppercase tracking-[0.4em] text-foreground/60"
        >
          you are
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-4 font-display text-3xl sm:text-4xl font-black text-gradient-neon text-glow-pink leading-tight"
        >
          everything<br />beautiful
        </motion.h2>
      </div>
    </section>
  );
};
