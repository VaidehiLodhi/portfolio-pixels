"use client";
import { useEffect, useRef, useState } from "react";
import { PunchPaperRed } from "@/components/project-page/punch-paper-red";
import { PunchPaperWhite } from "@/components/punch-white/punch-paper-white";
import gsap from "gsap";
import { DiaryPage } from "@/components/diary-page/diary-page";
import { CattoFigurine } from "@/components/diary-page/catto-figurine";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type cardId = "red" | "white";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function Home() {
  const whiteRef = useRef<HTMLDivElement | null>(null);
  const redRef = useRef<HTMLDivElement | null>(null);
  const isAnimating = useRef(false);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const diaryRef = useRef(null);
  const cattoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const isMobile = useIsMobile();
  const [stack, setStack] = useState<cardId[]>(["red", "white"]);

  const pageRefs = { red: redRef, white: whiteRef };

  useGSAP(() => {
    if (isOpen) {
      gsap.to(diaryRef.current, { x: "20%", duration: 0.7, ease: "power2.inOut" });
      gsap.to(cattoRef.current, { y: 100, duration: 0.7, ease: "power2.inOut" });
    } else {
      gsap.to(diaryRef.current, { x: "87%", duration: 0.7, ease: "power2.inOut" });
      gsap.to(cattoRef.current, { y: -80, duration: 0.7, ease: "back.out(1.2)", delay: 0.3 });
    }
  }, [isOpen]);

  useGSAP(() => {
    if (isMobile) return;

    const redPage = redRef.current;
    const whitePage = whiteRef.current;
    if (!redPage || !whitePage) return;

    const redContent = redPage.querySelector("[data-page-content]") as HTMLElement;
    const whiteContent = whitePage.querySelector("[data-page-content]") as HTMLElement;
    if (!redContent || !whiteContent) return;

    const ctx = gsap.context(() => {
      const trigger = document.body;

      const stRed = gsap.to(redContent, {
        y: -600,
        ease: "none",
        scrollTrigger: { trigger, start: "top top", end: "+=200%", scrub: true },
      });

      const stWhite = gsap.to(whiteContent, {
        y: -900,
        ease: "none",
        scrollTrigger: { trigger, start: "top top", end: "+=200%", scrub: true },
      });

      scrollTriggersRef.current = [
        stRed.scrollTrigger!,
        stWhite.scrollTrigger!,
      ];
    });

    return () => {
      ctx.revert();
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

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
    const otherCardId = moving === "red" ? "white" : "red";
    const otherRef = pageRefs[otherCardId].current;
    if (!movingRef || !otherRef) { isAnimating.current = false; return; }

    const movingContent = movingRef.querySelector("[data-page-content]") as HTMLElement;
    const otherContent = otherRef.querySelector("[data-page-content]") as HTMLElement;
    if (!movingContent || !otherContent) { isAnimating.current = false; return; }

    const movingStartY = gsap.getProperty(movingContent, "y") as number;
    const otherStartY = gsap.getProperty(otherContent, "y") as number;

    // disable without resetting positions
    scrollTriggersRef.current.forEach(st => st.disable(false));

    gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        gsap.set([movingContent, otherContent], { clearProps: "rotation" });
        scrollTriggersRef.current.forEach(st => {
          st.enable();
          st.update();
        });
      },
    })
    .to(movingContent, { y: "300vh", rotation: -15, duration: 0.5, ease: "power2.in" }, 0)
    .to(otherContent, { y: "300vh", rotation: 15, duration: 0.5, ease: "power2.in" }, 0.2)
    .call(() => { setStack(nextStack); })
    .fromTo(
      movingContent,
      { y: "300vh", rotation: -15 },
      { y: movingStartY, rotation: 0, duration: 0.6, ease: "power1.out", immediateRender: false },
    )
    .fromTo(
      otherContent,
      { y: "300vh", rotation: 15 },
      { y: otherStartY, rotation: 0, duration: 0.6, ease: "power1.out", immediateRender: false },
      "-=0.4",
    );
  };

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex items-center justify-center px-10 font-sans">
      {isMobile ? (
        <div className="flex flex-col w-full px-4 py-10 gap-y-8">
          <div className="w-screen relative z-10"><DiaryPage /></div>
          <div ref={redRef}>
            <div data-page-content><PunchPaperRed /></div>
          </div>
          <div ref={whiteRef}>
            <div data-page-content><PunchPaperWhite /></div>
          </div>
        </div>
      ) : (
        <div className="relative grid grid-cols-1 md:grid-cols-12 md:gap-x-20 md:px-20 w-full min-h-screen">
          {/* RED LAYER */}
          <div
            ref={pageRefs.red}
            className="col-start-1 md:col-span-8 md:col-start-4 row-start-1 relative min-h-screen pointer-events-none flex items-start justify-center"
            style={{ zIndex: getZIndex("red") }}
          >
            <div
              className="pt-[40vh] md:pt-[20vh] pb-[20vh] px-6 md:px-0 w-fit"
              data-page-content
              onClick={(e) => { e.stopPropagation(); handlePageClick("red"); }}
            >
              <div className="flex items-center justify-center mt-8 ml-8 pointer-events-auto cursor-pointer">
                <PunchPaperRed />
              </div>
            </div>
          </div>

          {/* WHITE LAYER */}
          <div
            ref={pageRefs.white}
            className="col-start-1 md:col-span-8 md:col-start-2 row-start-1 relative flex items-start justify-center min-h-screen pointer-events-none"
            style={{ zIndex: getZIndex("white") }}
          >
            <div
              className="pt-[35vh] md:pt-[18vh] pb-[20vh] px-6 md:px-0 h-full w-fit"
              data-page-content
              onClick={(e) => { e.stopPropagation(); handlePageClick("white"); }}
            >
              <div className="w-full h-full max-w-[95vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1009px] mt-8 ml-8 pointer-events-auto cursor-pointer">
                <PunchPaperWhite />
              </div>
            </div>
          </div>

          {/* DIARY */}
          <div ref={diaryRef} onClick={handleToggle} className="absolute top-30 right-0 cursor-pointer z-50">
            <div ref={cattoRef} className="absolute top-10 left-4 -z-10" style={{ transform: "translateY(100px)" }}>
              <CattoFigurine />
            </div>
            <div className="relative z-10"><DiaryPage /></div>
          </div>
        </div>
      )}
    </div>
  );
}