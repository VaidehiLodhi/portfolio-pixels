import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import localFont from "next/font/local";

export const belmonte = localFont({
  src: "../../../public/fonts/belmonte_ballpoint.otf",
  variable: "--font-belmonte_ballpoint",
  display: "swap",
});

export const magnat_test_light = localFont({
  src: "../../../public/fonts/magnat_family/test/magnat_test_light.woff",
  variable: "--font-magnat_test_light",
  display: "swap",
});

type SkillsetButtonProps = {
  index: string;
  label: string;
  bgColor?: string;
  hoverText1?: string;
  hoverText2?: string;
  hoverText1Rotation?: number; // Initial rotation for text1
  hoverText2Rotation?: number; // Initial rotation for text2
  hoverTextPosition?: {
    bottom?: string;
    right?: string;
    top?: string;
    left?: string;
  };
  hoverOffset1?: number;
  hoverOffset2?: number;
};

export const SkillsetButton = ({
  index,
  label,
  bgColor,
  hoverText1 = "visual storytelling",
  hoverText2 = "is supa cool",
  hoverText1Rotation = -2,
  hoverText2Rotation = 1,
  hoverTextPosition = { bottom: "0.5rem", right: "0.75rem" },
  hoverOffset1 = 3,
  hoverOffset2 = -3,
}: SkillsetButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTextContainerRef = useRef<HTMLDivElement>(null);
  const hoverText1Ref = useRef<HTMLSpanElement>(null);
  const hoverText2Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const hoverTextContainer = hoverTextContainerRef.current;
      const text1 = hoverText1Ref.current;
      const text2 = hoverText2Ref.current;

      if (!container || !hoverTextContainer || !text1 || !text2) return;

      // Set initial state - container hidden
      gsap.set(hoverTextContainer, {
        opacity: 0,
        y: 10,
      });

      // Set initial rotation for both texts (with custom angles)
      gsap.set(text1, {
        rotation: hoverText1Rotation,
      });

      gsap.set(text2, {
        rotation: hoverText2Rotation,
      });

      // Store animation timelines for cleanup
      let wiggleTl1: gsap.core.Timeline | null = null;
      let wiggleTl2: gsap.core.Timeline | null = null;

      const handleMouseEnter = () => {
        // Fade in the container
        gsap.to(hoverTextContainer, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        // Continuous swiggle animation for text1 (infinite loop)
        wiggleTl1 = gsap.timeline({ repeat: -1 });
        wiggleTl1
          .to(text1, {
            rotation: hoverText1Rotation - hoverOffset1,
            duration: 0.15,
            ease: "power2.inOut",
          })
          .to(text1, {
            rotation: hoverText1Rotation + hoverOffset1,
            duration: 0.3,
            ease: "power2.inOut",
          })
          .to(text1, {
            rotation: hoverText1Rotation,
            duration: 0.15,
            ease: "power2.inOut",
          });

        // Continuous swiggle animation for text2 (opposite, with delay)
        wiggleTl2 = gsap.timeline({ repeat: -1, delay: 0.05 });
        wiggleTl2
          .to(text2, {
            rotation: hoverText2Rotation + hoverOffset2,
            duration: 0.15,
            ease: "power2.inOut",
          })
          .to(text2, {
            rotation: hoverText2Rotation - hoverOffset2,
            duration: 0.3,
            ease: "power2.inOut",
          })
          .to(text2, {
            rotation: hoverText2Rotation,
            duration: 0.15,
            ease: "power2.inOut",
          });
      };

      const handleMouseLeave = () => {
        // Kill ongoing animations immediately
        if (wiggleTl1) wiggleTl1.kill();
        if (wiggleTl2) wiggleTl2.kill();

        // Kill any running tweens on these elements
        gsap.killTweensOf([hoverTextContainer, text1, text2]);

        // Fade out the container
        gsap.to(hoverTextContainer, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: "power2.in",
        });

        // Reset rotations smoothly to their initial angles
        gsap.to(text1, {
          rotation: hoverText1Rotation,
          duration: 0.2,
        });

        gsap.to(text2, {
          rotation: hoverText2Rotation,
          duration: 0.2,
        });
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        // Cleanup any running animations
        if (wiggleTl1) wiggleTl1.kill();
        if (wiggleTl2) wiggleTl2.kill();
        gsap.killTweensOf([hoverTextContainer, text1, text2]);
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="rounded-sm border-dashed border border-black cursor-pointer relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-baseline gap-7 px-3 py-3">
        <span className={`${belmonte.className} text-4xl leading-none`}>
          {index}
        </span>
        <span
          className={`${magnat_test_light.className} text-2xl leading-none`}
        >
          {label}
        </span>
      </div>

      {/* Hover text that appears */}
      <div
        ref={hoverTextContainerRef}
        className={`${belmonte.className} absolute text-lg text-black`}
        style={{
          bottom: hoverTextPosition.bottom,
          right: hoverTextPosition.right,
          top: hoverTextPosition.top,
          left: hoverTextPosition.left,
        }}
      >
        <div className="flex flex-col items-end justify-center leading-5 text-[20px]">
          <span
            ref={hoverText1Ref}
            className="inline-block"
            style={{ transformOrigin: "center center" }}
          >
            {hoverText1}
          </span>
          <span
            ref={hoverText2Ref}
            className="inline-block"
            style={{ transformOrigin: "center center" }}
          >
            {hoverText2}
          </span>
        </div>
      </div>
    </div>
  );
};
