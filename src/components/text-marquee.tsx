"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
import localFont from "next/font/local";
import { CharPerChar } from "./char-per-char";

export const gokil = localFont({
  src: "../../public/fonts/Gokil.ttf",
  variable: "--font-gokil",
  display: "swap",
});

interface TextMarqueeProps {
  color?: string;
  outline?: boolean;
  bgColor?: string;
}

export const TextMarquee = ({
  color = "#FAB5C5",
  outline = false,
  bgColor = "transparent",
}: TextMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const positionRef = useRef(0);
  const lastMouseX = useRef(0);
  const mouseVelocity = useRef(0);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const width = track.scrollWidth / 2;
      let animationFrame: number;

      const animate = () => {
        velocityRef.current *= 0.95;
        positionRef.current += velocityRef.current;
        if (positionRef.current <= -width) {
          positionRef.current += width;
        } else if (positionRef.current >= 0) {
          positionRef.current -= width;
        }
        const skew = gsap.utils.clamp(-15, 15, velocityRef.current * 0.5);
        gsap.set(track, { x: positionRef.current, skewX: skew });
        animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);

      const handleMouseMove = (e: MouseEvent) => {
        const currentX = e.clientX;
        if (lastMouseX.current !== 0) {
          mouseVelocity.current = currentX - lastMouseX.current;
          velocityRef.current -= mouseVelocity.current * 0.05;
          velocityRef.current = gsap.utils.clamp(-20, 20, velocityRef.current);
        }
        lastMouseX.current = currentX;
      };

      let mouseStopTimeout: NodeJS.Timeout;
      const handleMouseStop = () => {
        clearTimeout(mouseStopTimeout);
        mouseStopTimeout = setTimeout(() => {
          lastMouseX.current = 0;
        }, 100);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousemove", handleMouseStop);

      return () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousemove", handleMouseStop);
        clearTimeout(mouseStopTimeout);
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className={`overflow-hidden w-full`}
    >
      <div
        ref={trackRef}
        className="uppercase flex whitespace-nowrap will-change-transform"
      >
        <span>
          <CharPerChar color={color} outline={outline} />
        </span>
        <span>
          <CharPerChar color={color} outline={outline} />
        </span>
        <span>
          <CharPerChar color={color} outline={outline} />
        </span>
        <span>
          <CharPerChar color={color} outline={outline} />
        </span>
      </div>
    </div>
  );
};
