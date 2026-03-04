import { BeigeBookmark } from "./beige-bookmark"
import { PinkBookmark } from "./pink-bookmark"

export const BookmarkStack =()=> {
    return (
      <div className="relative w-fit">
        <div
          className="absolute bottom-0 right-0"
          style={{
            transformOrigin: "bottom right",
            transform: "rotate(10deg) translateY(20px)",
            height: "100%",
            width: "100%",
          }}
        >
          <PinkBookmark />
        </div>
        <div className="relative z-10 transition-transform duration-300 hover:-rotate-[10deg]">
          <BeigeBookmark />
        </div>
      </div>
    );
}