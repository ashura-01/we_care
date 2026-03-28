import React from "react";

const GlassCard = ({ children, className = "", ...props }) => {
  const baseGlass = "relative z-[2] overflow-hidden box-border backdrop-blur-[28px] bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] border border-white/30 shadow-[0_18px_45px_rgba(0,0,0,0.1)]";

  return (
    <div className={`${baseGlass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;