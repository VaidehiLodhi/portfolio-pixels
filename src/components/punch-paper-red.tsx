import React from "react";

interface PunchPaperRedProps {
  className?: string;
  style?: React.CSSProperties;
}

export const PunchPaperRed = React.forwardRef<HTMLDivElement, PunchPaperRedProps>(
  ({className = "", style}, ref) => {
  return (
    <div
      ref={ref}
      className={`${className} bg-[#B7BED7] relative w-full max-w-3xl aspect-3/4 shadow-xl`}
      style={style}
    >
      {/* top border */}
      <div className="absolute top-0 left-0 right-0 bg-transparent h-10 rounded-t-md border-b-[1.5px] border-dashed border-current grid grid-cols-12 text-xs laptop:text-sm font-bold mb-10 md:mb-0">
        
      </div>
    </div>
  );
});
