"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const source_code = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code",
  display: "swap",
});

export const didot = localFont({
  src: "../../../public/fonts/didot_italic.otf",
  variable: "--font-didot-italic",
  display: "swap",
});

export const housing = localFont({
  src: "../../../public/fonts/housing.ttf",
  variable: "--font-housing",
  display: "swap",
});

export const magnat_text_regular = localFont({
  src: "../../../public/fonts/magnat_family/text_test/magnat_text_test_regular.woff",
  variable: "--font-magnat_text_regular",
  display: "swap",
});

export const TextRevealComponent2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const freshthinkingRef = useRef<HTMLDivElement>(null);
  const creativeprojectsRef = useRef<HTMLDivElement>(null);
  const anymoreRef = useRef<HTMLDivElement>(null);
  const highlight1Ref = useRef<HTMLDivElement>(null);
  const highlight2Ref = useRef<HTMLDivElement>(null);

  // split text into words and then characters
  const splitTextIntoChars = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char inline-block"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

useGSAP(
  () => {
    if (!containerRef.current) return;

    const line1Chars = containerRef.current.querySelectorAll(".line1 .char");
    const line2Chars = containerRef.current.querySelectorAll(".line2 .char");

    // perspective for 3D flip
    gsap.set(containerRef.current, { perspective: 800 });

    // initial char state
    gsap.set([line1Chars, line2Chars], {
      scaleY: 0.01,
      rotationX: -90,
      transformOrigin: "50% 100%",
    });

    // initial highlight state
    gsap.set([highlight1Ref.current, highlight2Ref.current], {
      scaleX: 0,
      transformOrigin: "left center",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
        toggleActions: "play none none reverse",
        markers: true,
      },
    });

    // LINE 1 chars
    tl.to(line1Chars, {
      scaleY: 1,
      rotationX: 0,
      duration: 1,
      stagger: 0.04,
      ease: "power2.out",
    });

    // LINE 2 chars (slightly overlaps)
    tl.to(
      line2Chars,
      {
        scaleY: 1,
        rotationX: 0,
        duration: 1,
        stagger: 0.04,
        ease: "power2.out",
      },
      "-=0.6",
    );

    // highlights grow *with* text, not after
    tl.to(
      [highlight1Ref.current, highlight2Ref.current],
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.8",
    );
  },
  { scope: containerRef },
);

  return (
    <div
      className="section h-screen w-full flex flex-col items-center justify-center bg-[#F5F4C7] overflow-clip"
      style={{
        transform: "rotate(30deg)",
        transformOrigin: "bottom left",
        willChange: "transform",
      }}
    >
      <div ref={containerRef} className="container relative w-full">
        <div className="mb-0">
          {/* First line - "fresh thinking and creative projects" */}
          <div className="line1 block text-center px-5 md:text-center md:px-0">
            <div className="flex items-baseline justify-center gap-x-10">
              <span className="relative inline-block" ref={freshthinkingRef}>
                <span
                  className={`${magnat_text_regular.className} text-[56px] inline-block relative z-10`}
                >
                  {splitTextIntoChars("Fresh Thinking")}
                </span>
                <div
                  ref={highlight1Ref}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-100 h-16 bg-[#E4CEFF]"
                />
              </span>

              <span
                className={`${source_code.className} uppercase text-[40px] inline-block`}
              >
                {splitTextIntoChars("AND")}
              </span>

              <span className="relative inline-block" ref={creativeprojectsRef}>
                <span
                  className={`${magnat_text_regular.className} text-[56px] inline-block relative z-10`}
                >
                  {splitTextIntoChars("Creative Projects")}
                </span>
                <div
                  ref={highlight2Ref}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-100 h-16 bg-[#CEDFFF]"
                />
              </span>
            </div>
          </div>

          {/* Second line - "Are what you seek" */}
          <span
            className="line2 block relative mt-[0.1em] text-center"
            style={{ transform: "translate(2%, 0%)" }}
          >
            <span className="inline-block" ref={anymoreRef}>
              <span
                className={`${housing.className} text-[64px] font-normal inline-block`}
              >
                {splitTextIntoChars("A")}
              </span>
              <span
                className={`${didot.className} text-[64px] italic inline-block`}
              >
                {splitTextIntoChars("re what you seek")}
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
