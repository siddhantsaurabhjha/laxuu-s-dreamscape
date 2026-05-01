import { motion } from "framer-motion";
import { AmbientOrbs } from "./AmbientOrbs";

// 🔧 REPLACE these with Google Drive direct image links later.
// Tip: Convert "https://drive.google.com/file/d/FILE_ID/view"
// into "https://drive.google.com/uc?export=view&id=FILE_ID"
const PHOTOS = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  src: `https://images.unsplash.com/photo-${
    [
      "1529626455594-4ff0802cfb7e",
      "1521577352947-9bb58764b69a",
      "1531746020798-e6953c6e8e04",
      "1494790108377-be9c29b29330",
      "1488161628813-04466f872be2",
      "1517423440428-a5a00ad493e8",
      "1502823403499-6ccfcf4fb453",
      "1539571696357-5a69c17a67c6",
      "1524504388940-b1c1722653e1",
      "1517841905240-472988babdf9",
    ][i]
  }?auto=format&fit=crop&w=800&q=80`,
  caption: [
    "first smile",
    "golden hour",
    "your laugh",
    "soft moments",
    "the way you look",
    "every little thing",
    "favorite frame",
    "you, simply",
    "magic in motion",
    "forever feeling",
  ][i],
}));

const variants = ["polaroid", "card", "fullscreen", "card", "polaroid", "fullscreen", "card", "polaroid", "card", "fullscreen"] as const;

export const MemoryGallery = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 px-5">
      <AmbientOrbs />

      <div className="relative z-10 max-w-md mx-auto mb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs font-grotesk uppercase tracking-[0.4em] text-primary/80"
        >
          chapter 02
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mt-3 font-display text-4xl font-black text-gradient-neon text-glow-pink"
        >
          Memory Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-sm text-foreground/70 leading-relaxed"
        >
          Frozen moments, framed in light — each one a quiet little universe.
        </motion.p>
      </div>

      <div className="relative z-10 max-w-md mx-auto flex flex-col gap-12">
        {PHOTOS.map((photo, i) => {
          const variant = variants[i];
          const isLeft = i % 2 === 0;

          if (variant === "polaroid") {
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 60, rotate: isLeft ? -8 : 8, filter: "blur(20px)" }}
                whileInView={{ opacity: 1, y: 0, rotate: isLeft ? -4 : 4, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className={`self-${isLeft ? "start" : "end"} max-w-[78%]`}
                style={{ alignSelf: isLeft ? "flex-start" : "flex-end" }}
              >
                <div className="bg-foreground/5 glass-pink p-3 pb-10 rounded-md shadow-2xl">
                  <div className="aspect-[4/5] overflow-hidden rounded-sm">
                    <img src={photo.src} alt={photo.caption} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-3 text-center font-grotesk text-xs tracking-widest uppercase text-foreground/80">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          }

          if (variant === "fullscreen") {
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(30px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative -mx-5"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={photo.src} alt={photo.caption} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-display text-2xl font-bold text-glow-pink">{photo.caption}</p>
                    <div className="mt-2 h-[1px] w-12 bg-primary" />
                  </div>
                </div>
              </motion.div>
            );
          }

          // card
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden glass-pink p-2">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl relative">
                  <img src={photo.src} alt={photo.caption} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-primary/30 rounded-2xl pointer-events-none" />
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <p className="font-grotesk text-sm text-foreground/85">{photo.caption}</p>
                  <span className="text-xs font-display tracking-widest text-primary">0{photo.id}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
