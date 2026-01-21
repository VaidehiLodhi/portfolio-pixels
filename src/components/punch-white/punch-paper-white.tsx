import { forwardRef } from "react";
import { WhiteContent } from "./white-content";

type PunchPaperWhiteProps = {
  className?: string;
  style?: React.CSSProperties;
}

export const PunchPaperWhite = forwardRef<
  HTMLDivElement, 
  PunchPaperWhiteProps
  >(({className = "", style}, ref) => {
    const maskId = "punchmask-white";

    // Design dimensions (1009 x 1477 aspect ratio)
    const designWidth = 1009;
    const designHeight = 1477;

    // 60% of design dimensions (minimum size)
    const minWidth = designWidth * 0.6; // 605.4px
    const minHeight = designHeight * 0.6; // 886.2px

    return (
      <div ref={ref} className={` w-full ${className}`} style={style}>
        <div
          className={`relative w-full rounded-md bg-amber-50`}
          style={{
            maxWidth: `${designWidth}px`,
            minWidth: `${minWidth}px`,
            minHeight: `${minHeight}px`,
            height: "auto",
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
                  cx="0.02"
                  cy="0.02"
                  r="0.007"
                  transform="scale(1 0.75)"
                  fill="black"
                />

                {/* Left side holes */}
                <circle
                  cx="0.02"
                  cy="0.25"
                  r="0.007"
                  fill="black"
                  transform="scale(1 0.75)"
                />
                <circle
                  cx="0.02"
                  cy="0.51"
                  r="0.007"
                  fill="black"
                  transform="scale(1 0.75)"
                />
                <circle
                  cx="0.02"
                  cy="0.77"
                  r="0.007"
                  fill="black"
                  transform="scale(1 0.75)"
                />
                <circle
                  cx="0.02"
                  cy="1.03"
                  r="0.007"
                  fill="black"
                  transform="scale(1 0.75)"
                />

                {/* Bottom left */}
                <circle
                  cx="0.02"
                  cy="1.3"
                  r="0.007"
                  fill="black"
                  transform="scale(1 0.75)"
                />
              </mask>
            </defs>
          </svg>

          {/* top border */}
          <div className="absolute top-0 left-0 right-0 bg-transparent h-7.5 rounded-t-md border-b-[1.5px] border-dashed border-current grid grid-cols-12 text-xs laptop:text-sm font-bold mb-10 md:mb-0">
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
          <div className="absolute top-0 left-0 bottom-0 bg-transparent w-7.5 rounded-l-md border-r-[1.5px] border-dashed border-current grid grid-rows-12 text-xs laptop:text-sm font-bold ">
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
          <div className="absolute top-0 right-0 bottom-0 bg-transparent w-7.5 rounded-r-md border-l-[1.5px] border-dashed border-current grid grid-rows-12 text-xs laptop:text-sm font-bold" />
          {/* bottom border */}
          <div className="absolute bottom-0 left-0 right-0 bg-transparent h-7.5 rounded-b-md border-t-[1.5px] border-dashed border-current grid grid-cols-12 text-xs laptop:text-sm font-bold">
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

          <div className="relative inset-0 p-7.5 flex items-start justify-center">
            <div className="w-full h-full">
              <WhiteContent />
            </div>
          </div>
        </div>
      </div>
    );
  });

PunchPaperWhite.displayName = "PunchPaperWhite";