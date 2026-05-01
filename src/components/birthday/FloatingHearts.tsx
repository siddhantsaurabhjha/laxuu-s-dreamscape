import { useMemo } from "react";

interface Props {
  count?: number;
}

export const FloatingHearts = ({ count = 14 }: Props) => {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        size: 12 + Math.random() * 16,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-drift text-primary"
          style={{
            left: `${h.left}%`,
            bottom: "-20px",
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            filter: "drop-shadow(0 0 8px hsl(318 100% 65% / 0.8))",
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};
