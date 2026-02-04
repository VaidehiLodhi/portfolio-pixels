"use client"

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react"

export const ScrollRevealBg =()=> {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        let hasScrolled = false;
        const handleScroll =()=> {
            if(!hasScrolled) {
                hasScrolled = true;
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={cn(
                "fixed inset-0 bg-repeat-y bg-center transition-opacity duration-600 ease-out -z-20",
                isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{
                backgroundImage: "url('/imgs/bg/doodle_mega_tile.svg')"
            }}
        >

        </div>
    )
}