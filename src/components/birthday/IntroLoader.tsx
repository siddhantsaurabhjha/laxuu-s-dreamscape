import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingHearts } from "./FloatingHearts";

interface Props {
  onComplete: () => void;
}

const TYPING_TEXT = "Someone special deserves something special…";

export const IntroLoader = ({ onComplete }: Props) => {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "loading" | "reveal" | "exit">("typing");

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(TYPING_TEXT.slice(0, i));
      if (i >= TYPING_TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("loading"), 600);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [phase]);

  // Loading bar then reveal
  useEffect(() => {
    if (phase === "loading") {
      const t = setTimeout(() => setPhase("reveal"), 2200);
      return () => clearTimeout(t);
    }
    if (phase === "reveal") {
      const t = setTimeout(() => setPhase("exit"), 2400);
      return () => clearTimeout(t);
    }
    if (phase === "exit") {
      const t = setTimeout(onComplete, 1200);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" || true ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => phase === "exit" && onComplete()}
        >
          {/* Soft fog */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, hsl(270 80% 15% / 0.6), transparent 60%), radial-gradient(circle at 70% 60%, hsl(318 80% 15% / 0.5), transparent 60%)",
            }}
          />

          <FloatingHearts count={10} />

          <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
            <AnimatePresence mode="wait">
              {(phase === "typing" || phase === "loading") && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8 }}
                  className="font-grotesk text-base sm:text-xl text-foreground/90 tracking-wide"
                >
                  <span className="text-glow-soft">{typed}</span>
                  <span className="ml-0.5 inline-block w-[2px] h-[1em] bg-primary align-middle animate-blink" />
                </motion.div>
              )}

              {phase === "reveal" && (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.h1
                    className="font-display text-7xl sm:text-8xl font-black tracking-wider text-gradient-neon"
                    animate={{
                      textShadow: [
                        "0 0 20px hsl(318 100% 65% / 0.6), 0 0 40px hsl(318 100% 65% / 0.4)",
                        "0 0 40px hsl(318 100% 65% / 0.9), 0 0 80px hsl(270 100% 65% / 0.6)",
                        "0 0 20px hsl(318 100% 65% / 0.6), 0 0 40px hsl(318 100% 65% / 0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Laxuu
                  </motion.h1>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="text-4xl"
                  >
                    ✨
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading line */}
            {(phase === "typing" || phase === "loading") && (
              <div className="relative h-[2px] w-64 overflow-hidden rounded-full bg-primary/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-neon-gradient"
                  initial={{ width: "0%" }}
                  animate={{ width: phase === "loading" ? "100%" : "30%" }}
                  transition={{ duration: phase === "loading" ? 2 : 3, ease: "easeInOut" }}
                  style={{ boxShadow: "0 0 12px hsl(318 100% 65% / 0.9)" }}
                />
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
