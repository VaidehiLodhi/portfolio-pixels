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

export default function TimelinePageRagChat() {
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
      className="p-6"
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
        className={`${departure_mono.className} flex justify-center items-center gap-x-8 text-[#332525] p-6 bg-[#F5E1CD]`}
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
                TODAY’S DIGITAL WORLD <br />
                OFFERS CHAT INTERFACES <br />
                SEEMINGLY EVERYWHERE, <br />
                PLAGUED BY THE AMBIGUITY OF <br />
                UNSUSTAINABLE BACKEND <br />
                PROCESSING,
                <br />
              </p>
            </div>
            <div className="text-[14px] leading-5 flex flex-col">
              <p>
                Aim is to build a RAG Chat <br />
                Pipeline that is sustainable,
                <br />
                reliable and brings back to u <br />
                the law related answers you seek.
                <br />
              </p>
            </div>
          </div>
          <div className="relative ml-20">
            <Image
              src="/imgs/mockups/rag_chat_mockups/inngest_perspective.png"
              alt="inngest perspective mockup"
              height={509}
              width={764}
              priority
              className="w-150 h-auto z-0 relative"
            />
            <Image
              src="/imgs/mockups/rag_chat_mockups/chat_perspective.png"
              alt="chat perspective mockup"
              height={509}
              width={764}
              priority
              className="w-150 h-auto z-10 absolute top-1/2 left-1/2 -translate-x-90 -translate-y-30"
            />
          </div>
        </div>

        {/* 2nd panel */}
        <div className="panel w-full min-w-screen h-screen bg-[#F5E1CD] flex items-center justify-center">
          <div className="flex items-center justify-center gap-x-8">
            <div className="relative w-200 h-125 overflow-hidden">
              <Image
                src="/imgs/mockups/rag_chat_mockups/lin_mei_unsplash.jpg"
                alt="lin_mei_japan"
                priority
                fill
                className="object-cover parallax-img will-change-transform scale-120 parallax-display"
              />
              <p className="absolute bottom-2 left-2 text-xs text-[#816D6D]">
                Photo by{" "}
                <a
                  href="https://unsplash.com/@mytinyatlas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  className="underline"
                >
                  Lin Mei
                </a>{" "}
                on{" "}
                <a
                  href="https://unsplash.com/@mytinyatlas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  className="underline"
                >
                  Unsplash
                </a>
              </p>
              <div className="flex flex-col w-full items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <p
                  className={`${departure_mono.className} text-[14px] text-white`}
                >
                  [THE CHALLENGE]
                </p>
                <p className={`${bringbold.className} text-3xl text-white text-left`}>
                  HAMPERED BY INCONSISTENCIES; <br />
                  IT’S EASY FOR LLMs & RAGs TO GET <br />
                  LOST IN THE WHIRLPOOL OF ISSUES. <br />
                </p>
                <div className={`${bringbold.className} text-3xl text-white mt-4`}>
                  <p className="text-left">A THREE FOLD STACK was built for rescue:</p>
                  <ol className="list-decimal list-inside">
                    <li>INPUT VALIDATION & SANITIZATION</li>
                    <li>TRACEABILITY OF QUERIES</li>
                    <li>REFETCHING & QUEUEING</li>
                  </ol>
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

        {/* 3rd panel */}
        <div className="panel w-full min-w-screen h-screen bg-[#F5E1CD] flex items-center justify-center">
          <div className="flex items-center justify-center gap-x-8">
            <div className="relative w-200 h-125 overflow-hidden">
              <Image
                src="/imgs/mockups/rag_chat_mockups/soliman_cifuentes_tree.jpg"
                alt="soliman_tree"
                priority
                fill
                className="object-cover parallax-img will-change-transform scale-120 parallax-display"
              />
              <p className="absolute bottom-2 left-2 text-xs text-[#7e6d81]">
                Photo by{" "}
                <a
                  href="https://unsplash.com/photos/the-branches-of-a-tree-with-purple-flowers-against-a-blue-sky-E0istEV9CV8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  className="underline"
                >
                  Soliman Cifuentes
                </a>{" "}
                on{" "}
                <a
                  href="https://unsplash.com/photos/the-branches-of-a-tree-with-purple-flowers-against-a-blue-sky-E0istEV9CV8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  className="underline"
                >
                  Unsplash
                </a>
              </p>
              <div className="flex w-full h-full items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/imgs/mockups/rag_chat_mockups/screen_side_1.svg"
                  alt="screen 1"
                  height={347}
                  width={282}
                  className=" self-start w-70 h-auto z-10 "
                />
                <Image
                  src="/imgs/mockups/rag_chat_mockups/screen_side_2.svg"
                  alt="screen 2"
                  height={347}
                  width={282}
                  className="translate-y-10 self-end w-70 h-auto z-10 "
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-3 items-start justify-center self-start text-[14px]">
              <p>
                [VISUAL DIRECTION] <br />
                The utilisation of clean mono fonts,
                <br />
                and simple palette resolves the clutter <br />
                Some designs need clarity and <br />
                simplicity serves this purpose <br />
              </p>
            </div>
          </div>
        </div>
        {/* 4th panel */}
        <div className="panel w-full min-w-screen h-screen bg-[#F5E1CD] flex items-center justify-start">
          <div className="flex">
              <Image
                src="/imgs/mockups/rag_chat_mockups/rag_mockup_screen.png"
                alt="rag mockup"
                priority
                width={1035}
                height={540}
                className="relative h-full z-10"
              />
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

