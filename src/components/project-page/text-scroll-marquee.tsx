import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import localFont from "next/font/local";

export const four_b_pencil = localFont({
  src: "../../../public/fonts/four-b-pencil.otf",
  variable: "--font-four_b_pencil",
  display: "swap",
});

type TextScrollMarqueeProps = {
  title: string;
  textColor: string;
  duration?: number;
};

export const TextScrollMarquee = ({
  title,
  textColor,
  duration = 20,
}: TextScrollMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const marquee = marqueeRef.current;

      if (marquee) {
        const width = marquee.scrollWidth / 3;

        gsap.to(marquee, {
          x: -width,
          duration: duration,
          ease: "none",
          repeat: -1,
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [title, duration],
    },
  );

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <div
        ref={marqueeRef}
        style={{color: textColor}}
        className={`${four_b_pencil.className} pt-2.5 pb-8 flex whitespace-nowrap text-2xl md:text-3xl lg:text-4xl will-change-transform`}
      >
        <span className="mr-0.5">{title}</span>
        <span className="mr-0.5">{title}</span>
        <span className="mr-0.5">{title}</span>
      </div>
    </div>
  );
};
