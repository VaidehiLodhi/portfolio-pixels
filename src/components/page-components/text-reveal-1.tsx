"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";
import { useRef } from "react";
import { Highlight1 } from "./highlight1";
import Image from "next/image";
import StickerPeel from "../StickerPeel";
import { useIsMobile } from "../../../hooks/use-is-mobile";

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

interface TextRevealComponent1Props {
  timelineRef: { current: gsap.core.Timeline | null };
}

export const TextRevealComponent1 = ({
  timelineRef
} : TextRevealComponent1Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isntfunRef = useRef<HTMLDivElement>(null);
  const anymoreRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
    if (isMobile) return;
    if (!containerRef.current) return;

    const line1Chars = containerRef.current.querySelectorAll(".line1 .char");
    const line2Chars = containerRef.current.querySelectorAll(".line2 .char");
    const line3Chars = containerRef.current.querySelectorAll(".line3 .char");

    // 3D context
    gsap.set(containerRef.current, { perspective: 800 });

    // initial char state
    gsap.set([line1Chars, line2Chars, line3Chars], {
      scaleY: 0.01,
      rotationX: -90,
      transformOrigin: "50% 100%",
    });

    // initial highlight
    gsap.set(highlightRef.current, {
      clipPath: "inset(0% 100% 0% 0%)",
    });

    // paused — PinWheel will scrub progress()
    const tl = gsap.timeline({ paused: true });

    tl.to(line1Chars, {
      scaleY: 1,
      rotationX: 0,
      duration: 1,
      stagger: 0.04,
      ease: "power2.out",
    })
      .to(
        line2Chars,
        {
          scaleY: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.04,
          ease: "power2.out",
        },
        "-=0.6",
      )
      .to(
        line3Chars,
        {
          scaleY: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.04,
          ease: "power2.out",
        },
        "-=0.5",
      )
      .to(
        highlightRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power1.out",
        },
        "-=0.8",
      )
      .to(
        isntfunRef.current,
        {
          x: "-20%",
          ease: "power1.out",
        },
        "<",
      )
      .to(
        anymoreRef.current,
        {
          x: "20%",
          ease: "power1.out",
        },
        "<",
      );

    // expose to PinWheel
    timelineRef.current = tl;
  },
  { scope: containerRef },
);


  return (
    <div
      className="card absolute top-1/2 left-1/2  h-[60%] md:h-[80%] w-[70%] md:w-[65%] rounded-[10px] flex flex-col items-center justify-center bg-[#FAB5C5] overflow-clip"
      style={{
        transformOrigin: "center bottom",
        willChange: "transform",
      }}
    >
      <div ref={containerRef} className="container relative w-full">
        {isMobile ? (
          // ── MOBILE: static text, no char splitting ──
          <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
            <span className={`${source_code.className} uppercase text-[14px]`}>
              so, if normal
            </span>
            <div className="relative inline-block">
              <span
                className={`${magnat_text_regular.className} text-[32px] lowercase relative z-10`}
              >
                isn't fun
              </span>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full h-10 opacity-60"
                style={{ clipPath: "inset(0% 0% 0% 0%)" }}
              >
                <Highlight1 />
              </div>
            </div>
            <span className="flex items-baseline gap-0.5">
              <span className={`${housing.className} text-[28px] font-normal`}>
                A
              </span>
              <span className={`${didot.className} text-[26px] italic`}>
                nymore
              </span>
            </span>
            {/* stickers — smaller on mobile */}
            <div className="flex gap-4 mt-2 justify-center">
              <StickerPeel
                imageSrc="/imgs/stickers/reveal-1/kato_pixel_boi.png"
                width={40}
                height={84}
                alt="kato_sticker"
                rotate={-10}
                peelBackHoverPct={20}
                peelBackActivePct={40}
                shadowIntensity={0}
                peelDirection={15}
              />
              <StickerPeel
                imageSrc="/imgs/stickers/reveal-1/jax_rabbit.png"
                width={55}
                height={66}
                rotate={0}
                peelBackHoverPct={20}
                peelBackActivePct={40}
                shadowIntensity={0.2}
                peelDirection={90}
                alt="jax_sticker"
              />
            </div>
          </div>
        ) : (
          <div className="mb-0">
            {/* First line - "so, if normal" */}
            <span className="line1 relative block text-right pr-5 md:text-center md:pr-0">
              <span
                className={`${source_code.className} uppercase text-[30px] inline-block`}
                style={{ transform: "translate(20%, 0%)" }}
              >
                {splitTextIntoChars("so, if normal")}
              </span>

              {/* catto sticker comes here */}
              <div
                style={{
                  transform: "translateX(-50%) translateY(-50%)",
                }}
                className="absolute top-1/2 left-1/2 -translate-y-5 -translate-x-50 z-10"
              >
                <StickerPeel
                  imageSrc="/imgs/stickers/reveal-1/kato_pixel_boi.png"
                  width={74}
                  height={156}
                  alt="kato_sticker"
                  rotate={-10}
                  peelBackHoverPct={20}
                  peelBackActivePct={40}
                  shadowIntensity={0}
                  peelDirection={15}
                />
              </div>
            </span>

            {/* Second line - "isn't fun" with highlight */}
            <span
              className="line2 block relative text-center"
              style={{ transform: "translate(0%, 0%)" }}
            >
              <span className="relative inline-block" ref={isntfunRef}>
                <span
                  className={`${magnat_text_regular.className} text-[64px] lowercase inline-block relative z-10`}
                >
                  {splitTextIntoChars("isn't fun")}
                </span>
                <div
                  ref={highlightRef}
                  style={{
                    // inline takes precedence over className
                    width: "700px",
                    height: "200px",
                    // positions left edge at parents's horizontal center
                    // positions top edge at parent's vertical center
                    transform: "translateX(-50%)", // due to left and transform x, perfectly centered
                  }}
                  className="absolute flex items-center justify-center left-1/2 top-1/2 -translate-y-1/2 translate-x-20"
                >
                  <Highlight1 />
                </div>
              </span>
            </span>

            {/* Third line - "Anymore" */}
            <span
              className="line3 block relative mt-[0.1em] text-center"
              style={{ transform: "translate(-10%, 0%)" }}
            >
              <span
                className="flex justify-center items-baseline"
                ref={anymoreRef}
              >
                <span
                  className={`${housing.className} text-[54px] font-normal inline-block`}
                >
                  {splitTextIntoChars("A")}
                </span>
                <span
                  className={`${didot.className} text-[48px] italic inline-block`}
                >
                  {splitTextIntoChars("nymore")}
                </span>
              </span>

              {/* jax sticker comes here */}
              <div
                style={{
                  transform: "translateX(100%) translateY(-60%)",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-50"
              >
                <StickerPeel
                  imageSrc="/imgs/stickers/reveal-1/jax_rabbit.png"
                  width={110.15}
                  height={131.6}
                  rotate={0}
                  peelBackHoverPct={20}
                  peelBackActivePct={40}
                  shadowIntensity={0.2}
                  peelDirection={90}
                  alt="jax_sticker"
                />
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
