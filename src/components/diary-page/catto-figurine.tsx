"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image"
import { useRef } from "react";

export const CattoFigurine =()=> {
    const pupil1Ref = useRef(null);
    const pupil2Ref = useRef(null);
    const eye1Ref = useRef(null);
    const eye2Ref = useRef(null);

    useGSAP(() => {
        const movePupil1X = gsap.quickTo(pupil1Ref.current, "x", {
            duration: 0.3,
            ease: "power2.out"
        });
        const movePupil1Y = gsap.quickTo(pupil1Ref.current, "y", {
            duration: 0.3,
            ease: "power2.out"
        });
        const movePupil2X = gsap.quickTo(pupil2Ref.current, "x", {
            duration: 0.3,
            ease: "power2.out"
        });
        const movePupil2Y = gsap.quickTo(pupil2Ref.current, "y", {
            duration: 0.3,
            ease: "power2.out"
        });

        const handleMouseMove = (e: MouseEvent) => {
            // get mouse position
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // function to move a pupil based on eye position
            const movePupil = (
                eyeRef: HTMLDivElement,
                moveX: (value: number) => void,
                moveY: (value:number) => void
            ) => {
                const eyeRect = eyeRef.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;

                // calculate angle and distance
                const deltaX = mouseX - eyeCenterX;
                const deltaY = mouseY - eyeCenterY;
                const  angle = Math.atan2(deltaY, deltaX);
                const distance = Math.min(Math.sqrt(deltaX**2 + deltaY**2), 3); // max 3px movement

                // calculate pupil position
                const pupilX = Math.cos(angle) * distance;
                const pupilY = Math.sin(angle) * distance;

                // apply the movement
                moveX(pupilX);
                moveY(pupilY);
            };

            // move both pupils
            if(eye1Ref.current) {
                movePupil(eye1Ref.current, movePupil1X, movePupil1Y);
            }
            if(eye2Ref.current) {
                movePupil(eye2Ref.current, movePupil2X, movePupil2Y);
            }
        };

        // adding event listeners
        window.addEventListener("mousemove", handleMouseMove);

        // cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    });

    return (
      <div>
        <Image
          src="/imgs/catto/catto_base.svg"
          alt="catto_body"
          height={60}
          width={100}
          className="relative"
        />
        <div className="flex items-center gap-3 justify-between absolute top-6 left-3">
          <div
            ref={eye1Ref} 
            className="relative">
            <Image
              src="/imgs/catto/catto-eye-1.svg"
              alt="catto-eye-1"
              height={18}
              width={18}
              className="relative"
            />
            <div 
                ref={pupil1Ref}
                className="w-3 h-3 absolute top-0.5 left-0.5 rounded-full bg-black" />
          </div>
          <div
            ref={eye2Ref} 
            className="relative">
            <Image
              src="/imgs/catto/catto-eye-1.svg"
              alt="catto-eye-1"
              height={18}
              width={18}
              className="relative"
            />
            <div 
                ref={pupil2Ref}
                className="w-3 h-3 absolute top-0.75 left-0.5 rounded-full bg-black" />
          </div>
        </div>
      </div>
    );
}