import { forwardRef } from "react";

type PunchPaperWhiteProps = {
  className?: string;
  style?: React.CSSProperties;
}

export const PunchPaperWhite = forwardRef<
  HTMLDivElement, 
  PunchPaperWhiteProps
  >(({className = "", style}, ref) => {
    const maskId = "punchmask-white";

    return (
      <div 
        ref={ref}
        className={`absolute w-full ${className}`}
        style={style}
      >
        <div
          className={`relative w-full max-w-2xl aspect-3/4 rounded-md bg-amber-50`}
          style={{
            mask: `url(#${maskId})`,
            WebkitMask: `url(#${maskId})`,
          }}
        >
          <div
            className="absolute inset-0 rounded-md"
            style={{
              backgroundImage: "url('/white_bg_paper.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* SVG mask with punch holes */}
          <svg className="absolute w-0 h-0">
            <defs>
              <mask
                id={maskId}
                maskUnits="objectBoundingBox"
                maskContentUnits="objectBoundingBox"
              >
                {/* white background - everything visible */}
                <rect width="1" height="1" fill="white" />

                {/* black circles - punch holes (invisible) */}
                {/* Top left */}
                <circle
                  cx="0.07"
                  cy="0.04"
                  r="0.01"
                  transform="scale(1 0.75)"
                  fill="black"
                />

                {/* Left side holes */}
                <circle
                  cx="0.07"
                  cy="0.25"
                  r="0.01"
                  fill="black"
                  transform="scale(1 0.75)"
                />
                <circle
                  cx="0.07"
                  cy="0.51"
                  r="0.01"
                  fill="black"
                  transform="scale(1 0.75)"
                />
                <circle
                  cx="0.07"
                  cy="0.77"
                  r="0.01"
                  fill="black"
                  transform="scale(1 0.75)"
                />
                <circle
                  cx="0.07"
                  cy="1.03"
                  r="0.01"
                  fill="black"
                  transform="scale(1 0.75)"
                />

                {/* Bottom left */}
                <circle
                  cx="0.07"
                  cy="1.235"
                  r="0.01"
                  fill="black"
                  transform="scale(1 0.75)"
                />
              </mask>
            </defs>
          </svg>

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
          <div className="absolute top-0 left-0 bottom-0 bg-transparent w-10 rounded-l-md border-r-[1.5px] border-dashed border-current grid grid-rows-12 text-xs laptop:text-sm font-bold mr-10">
            {/* first row */}
            <div className="row-span-1 grid grid-rows-2">
              <div className="row-span-1 flex w-full h-full items-center justify-center ">
                <span className="w-2 h-2 bg-transparent rounded-full" />
              </div>
            </div>
            {/* middle 10 rows */}
            <div className="row-span-10 flex flex-col items-center justify-around">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="w-2 h-2 bg-transparent rounded-full" />
              ))}
            </div>
            {/* bottom row */}
            <div className="row-span-1 grid grid-rows-2">
              <div className="row-start-2 flex w-full h-full items-center justify-center ">
                <span className="w-2 h-2 bg-transparent rounded-full" />
              </div>
            </div>
          </div>
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
      </div>
    );
});

PunchPaperWhite.displayName = "PunchPaperWhite";