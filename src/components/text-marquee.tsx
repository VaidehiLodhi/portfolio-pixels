"use client"

import {useRef, useEffect} from "react"
import gsap from "gsap"
import localFont from "next/font/local";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const gokil = localFont({
  src: "../../public/bombass.ttf",
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
      <div
        ref={containerRef}
        className="overflow-hidden w-full"
      >
        <div
          ref={trackRef}
          className={`${gokil.className} py-4 uppercase text-transparent [-webkit-text-stroke:0.5px_#fab5c5] flex whitespace-nowrap text-[5rem] font-bold will-change-transform`}
        >
          <span className="mr-12">Vaidehi * Developer * Designer *</span>
          <span className="mr-12">Vaidehi * Developer * Designer *</span>
          <span className="mr-12">Vaidehi * Developer * Designer *</span>
          <span className="mr-12">Vaidehi * Developer * Designer *</span>
        </div>
      </div>
    );
}