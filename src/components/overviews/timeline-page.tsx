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

export default function TimelinePage() {
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
        <div className="panel w-screen h-screen bg-[#F5E1CD] flex items-center justify-center gap-x-4">
          <div className="flex flex-col items-start justify-center gap-y-2">
            <p className="text-[14px] uppercase">[OVERVIEW]</p>
            <div
              className={` ${bringbold.className} text-4xl flex flex-col uppercase`}
            >
              <p>It's in the name;</p>
              <p>Hive provides a stage</p>
              <p>to allow a community</p>
              <p>of creatives, planners</p>
              <p>to collaborate.</p>
            </div>
            <div className="text-[14px] leading-5 flex flex-col">
              <p>A web based application that</p>
              <p>aims to provide users a</p>
              <p>kanban-like playing arena</p>
            </div>
          </div>
          <Image
            src="/imgs/mockups/hive_mockups/hive_mock_1.svg"
            alt="hive mockup"
            priority
            height={363}
            width={693.63}
          />
        </div>

        {/* 2nd panel */}
        <div className="panel w-screen h-screen bg-[#F5E1CD] flex items-center justify-center">
          <div className="flex items-center justify-center gap-x-8">
              <div className="relative w-200 h-125 overflow-hidden">
                <Image
                  src="/imgs/mockups/hive_mockups/clay_banks_japan.jpg"
                  alt="clay_banks_japan"
                  priority
                  fill
                  className="object-cover parallax-img will-change-transform scale-120 parallax-display"
                />
                <p className="absolute bottom-2 left-2 text-xs text-[#816D6D]">
                  Photo by{" "}
                  <a
                    href="https://unsplash.com/photos/three-bicycles-parked-in-front-of-building-hwLAI5lRhdM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    className="underline"
                  >
                    Clay Banks
                  </a>{" "}
                  on{" "}
                  <a
                    href="https://unsplash.com/photos/three-bicycles-parked-in-front-of-building-hwLAI5lRhdM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    className="underline"
                  >
                    Unsplash
                  </a>
                </p>
                <video
                  className="rounded-lg px-8 absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%]"
                  autoPlay
                  muted
                  preload="auto"
                  loop
                  playsInline
                >
                  <source
                    src="/imgs/mockups/hive_mockups/videos/creating_board_rewrap_rewrap_noa.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            <p className="text-[14px] self-end">
              As mentioned earlier, <br />
              the aim of this is to mimic the freedom <br />
              offered by brainstorming, <br />
              scribbling down ideas. <br />
              Watching ur teammates figure stuff <br />
              around through a spectator interface. <br />
              Pitching in when needed.
              <br />
            </p>
          </div>
        </div>

        {/* 3rd panel */}
        <div className="panel w-screen h-screen bg-[#F5E1CD] flex items-center justify-center">
          <div className="flex items-center justify-center gap-x-8">
            <div className="relative overflow-hidden w-200 h-125">
              <Image
                src="/imgs/mockups/hive_mockups/isometric_perspective_hive.png"
                alt="isometric_perspective_hive"
                priority
                fill
                className="object-cover parallax-img will-change-transform scale-120 parallax-display"
              />
            </div>
            <div className="flex flex-col gap-y-3 items-start justify-center self-start text-[14px]">
              <p>
                sometimes all a team <br />
                desires can be provided <br />
                through serene partnership <br />
              </p>
              <p>
                [ORGANIZATION PANEL] <br />
                invite the members you want,
                <br />
                curate the team u aspire <br />
              </p>
              <p>
                [ACTIVITY PANEL] <br />
                keep tabs on changes made,
                <br />
                let the changes guide you;
                <br />
              </p>
            </div>
          </div>
        </div>
        {/* 4th panel */}
        <div className="panel w-screen h-screen bg-[#F5E1CD] flex items-center justify-center gap-x-4">
          <div className="flex items-center justify-center gap-x-8">
              <div className="relative inline-block h-full">
                <Image
                  src="/imgs/mockups/hive_mockups/macbook_whitebase.svg"
                  alt="macbook_whitebase"
                  priority
                  width={920}
                  height={480}
                  className="relative h-full z-10"
                />

                <video
                  className="rounded-lg w-[77%] absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[55%]"
                  autoPlay
                  preload="auto"
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="/imgs/mockups/hive_mockups/videos/draggable_rewrap_rewrap_noa.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="flex flex-col gap-y-4 self-end text-[14px]">
                <p>
                  A fully draggable interface <br />
                  that supports real time <br />
                  action. <br />
                  Add lists, cards,
                  <br />
                  descriptions. <br />
                  Let your mates update them.
                  <br />
                </p>
                <p>
                  Utilise the kanban to <br />
                  full potential, <br />
                  drag all components until
                  <br />
                  they make sense to you.
                  <br />
                </p>
                <p>
                  The kanban way of doing things <br />
                  gets a lot done.
                  <br />
                </p>
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

