"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import { useRef } from "react";
import { BmoStickerPack } from "./bmo_sticker_pack";
import StickerPeel from "../StickerPeel";

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

export const TextRevealComponent3 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isntfunRef = useRef<HTMLDivElement>(null);
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
    const line3Chars = containerRef.current.querySelectorAll(".line3 .char");

    // ---------- INITIAL STATE ----------
    gsap.set(containerRef.current, { perspective: 800 });

    gsap.set([...line1Chars, ...line2Chars, ...line3Chars], {
      scaleY: 0.01,
      rotationX: -90,
      transformOrigin: "50% 100%",
    });

    gsap.set([highlight1Ref.current, highlight2Ref.current].filter(Boolean), {
      scaleX: 0,
      transformOrigin: "left center",
    });

    // ---------- LINE 1 ----------
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".line1",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
      .to(line1Chars, {
        scaleY: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
      });

    // ---------- LINE 2 (TEXT → HIGHLIGHT) ----------
    const line2TL = gsap.timeline({
      scrollTrigger: {
        trigger: ".line2",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    line2TL
      .to(line2Chars, {
        scaleY: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
      })
      .to(
        highlight1Ref.current,
        {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        ">-0.1",
      );

    // ---------- LINE 3 (TEXT → HIGHLIGHT) ----------
    const line3TL = gsap.timeline({
      scrollTrigger: {
        trigger: ".line3",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    line3TL
      .to(line3Chars, {
        scaleY: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
      })
      .to(
        highlight2Ref.current,
        {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        ">-0.1",
      );

    // parallax thimgs
    gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      })
      .to(
        isntfunRef.current,
        {
          x: "-10%",
          ease: "power2.out",
        },
        0,
      )
      .to(
        anymoreRef.current,
        {
          x: "10%",
          ease: "power2.out",
        },
        0,
      );
  },
  { scope: containerRef },
);

  return (
    <div
      className="section h-screen w-full flex flex-col items-center justify-center bg-[#D0F5C7] overflow-clip"
      style={{
        transform: "rotate(30deg)",
        transformOrigin: "bottom left",
        willChange: "transform",
      }}
    >
      <div ref={containerRef} className="container relative w-full">
        <div className="mb-0">
          {/* First line - "so, if normal" */}
          <span className="line1 block text-right pr-5 md:text-center md:pr-0">
            <span
              className={`${source_code.className} uppercase text-[40px] inline-block`}
              style={{ transform: "translate(20%, 0%)" }}
            >
              {splitTextIntoChars("then i'll bring")}
            </span>
          </span>

          {/* Second line - "isn't fun" with highlight */}
          <span
            className="line2 block relative text-center"
            style={{ transform: "translate(0%, 0%)" }}
          >
            <span className="relative inline-block" ref={isntfunRef}>
              <span
                className={`${magnat_text_regular.className} text-[84px] inline-block relative z-10`}
              >
                {splitTextIntoChars("The skills")}
              </span>
              <div
                ref={highlight1Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-100 h-16 bg-[#76FF02]"
              />
            </span>

            {/* radish sticker comes here */}
            <div
              style={{
                transform: "translateX(50%) translateY(50%)",
              }}
              className="absolute right-1/2 bottom-0 translate-x-55 -translate-y-15"
              // right-0 aligns the right edge of the absolute element with the right edge of the parent
              // bottom-0 aligns the bottom edge of the absolute element with the bottom edge of the parent
            >
              <StickerPeel
                imageSrc="/imgs/stickers/reveal-3/radish.png"
                height={165.78}
                width={101.92}
                alt="radish_sticker"
                rotate={-8}
                peelBackHoverPct={20}
                peelBackActivePct={30}
                shadowIntensity={0.2}
                peelDirection={0}
              />
            </div>
          </span>

          {/* Third line - "Anymore" */}
          <span
            className="line3 block relative mt-[0.1em] text-center"
            style={{ transform: "translate(12%, 0%)" }}
          >
            <span className="inline-block" ref={anymoreRef}>
              <span
                className={`${housing.className} text-[64px] font-normal inline-block`}
              >
                {splitTextIntoChars("T")}
              </span>
              <span
                className={`${didot.className} text-[64px] italic inline-block`}
              >
                {splitTextIntoChars("o capture ")}
              </span>
              <span className="relative inline-block">
                <span
                  className={`${didot.className} relative z-10 text-[64px] italic inline-block`}
                >
                  {splitTextIntoChars("meaning")}
                </span>
                <div
                  ref={highlight2Ref}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-60 h-16 bg-[#E4CEFF]"
                />
              </span>
            </span>

            {/* bmo sticker pack here */}
            <div className="absolute left-0 top-0 -translate-x-10 -translate-y-10">
              <BmoStickerPack />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
