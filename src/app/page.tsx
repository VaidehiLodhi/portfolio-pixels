"use client";
import { useRef, useState } from "react";
import { PunchPaperRed } from "@/components/punch-paper-red";
import { PunchPaperWhite } from "@/components/punch-paper-white";
import gsap from "gsap";

type cardId = "red" | "white";

export default function Home() {
  const whiteRef = useRef<HTMLDivElement | null>(null);
  const redRef = useRef<HTMLDivElement | null>(null);
  const isAnimating = useRef(false);

  const [stack, setStack] = useState<cardId[]>(["red", "white"]);

  const pageRefs = {
    red: redRef,
    white: whiteRef,
  };

  const getZIndex = (id: cardId) => {
    const index = stack.indexOf(id);
    return 2 - index;
  };

  function handlePageClick(cid: cardId) {
    if (isAnimating.current) return;
    if (stack[0] === cid) return;

    const nextStack = [cid, ...stack.filter((id) => id !== cid)];

    playStackAnimation(cid, nextStack);
  }

  const playStackAnimation = (moving: cardId, nextStack: cardId[]) => {
    isAnimating.current = true;

    const movingRef = pageRefs[moving].current;
    if (!movingRef) {
      isAnimating.current = false;
      return;
    }

    const contentRef = movingRef.querySelector(
      "[data-page-content]"
    ) as HTMLElement;
    if (!contentRef) {
      isAnimating.current = false;
      return;
    }

    gsap
      .timeline({
        onComplete: () => {
          setStack(nextStack);
          isAnimating.current = false;
        },
      })
      .to(contentRef, {
        y: "-150vh",
        rotation: -15,
        duration: 0.5,
        ease: "power2.in",
      })
      .call(() => {
        setStack(nextStack);
      })
      .fromTo(
        contentRef,
        {
          y: "150vh",
          rotation: 15,
        },
        {
          y: "0vh",
          rotation: 0,
          duration: 0.6,
          ease: "power1.out",
          immediateRender: false,
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 font-sans">
      <div className="relative grid grid-cols-1 md:grid-cols-12 md:gap-x-20 md:px-20 w-full min-h-screen">
        {/* RED LAYER */}
        <div
          ref={pageRefs.red}
          className="col-start-1 md:col-span-8 md:col-start-4 row-start-1 relative w-full min-h-screen pointer-events-none"
          style={{ zIndex: getZIndex("red") }}
        >
          <div
            className="pt-[40vh] md:pt-[20vh] pb-[20vh] px-6 md:px-0 w-full pointer-events-auto cursor-pointer"
            data-page-content
            onClick={(e) => {
              e.stopPropagation();
              handlePageClick("red");
            }}
          >
            <div className="flex items-center justify-center mb-8">
              <PunchPaperRed />
            </div>
          </div>
        </div>

        {/* WHITE LAYER */}
        <div
          ref={pageRefs.white}
          className="col-start-1 md:col-span-8 md:col-start-2 row-start-1 relative w-full min-h-screen pointer-events-none"
          style={{ zIndex: getZIndex("white") }}
        >
          <div
            className="pt-[35vh] md:pt-[18vh] pb-[20vh] px-6 md:px-0 h-full w-full pointer-events-auto cursor-pointer"
            data-page-content
            onClick={(e) => {
              e.stopPropagation();
              handlePageClick("white");
            }}
          >
            <div className="w-full h-full mb-8">
              <PunchPaperWhite />
            </div>
          </div>
        </div>
      </div>

      {/* Debug panel */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm backdrop-blur">
        <div className="font-bold mb-2">Debug Info:</div>
        <div>Stack: {stack.join(" → ")}</div>
        <div>Top layer: {stack[0]}</div>
      </div>
    </div>
  );
}
