"use client";
import { useRef, useState } from "react";
import { PunchPaperRed } from "@/components/project-page/punch-paper-red";
import { PunchPaperWhite } from "@/components/punch-white/punch-paper-white";
import gsap from "gsap";
import { DiaryPage } from "@/components/diary-page/diary-page";
import { CattoFigurine } from "@/components/diary-page/catto-figurine";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type cardId = "red" | "white";

export default function Home() {
  const whiteRef = useRef<HTMLDivElement | null>(null);
  const redRef = useRef<HTMLDivElement | null>(null);
  const isAnimating = useRef(false);

  // diary states for mii
  const diaryRef = useRef(null);
  const cattoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const [stack, setStack] = useState<cardId[]>(["red", "white"]);

  const pageRefs = {
    red: redRef,
    white: whiteRef,
  };

  useGSAP(() => {
      // animation will go here
      if (isOpen) {
          gsap.to(diaryRef.current, {
              x: "20%",
              duration: 0.7,
              ease: "power2.inOut"
          });
          // diary opens >< catto hides down
          gsap.to(cattoRef.current, {
              y: 100,
              duration: 0.7,
              ease: "power2.inOut"
          });
      } else {
          // animate to closed position (mostly off screen)
          gsap.to(diaryRef.current, {
              x: "87%",
              duration: 0.7,
              ease: "power2.inOut"
          });
          // catto pops innn :3
          gsap.to(cattoRef.current, {
              y: -80,
              duration: 0.7,
              ease: "back.out(1.2)",
              delay: 0.3  // slight delay so i appears after diary hehe 
          })
      }
  }, [isOpen]);

  // adding parallax scrolling lezz goo
  useGSAP(() => {
    const redPage = redRef.current;
    const whitePage = whiteRef.current;

    if (!redPage || !whitePage) return;

    const redContent = redPage.querySelector("[data-page-content]") as HTMLElement;
    const whiteContent = whitePage.querySelector("[data-page-content]") as HTMLElement;

    if(!redContent || !whiteContent) return;

    const ctx = gsap.context(() => {
      const trigger = document.body;
      gsap.fromTo(
        redContent, 
        {y : 0},
        {
          y: -600,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "+=200%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        whiteContent,
        {y: 0},
        {
          y: -900,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "+=200%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

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
    // if moving is red, then other card is white or vice versa
    const otherCardId = moving === "red" ? "white" : "red";
    const otherRef = pageRefs[otherCardId].current;
    if (!movingRef || !otherRef) {
      isAnimating.current = false;
      return;
    }

    const movingContent = movingRef.querySelector("[data-page-content]",) as HTMLElement;
    const otherContent = otherRef.querySelector("[data-page-content]") as HTMLElement;

    if (!movingContent || !otherContent) {
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
      .to(
        movingContent,
        {
          y: "150vh",
          rotation: -15,
          duration: 0.5,
          ease: "power2.in",
        },
        0,
      )
      .to(
        otherContent,
        {
          y: "150vh",
          rotation: 15,
          duration: 0.5,
          ease: "power2.in",
        },
        0.2,
      )
      // updating the stack while off screen
      .call(() => {
        setStack(nextStack);
      })
      .fromTo(
        movingContent,
        {
          y: "150vh",
          rotation: -15,
        },
        {
          y: "0vh",
          rotation: 0,
          duration: 0.6,
          ease: "power1.out",
          immediateRender: false,
        },
      )
      .fromTo(
        otherContent,
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
        },
        "-=0.4",
      );
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };  

  return (
    <div className="min-h-screen flex items-center justify-center p-10 font-sans">
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
            onClick={(e) => {
              e.stopPropagation();
              handlePageClick("red");
            }}
          >
            <div className="flex items-center justify-center mb-8 mr-8 pointer-events-auto cursor-pointer">
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
            onClick={(e) => {
              e.stopPropagation();
              handlePageClick("white");
            }}
          >
            <div className="w-full h-full max-w-[95vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1009px] mb-8 mr-8 pointer-events-auto cursor-pointer">
              <PunchPaperWhite />
            </div>
          </div>
        </div>
      </div>

      {/* diary page starts here */}
      <div
        ref={diaryRef}
        onClick={handleToggle}
        className="absolute top-90 right-0 cursor-pointer z-50"
      >
        {/* cattooo incoming*/}
        <div
          ref={cattoRef}
          className="absolute top-10 left-4 -z-10"
          style={{ transform: "translateY(100px)" }}
        >
          <CattoFigurine />
        </div>

        <div className="relative z-10">
          <DiaryPage />
        </div>
      </div>
    </div>
  );
}
