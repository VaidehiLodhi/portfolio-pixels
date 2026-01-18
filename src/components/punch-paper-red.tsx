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
      className={`${className} relative w-full max-w-3xl aspect-3/4 shadow-xl rounded-md`}
      style={style}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/red_page.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* top border */}
      <div className="absolute top-0 left-0 right-0 bg-transparent h-10 rounded-t-md border-b-[1.5px] border-dashed border-current grid grid-cols-12 text-xs laptop:text-sm font-bold mb-10 md:mb-0">
        <div className="col-span-6 flex items-center">
          <div className="h-full flex pl-13 items-center justify-center">
            <span className="w-2 h-2 bg-current"></span>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-end">
          <div className="h-full flex items-center pr-13">
            <span className="w-2 h-2 bg-current"></span>
          </div>
        </div>
      </div>
      {/* left border */}
      <div className="absolute top-0 left-0 bottom-0 bg-transparent w-10 rounded-l-md border-r-[1.5px] border-dashed border-current grid grid-rows-12 text-xs laptop:text-sm font-bold mr-10" />
      {/* right border */}
      <div className="absolute top-0 right-0 bottom-0 bg-transparent w-10 rounded-r-md border-l-[1.5px] border-dashed border-current grid grid-rows-12 text-xs laptop:text-sm font-bold ml-10" />
      {/* bottom border */}
      <div className="absolute bottom-0 left-0 right-0 bg-transparent h-10 rounded-b-md border-t-[1.5px] border-dashed border-current grid grid-cols-12 text-xs laptop:text-sm font-bold">
        <div className="col-span-6 flex items-center">
          <div className="h-full flex pl-13 items-center justify-center">
            <span className="w-2 h-2 bg-current"></span>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-end">
          <div className="h-full flex items-center pr-13">
            <span className="w-2 h-2 bg-current"></span>
          </div>
        </div>
      </div>
    </div>
  );
});
