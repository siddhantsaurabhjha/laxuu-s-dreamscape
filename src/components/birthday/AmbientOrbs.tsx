export const AmbientOrbs = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="floating-orb animate-float-slow"
        style={{
          top: "10%",
          left: "-10%",
          width: "320px",
          height: "320px",
          background: "hsl(318 100% 55%)",
        }}
      />
      <div
        className="floating-orb animate-float-medium"
        style={{
          bottom: "5%",
          right: "-15%",
          width: "380px",
          height: "380px",
          background: "hsl(270 100% 55%)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="floating-orb animate-float-slow"
        style={{
          top: "45%",
          right: "20%",
          width: "200px",
          height: "200px",
          background: "hsl(290 100% 60%)",
          animationDelay: "3s",
          opacity: 0.35,
        }}
      />
    </div>
  );
};
