"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import localFont from "next/font/local";
import { belmonte } from "../punch-white/skillset-button";
import { four_b_pencil } from "../project-page/punch-paper-red";
import { magnat_test_regular } from "../punch-white/white-content";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { nok } from "../char-per-char";

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

export const futura_bold = localFont({
  src: "../../../public/fonts/futura_bold.ttf",
  variable: "--font-futura-bold",
  display: "swap",
});

export default function TimelinePageVaibee() {
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
        overflow: "clip",
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
        className={`${departure_mono.className} flex justify-center items-center shrink-0  text-[#332525]  bg-[#F5E1CD]`}
        style={{
          height: "100vh",
          willChange: "transform",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div className="panel min-w-screen h-screen shrink-0 bg-[#F5E1CD] flex items-center justify-center gap-x-20 px-40 ml-70">
          <div className="flex flex-col items-start justify-center gap-y-2">
            <p className="text-[14px] uppercase">[OVERVIEW]</p>
            <div
              className={` ${bringbold.className} text-3xl flex flex-col uppercase`}
            >
              <p>
                VAIBEE.INC, <br/>
                A LABOUR OF LOVE. <br/>
                THESE PORTFOLIO PIXELS WERE <br/>
                ALWAYS ENVISIONED AS A <br/>
                MANIFESTATION OF GIRLHOOD<br/>
                & ALL DAYS SPENT IN THE PURSUIT <br/>
                OF CONSOLIDATING LIFE INTO A <br/>
                DIARY<br/>
              </p>
            </div>
            <div className="text-[14px] leading-5 flex flex-col">
              <p>
                Everything growing up became a <br/>
                kaleidoscope of my love for books, <br/>
                films, art and how I would try to <br/>
                find or fit myself in these pieces.<br/>
                Through it all, I landed here.<br/>
                And now u r here too :p<br/>
              </p>
            </div>
          </div>
            <div className={`${futura_bold.className} relative bg-[#F9F0EE] py-10 rounded-[10px] isolate w-[800px] h-[600px] flex flex-col items-center text-4xl text-[#332525] overflow-hidden`}>
                <div className="relative my-auto flex items-center justify-center gap-x-10 whitespace-nowrap text-transparent [-webkit-text-stroke:1px_#332525]">
                    <p>WHAT WILL YOUR VERSE BE?</p>
                    <p>WHAT WILL YOUR VERSE BE?</p>
                </div>
                <div className="relative flex items-center justify-center gap-x-15 translate-x-10 text-transparent whitespace-nowrap [-webkit-text-stroke:1px_#332525]">
                    <p>WHAT WILL YOUR VERSE BE?</p>
                    <p>WHAT WILL YOUR VERSE BE?</p>
                </div>
                <div className=" relative mt-auto flex items-center justify-center gap-x-10 whitespace-nowrap">
                    <p className="text-transparent [-webkit-text-stroke:1px_#332525]">WHAT WILL YOUR VERSE BE?</p>
                    <p>WHAT WILL YOUR VERSE BE?</p>
                    <p className="text-transparent [-webkit-text-stroke:1px_#332525]">WHAT WILL YOUR VERSE BE?</p>
                </div>
                <video
                  className="rounded-[10px] px-8 absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%]"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="/imgs/mockups/vaibee_mockups/videos/vaibee_interface_rewrap.mp4"
                    type="video/mp4"
                  />
                </video>
            </div>
        </div>

        {/* 2nd panel */}
        <div className="panel min-w-screen h-screen shrink-0 bg-[#F5E1CD] flex items-center justify-center gap-x-20 px-40">
          <div className="flex items-center justify-center gap-x-10">
            <div className="relative overflow-hidden w-93 h-152">
              <Image
                src="/imgs/mockups/vaibee_mockups/preloader_book.png"
                alt="preloader_book"
                fill
                className="object-cover parallax-img will-change-transform scale-120 parallax-display"
              />
            </div>
            <div className="relative overflow-hidden w-93 h-152">
              <Image
                src="/imgs/mockups/vaibee_mockups/doodle_card.png"
                alt="doodle_card"
                fill
                className="object-cover parallax-img will-change-transform scale-120 parallax-display"
              />
            </div>
            <div className="flex flex-col gap-y-3 items-start justify-center self-start text-[14px]">
              <p>
                [VISUAL IDENTITY] <br />
              </p>
              <p>
                A room for a person sometimes <br/>
                serves everything from a diner, to a <br/> 
                workshop, to ur comfort nook. <br/>
                Similarly diaries & journals pull u in <br/>
                with their ability to suppress years into <br/>
                pages. <br/>

                The visuals were intended to offer the feel <br/>
                of stumbling onto ur friends room <br/>
                and explore their antics & possessions, allowing <br/>
                their personalities to slip in through them. <br/>
              </p>
            </div>
          </div>
        </div>

        {/* 3rd panel */}
        <div className="panel min-w-screen h-screen shrink-0 bg-[#F5E1CD] flex items-center justify-around gap-x-20 px-40">
          <div className="flex items-center justify-center gap-x-10">
            <div className="relative overflow-hidden w-125 h-162.5">
              <Image
                src="/imgs/mockups/vaibee_mockups/footer_on_table_og.png"
                alt="footer_on_table"
                fill
                className="object-cover parallax-img will-change-transform scale-120 parallax-display"
              />
            </div>
            <div className="flex flex-col gap-y-3 items-start justify-center text-[14px]">
              <div className="bg-[#FAB5C5] flex flex-col gap-y-5 px-10 py-10 rounded-[10px]">
                <p className={`${belmonte.className} text-4xl`}>Vaibee.inc</p>
                <p className={`${four_b_pencil.className} text-2xl `}>Vaibee.inc</p>
                <p className={`${departure_mono.className} text-2xl`}>Vaibee.inc</p>
                <p className={`${magnat_test_regular.className} text-2xl`}>Vaibee.inc</p>
                <p className={`${bringbold.className} text-[32px]`}>Vaibee.inc</p>
              </div>
              <p>
                The playthrough with fonts suggests, <br/>
                how different aspects of life can ask <br/>
                for different aesthetics. <br/>
                Bold when required, playful otherwise. <br/>
              </p>
              <p>
                The hand-drawn doodles, the stacked <br/>
                page system, the pixel art were built <br/>
                to make that vision palpable. <br/>
              </p>
            </div>
          </div>
        </div>
        {/* 4th panel */}
        <div className="panel min-w-screen h-screen shrink-0 bg-[#F5E1CD] flex items-center justify-center gap-x-20 px-40">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[800px] h-[500px]">
            
            {/* Top-left: empty */}
            <div className={`${nok.className} text-[80px] text-[#FAB5C5] rounded-[10px] flex items-center justify-center`}>
              <div>
                VAIBEE.INC
              </div>  
            </div>

            {/* Top-right: video 1 */}
            <div className="rounded-[10px] overflow-hidden">
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                <source src="/imgs/mockups/vaibee_mockups/videos/vaibee_pixel_panels_rewrap.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Bottom-left: video 2 */}
            <div className="rounded-[10px] overflow-hidden">
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                <source src="/imgs/mockups/vaibee_mockups/videos/vaibee_stack_animates_rewrap.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Bottom-right: empty */}
            <div className={`${nok.className} text-[80px] text-[#FAB5C5] rounded-[10px] flex items-center justify-center`}>
              <div>
                VAIBEE.INC
              </div>  
            </div>

          </div>

          {/* Text beside the grid */}
          <div className="flex flex-col gap-y-4 self-center text-[14px]">
            <p>
              Thus, marks the phase 1 of <br/>
              my first portfolio entry. <br/>
              This has still a long way to go, <br/>
              in terms of responsiveness. <br/>
              And I'll be working on it <br/>
              throughout, but i wanted to <br/>
              put this out, because someone special said <br/>
              "just make it exist", <br/>
              "u can make it good later!" <br/>
            </p>
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

