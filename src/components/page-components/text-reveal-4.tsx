"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RickStickerPack } from "./rick_sticker_pack";

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

interface TextRevealComponent4Props {
  timelineRef: { current: gsap.core.Timeline | null };
}

export const TextRevealComponent4 = ({
  timelineRef,
}: TextRevealComponent4Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const needRef = useRef<HTMLDivElement>(null);
  const executionRef = useRef<HTMLDivElement>(null);
  const highlight1Ref = useRef<HTMLDivElement>(null);
  const highlight2Ref = useRef<HTMLDivElement>(null);
  const scribbleRef = useRef<SVGPathElement>(null);
  const deservesRef = useRef<HTMLDivElement>(null);

  const [scribblePath, setScribblePath] = useState("");
  const [viewBox, setViewBox] = useState("0 0 200 100");

  useEffect(() => {
    fetch("/imgs/bg/scribble.svg")
      .then((res) => res.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const pathElement = svgDoc.querySelector("path");
        const svgElement = svgDoc.querySelector("svg");
        if (pathElement) setScribblePath(pathElement.getAttribute("d") || "");
        if (svgElement)
          setViewBox(svgElement.getAttribute("viewBox") || "0 0 200 100");
      });
  }, []);

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

      gsap.set(deservesRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      // scribble initial state — only possible once scribblePath has loaded
      const scribbleLength = scribbleRef.current?.getTotalLength() ?? 0;
      if (scribbleRef.current && scribbleLength > 0) {
        gsap.set(scribbleRef.current, {
          strokeDasharray: scribbleLength,
          strokeDashoffset: scribbleLength,
        });
      }

      // paused — PinWheel will scrub progress()
      const tl = gsap.timeline({ paused: true });

      // line 1
      tl.to(line1Chars, {
        scaleY: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
      })
        // line 2 text
        .to(
          line2Chars,
          {
            scaleY: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.4",
        );

      // scribble draw — only add if path is loaded
      if (scribbleRef.current && scribbleLength > 0) {
        tl.fromTo(
          scribbleRef.current,
          {
            strokeDasharray: scribbleLength,
            strokeDashoffset: scribbleLength,
          },
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power1.inOut",
          },
          ">-0.2",
        );
      }

      tl
        // "need" slides left
        .fromTo(
          needRef.current,
          { x: 0 },
          { x: -120, duration: 0.6, ease: "power2.out" },
          ">",
        )
        // "deserve" fades in
        .fromTo(
          deservesRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          "<",
        )
        // highlight 1 grows
        .fromTo(
          highlight1Ref.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          ">",
        )
        // line 3
        .to(
          line3Chars,
          {
            scaleY: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          highlight2Ref.current,
          { scaleX: 1, duration: 0.4, ease: "power2.inOut" },
          ">-0.1",
        );

      // expose to PinWheel
      timelineRef.current = tl;
    },
    // rebuild timeline when scribblePath loads so getTotalLength() is valid
    { scope: containerRef, dependencies: [scribblePath] },
  );

  return (
    <div
      className="card absolute top-1/2 left-1/2 h-[80%] w-[65%] rounded-[10px] flex flex-col items-center justify-center bg-[#F0FAFF] overflow-clip"
      style={{
        transformOrigin: "center bottom",
        willChange: "transform",
      }}
    >
      <div ref={containerRef} className="container relative w-full">
        <div className="mb-0">
          {/* First line - "ur ideas" */}
          <span className="line1 block text-right pr-5 md:text-center md:pr-0">
            <span
              className={`${source_code.className} uppercase text-[30px] inline-block`}
              style={{ transform: "translate(0%, 0%)" }}
            >
              {splitTextIntoChars("ur ideas")}
            </span>

            <div
              style={{ transform: "translateX(-50%) translateY(-50%)" }}
              className="absolute top-1/2 left-1/2 -translate-y-25 -translate-x-40"
            >
              <Image
                src="/imgs/stickers/reveal-4/pancake.png"
                height={51}
                width={142}
                alt="pancakes"
              />
            </div>
          </span>

          {/* Second line - "need" → "deserve" with scribble + highlight */}
          <span
            className="line2 block relative text-center"
            style={{ transform: "translate(0%, 0%)" }}
          >
            <span className="relative inline-block" ref={needRef}>
              <span
                className={`${magnat_text_regular.className} text-[64px] inline-block relative z-10`}
              >
                {splitTextIntoChars("need")}
              </span>
              {scribblePath && (
                <svg
                  viewBox={viewBox}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ width: "110%", height: "120%" }}
                >
                  <path
                    ref={scribbleRef}
                    d={scribblePath}
                    stroke="#FF0000"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              )}
            </span>
            <span className="absolute left-1/2 top-1/2 -translate-y-1/2">
              <span
                ref={deservesRef}
                className={`${magnat_text_regular.className} text-[64px] inline-block relative z-10 ml-5`}
              >
                deserve
              </span>
              <div
                ref={highlight1Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-70 h-14 bg-[#E4CEFF]"
              />
            </span>
          </span>

          {/* Third line - "A great execution" */}
          <span
            className="line3 block relative mt-[0.1em] text-center"
            style={{ transform: "translate(0%, -10%)" }}
          >
            <span className="inline-block" ref={executionRef}>
              <span
                className={`${housing.className} text-[54px] font-normal inline-block`}
              >
                {splitTextIntoChars("A ")}
              </span>
              <span
                className={`${didot.className} text-[45px] italic inline-block`}
              >
                {splitTextIntoChars("great  ")}
              </span>
              <span className="relative inline-block">
                <span
                  className={`${didot.className} relative z-10 text-[45px] italic inline-block`}
                >
                  {splitTextIntoChars("execution")}
                </span>
              </span>
            </span>

            <div
              style={{ transform: "translateX(55%) translateY(55%)" }}
              className="absolute bottom-0 right-0 -translate-x-45"
            >
              <RickStickerPack />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
