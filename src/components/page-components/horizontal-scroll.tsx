"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { TextRevealComponent1 } from "@/components/page-components/text-reveal-1";
import { TextRevealComponent2 } from "@/components/page-components/text-reveal-2";
import { TextRevealComponent3 } from "@/components/page-components/text-reveal-3";
import { TextRevealComponent4 } from "@/components/page-components/text-reveal-4";

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = containerRef.current?.querySelectorAll(".section");
      if (!sections) return;

      sections.forEach((section, index) => {
        gsap.to(section, {
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
            markers: true,
          },
        });

        if (index === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <TextRevealComponent1 />
      <TextRevealComponent2 />
      <TextRevealComponent3 />
      <TextRevealComponent4 />
    </div>
  );
};
