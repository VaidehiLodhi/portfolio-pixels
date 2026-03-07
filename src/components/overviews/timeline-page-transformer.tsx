"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";

export const departure_mono = localFont({
  src: "../../../public/fonts/departure-mono.woff2",
  variable: "--font-departure-mono",
  display: "swap",
});

export const bringbold = localFont({
  src: "../../../public/fonts/bringbold-nineties.ttf",
  variable: "--font-bringbold",
  display: "swap",
});

export default function TimelinePageTransformer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    
    // Smooth lerp scroll
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const totalWidth = track.scrollWidth - window.innerWidth;
      targetScrollRef.current = Math.max(
        0,
        Math.min(totalWidth, targetScrollRef.current + e.deltaY + e.deltaX),
      );
    };

    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const totalWidth = track.scrollWidth - window.innerWidth;
      const dx = touchStartX - e.touches[0].clientX;
      const dy = touchStartY - e.touches[0].clientY;
      targetScrollRef.current = Math.max(
        0,
        Math.min(totalWidth, targetScrollRef.current + dx + dy),
      );
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onResize = () => {
      const totalWidth = track.scrollWidth - window.innerWidth;
      targetScrollRef.current = Math.min(targetScrollRef.current, totalWidth);
      currentScrollRef.current = Math.min(currentScrollRef.current, totalWidth);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", onResize);

    const tick = () => {
      const totalWidth = track.scrollWidth - window.innerWidth;
      currentScrollRef.current = lerp(
        currentScrollRef.current,
        targetScrollRef.current,
        0.08,
      );
      if (Math.abs(currentScrollRef.current - targetScrollRef.current) < 0.05) {
        currentScrollRef.current = targetScrollRef.current;
      }

      gsap.set(track, { x: -currentScrollRef.current });

      // Progress bar
      if (progressRef.current) {
        const pct = (currentScrollRef.current / totalWidth) * 100;
        progressRef.current.style.width = `${pct}%`;
      }

      // Animate section elements based on scroll
      const panels = track.querySelectorAll(".panel");
      panels.forEach((panel) => {
        const el = panel as HTMLElement;
        const rect = el.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const vCenter = window.innerWidth / 2;
        const dist = Math.abs(center - vCenter) / window.innerWidth;
        const visibility = Math.max(0, 1 - dist * 1.5);

        const texts = el.querySelectorAll(".reveal-text");
        texts.forEach((t) => {
          const eased = visibility; 

          (t as HTMLElement).style.opacity = `${eased}`;
          (t as HTMLElement).style.transform = `
            translateY(${(1 - eased) * 15}px)
            scaleY(${0.85 + eased * 0.15})
          `;
        });

        const parallaxEl = el.querySelector(".parallax-display") as HTMLElement;
        if (parallaxEl) {
          const offset = (center - vCenter) / window.innerWidth;
          const intensity = 15; 

          parallaxEl.style.transform = `translateX(${offset * intensity}%) scale(1.1)`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0e0d09",
        position: "relative",
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          background: "#F5E1CD",
          width: "100%",
          zIndex: 100,
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "rgba(201,74,61,1)",
            width: "0%",
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* Nav */}

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className={`${departure_mono.className} flex justify-center items-center  text-[#332525] px-10 bg-[#F5E1CD]`}
        style={{
          height: "100vh",
          willChange: "transform",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div className="panel w-full min-w-screen h-screen bg-[#F5E1CD] flex items-center justify-center gap-x-4">
          <div className="flex flex-col items-start justify-center gap-y-2">
            <p className="text-[14px] uppercase">[OVERVIEW]</p>
            <div
              className={` ${bringbold.className} text-4xl flex flex-col uppercase`}
            >
              <p>
                A WALL IS HIT, WHILE <br />
                EXPLORING TEXT GENERATION USING MULTI <br />
                LAYERED NEURAL NETS. <br />
                BUT A TRANSFORMER <br />
                PUSHES THE WALL DOWN. <br />
              </p>
            </div>
            <div className="text-[14px] leading-5 flex flex-col">
              <p>
                While playing around with text <br />
                generation, I experimented with <br />
                implementing a transformer <br />
                architecture from scratch, <br />
                simply to see cool <br />
                shakespearian babble. <br />
              </p>
            </div>
          </div>
          <div className="relative w-200 h-125 overflow-hidden">
            <Image
              src="/imgs/mockups/transformer_mockups/monet.jpg"
              priority
              alt="monet"
              fill
              className="object-cover parallax-img will-change-transform scale-120 parallax-display"
            />
            <div className="flex flex-col w-full items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/imgs/mockups/transformer_mockups/transformer_arch_greeb.png"
                priority
                alt="screen 1"
                height={657}
                width={462}
                className="w-auto h-full z-10 "
              />
            </div>
          </div>
        </div>

        {/* 2nd panel */}
        <div className="panel w-full min-w-screen h-screen bg-[#F5E1CD] flex items-center justify-center">
          <div
            className={`${departure_mono.className} text-[14px] flex items-center justify-between gap-x-8`}
          >
            <div className="flex flex-col items-center justify-center gap-x-4">
              <p>[THE STAGE]</p>
              <div className="flex flex-col items-center justify-center gap-x-1">
                <p>#1</p>
                <p>
                  When we scale up from a simple bigram model <br />
                  averaging past context with ‘for’ loops <br />
                  (the weakest form of aggregation) we <br />
                  form a baseline model. <br />
                  This is something we want to perform better <br />
                  than in all contexts.
                  <br />
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-x-1">
                <p>#2</p>
                <p>
                  we r training on shakespeare data, <br />
                  hence, we aim for text generation, rather <br />
                  than text translation, so we shine light on <br />
                  the decoder block
                  <br />
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-x-4">
              <p>[THE MAP]</p>
              <div className="flex flex-col items-center justify-center gap-x-1">
                <p>#3</p>
                <p>
                  having developed a single self-attention <br />
                  block to out network, we were already on <br />
                  road to a better loss than previously achieved <br />
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-x-1">
                <p>#4</p>
                <p>
                  Causal self attention : a lower triangular mask <br />
                  is applied to the attention scores before softmax, <br />
                  ensuring that each token can only attend to itself <br />
                  and preceding tokens. <br />
                  This preserves the autoregressive property during <br />
                  text generation. <br />
                  Lotsa words i know, but its fun :3 <br />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3rd panel */}
        <div className="panel w-full min-w-screen h-screen bg-[#F5E1CD] flex items-center justify-center">
          <div className="flex items-center justify-center gap-x-8">
            <div className="relative w-200 h-150 ">
              <Image
                src="/imgs/mockups/transformer_mockups/transformer_layers.png"
                alt="transformer_layers"
                priority
                fill
                className="object-fill"
              />
            </div>

            <div className="flex text-[14px] flex-col items-center justify-center gap-x-4">
              <p>[THE MAP]</p>
              <div className="flex flex-col items-center justify-center gap-x-1">
                <p>#5</p>
                <p>
                  For each attention head, the input is  <br />
                  linearly projected into three separate  <br />
                  spaces — queries, keys, and values —  <br />
                  using weight matrices without bias terms, <br />
                  allowing the model to learn what to <br/>
                  search for, what to expose, and what to aggregate. <br />
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-x-1">
                <p>#6</p>
                <p>
                  Each Transformer block first applies  <br />
                  multi-head self-attention (allowing tokens  <br />
                  to communicate with each other), <br/>
                  followed by a position-wise <br />
                  feedforward network (allowing each token to <br />
                  independently process the gathered information). <br />
                  AND WE R GOOD TO GO!! <br />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4th panel */}
        <div className="panel w-full min-w-screen h-screen bg-[#F5E1CD] flex items-center justify-center">
          <div className="flex items-center justify-center gap-x-8">
            <div className="relative w-200 h-125 overflow-hidden">
              <Image
                src="/imgs/mockups/transformer_mockups/monet.jpg"
                alt="monet"
                fill
                className="object-cover parallax-img will-change-transform scale-120 parallax-display"
              />
              <div className="flex flex-col w-full items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <p
                  className={`${bringbold.className} text-3xl text-white text-left`}
                >
                  THE IMAGE SHOWS THREE CHECKPOINTS <br />
                  THE GRADUALLY SIGNIFICANT <br />
                  CHANGES IN OUR ABILITY TO GENERATE <br />
                  SHAKESPEAREAN TEXT <br />
                  LEZZZ GO! <br />
                </p>
                <div
                  className={`${bringbold.className} text-3xl text-white mt-4`}
                >
                  <p className="text-left">
                    THE FINAL OUTPUT IS FRESH, <br />
                    THE MODEL IS ABLE TO GENERATE <br />
                    ENGLISH TEXT & THE DIALOGUE FORMAT <br />
                    OF DEAREST, SHAKESPEARE <br/>
                  </p>
                </div>
              </div>
            </div>
            <div className="text-[14px] self-end">
              <p>
                The Chat Interface is connected to a <br />
                LangChain Backend. <br />
                The LangChain is setup that way such that: <br />
              </p>
              <ul className="list-outside list-disc mt-4">
                <li>
                  A Chroma Vector Database is stored <br />
                  with large amount of chunked and <br />
                  embedded ocean data. <br />
                </li>
                <li>
                  When a user query comes, it is sent <br />
                  to the same backend where the query <br />
                  is embedded and then similarity <br />
                  functions try finding the top K <br />
                  similar chunks that the query asks for. <br />
                </li>
                <li>
                  The Retrieved chunks are translated <br />
                  back into context and given back to <br />
                  the LLM model which uses it to answer <br />
                  the user query with backed up <br />
                  augmented knowlegde <br />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Back button - fixed to right edge */}
      <button
        onClick={() => router.push("/")}
        className={`${bringbold.className} fixed top-0 right-0 z-[300] h-screen w-5 p-2 bg-[#DF4346] text-[#FFFFFF] text-[20px] tracking-widest opacity-20 hover:opacity-100 transition-opacity duration-200 cursor-pointer flex items-center justify-center`}
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        [BACK]
      </button>

      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          opacity: 0.5,
          zIndex: 200,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}

