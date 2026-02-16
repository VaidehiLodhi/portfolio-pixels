"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisRef, ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

import { TextRevealComponent1 } from "@/components/page-components/text-reveal-1";
import { TextRevealComponent2 } from "@/components/page-components/text-reveal-2";
import { TextRevealComponent3 } from "@/components/page-components/text-reveal-3";
import { TextRevealComponent4 } from "@/components/page-components/text-reveal-4";

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScrollSection =()=> {
    
      const containerRef = useRef<HTMLDivElement>(null);
      const lenisRef = useRef<LenisRef | null>(null);

        useEffect(() => {
          function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
          }

          lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);

          // Make Lenis globally accessible so dialogs can pause it
          if (lenisRef.current?.lenis) {
            (window as any).lenis = lenisRef.current.lenis;
          }

          gsap.ticker.add(update);
          gsap.ticker.lagSmoothing(0);

          return () => {
            gsap.ticker.remove(update);
            // Clean up global reference
            delete (window as any).lenis;
          } 
      }, []);

          useGSAP(
            () => {
              const sections =
                containerRef.current?.querySelectorAll(".section");
              if (!sections) return;

              sections.forEach((section, index) => {
                // Animate the SECTION's rotation (not container)

                gsap.to(section, {
                  rotation: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top 20%",
                    scrub: true,
                    markers: true, // Debug
                  },
                });

                // Don't pin the last section
                if (index === sections.length - 1) return;

                ScrollTrigger.create({
                  trigger: section,
                  start: "bottom bottom",
                  end: "bottom top",
                  pin: true,
                  pinSpacing: false,
                });
              });

              // Cleanup ScrollTriggers
              return () => {
                ScrollTrigger.getAll().forEach((st) => st.kill());
              };
            },
            { scope: containerRef },
          );

    return (
      <>
        <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
        <div ref={containerRef} className="relative w-full overflow-hidden">
          <TextRevealComponent1 />
          <TextRevealComponent2 />
          <TextRevealComponent3 />
          <TextRevealComponent4 />
        </div>
      </>
    );
}