"use client"

import {useRef, useEffect} from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import localFont from "next/font/local";
export const gokil = localFont({
  src: "../../public/fonts/Gokil.ttf",
  variable: "--font-gokil",
  display: "swap",
});

export const TextMarquee =()=> {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const velocityRef = useRef(0);
    const positionRef = useRef(0);
    const lastMouseX = useRef(0);
    const mouseVelocity = useRef(0);

    useGSAP(
        () => {
            const track = trackRef.current;
            if(!track) return;

            const width = track.scrollWidth / 2;
            let animationFrame: number;

            //animation loop
            const animate =()=> {
                //apply friction to slow down
                velocityRef.current *= 0.95;
                //update position
                positionRef.current += velocityRef.current;
                //wrap position
                if(positionRef.current <= -width) {
                    positionRef.current += width;
                } else if (positionRef.current >= 0) {
                    positionRef.current -= width;
                }

                //calculte skew based on velocity
                const skew = gsap.utils.clamp(-15, 15, velocityRef.current * 0.5);

                //apply transforms
                gsap.set(track, {
                    x: positionRef.current,
                    skewX: skew
                });

                animationFrame = requestAnimationFrame(animate);
            }

            
            animationFrame = requestAnimationFrame(animate);

            // mouse move handler
            const handleMouseMove =(e: MouseEvent) => {
                const currentX = e.clientX;
                //calculte mouse velocity
                if (lastMouseX.current !== 0) {
                mouseVelocity.current = currentX - lastMouseX.current;
                
                // Add mouse velocity to marquee velocity (inverted)
                // Moving mouse left (negative) makes marquee go right (positive)
                velocityRef.current -= mouseVelocity.current * 0.05;
                
                // Clamp velocity to prevent too fast movement
                velocityRef.current = gsap.utils.clamp(-20, 20, velocityRef.current);
            }
            
            lastMouseX.current = currentX;
        };
        
        // Reset last mouse position when mouse stops moving
        let mouseStopTimeout: NodeJS.Timeout;
        const handleMouseStop = () => {
            clearTimeout(mouseStopTimeout);
            mouseStopTimeout = setTimeout(() => {
                lastMouseX.current = 0;
            }, 100);
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousemove', handleMouseStop);
        
        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousemove', handleMouseStop);
            clearTimeout(mouseStopTimeout);
        };
    }, {scope: containerRef})

    return (
      <div ref={containerRef} className="overflow-hidden w-full">
        <div
          ref={trackRef}
          className={`${gokil.className} pt-25  uppercase text-[#FAB5C5] flex whitespace-nowrap text-6xl md:text-8xl lg:text-9xltext-9xl will-change-transform`}
        >
          <span className="mr-12">Vaidehi * Developer * Designer *</span>
          <span className="mr-12">Vaidehi * Developer * Designer *</span>
          <span className="mr-12">Vaidehi * Developer * Designer *</span>
          <span className="mr-12">Vaidehi * Developer * Designer *</span>
        </div>
      </div>
    );
}