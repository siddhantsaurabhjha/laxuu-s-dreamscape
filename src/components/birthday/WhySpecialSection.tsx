import { motion } from "framer-motion";
import { AmbientOrbs } from "./AmbientOrbs";

const CARDS = [
  { hi: "Your smile literally changes the whole vibe.", icon: "✦" },
  { hi: "Tum special ho… aur shayad tumhe idea bhi nahi.", icon: "✿" },
  { hi: "Everything feels softer around you.", icon: "❀" },
  { hi: "You are my favorite feeling.", icon: "✧" },
  { hi: "Teri hansi… meri sabse pyaari playlist hai.", icon: "♡" },
  { hi: "Some people are sunsets — tum ek poori sky ho.", icon: "✺" },
];

export const WhySpecialSection = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 px-5">
      <AmbientOrbs />

      <div className="relative z-10 max-w-md mx-auto mb-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs font-grotesk uppercase tracking-[0.4em] text-secondary/90"
        >
          chapter 03
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mt-3 font-display text-4xl font-black text-gradient-neon text-glow-purple"
        >
          Why You're Special
        </motion.h2>
      </div>

      <div className="relative z-10 max-w-md mx-auto flex flex-col gap-6">
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="relative glass-pink rounded-2xl p-6 group"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* glow border */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-60"
              style={{
                background: "linear-gradient(135deg, hsl(318 100% 65% / 0.15), transparent 50%, hsl(270 100% 65% / 0.15))",
              }}
            />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center text-primary text-xl text-glow-pink">
                {card.icon}
              </div>
              <div className="flex-1">
                <p className="font-grotesk text-base leading-relaxed text-foreground/95">
                  {card.hi}
                </p>
                <div className="mt-3 h-[1px] w-10 bg-gradient-to-r from-primary to-transparent" />
                <p className="mt-2 text-[10px] font-display tracking-[0.3em] uppercase text-foreground/40">
                  reason / 0{i + 1}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
