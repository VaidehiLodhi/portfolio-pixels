"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { TextRevealComponent1 } from "./text-reveal-1";
import { TextRevealComponent2 } from "./text-reveal-2";
import { TextRevealComponent3 } from "./text-reveal-3";
import { TextRevealComponent4 } from "./text-reveal-4";

gsap.registerPlugin(ScrollTrigger);

export const PinWheel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // plain mutable objects — no useRef wrapper needed
  const tl1: { current: gsap.core.Timeline | null } = { current: null };
  const tl2: { current: gsap.core.Timeline | null } = { current: null };
  const tl3: { current: gsap.core.Timeline | null } = { current: null };
  const tl4: { current: gsap.core.Timeline | null } = { current: null };

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".stickyCard .card");
    if (!cards) return;

    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;
    const timelines = [tl1, tl2, tl3, tl4];
    const cardYOffset = 5;
    const cardScaleStep = 0.075;

    cards.forEach((card, i) => {
      gsap.set(card, {
        zIndex: totalCards - i,
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
      });
    });

    ScrollTrigger.create({
      trigger: ".stickyCard",
      start: "top top",
      end: `+=${window.innerHeight * 12}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.min(
          Math.floor(progress / segmentSize),
          totalCards - 1,
        );
        const segProgress =
          (progress - activeIndex * segmentSize) / segmentSize;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, { yPercent: -250, rotationX: 35 });
            timelines[i].current?.progress(1);
          } else if (i === activeIndex) {
            // first 70% of segment = animation plays
            // last 30% of segment = card flips away
            const animProgress = gsap.utils.clamp(0, 1, segProgress / 0.7);
            const flipProgress = gsap.utils.clamp(
              0,
              1,
              (segProgress - 0.7) / 0.3,
            );

            timelines[i].current?.progress(animProgress);

            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -200, flipProgress),
              rotationX: gsap.utils.interpolate(0, 35, flipProgress),
              scale: 1,
            });
          } else {
            const behindIndex = i - activeIndex;
            const currYOffset = (behindIndex - segProgress) * cardYOffset;
            const currentScale =
              1 - (behindIndex - segProgress) * cardScaleStep;
            gsap.set(card, {
              yPercent: -50 + currYOffset,
              rotationX: 0,
              scale: currentScale,
            });
            timelines[i].current?.progress(0);
          }
        });
      },
    });
  });

  return (
    <div>
      <section
        ref={sectionRef}
        className="stickyCard relative w-full h-svh overflow-hidden perspective-[850px]"
      >
        <TextRevealComponent1 timelineRef={tl1} />
        <TextRevealComponent2 timelineRef={tl2} />
        <TextRevealComponent3 timelineRef={tl3} />
        <TextRevealComponent4 timelineRef={tl4} />
      </section>
    </div>
  );
};
