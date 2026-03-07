"use client";
import localFont from "next/font/local";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";

export const bringbold = localFont({
  src: "../../../public/fonts/bringbold-nineties.ttf",
  variable: "--font-bringbold",
  display: "swap",
});

const doodles = [
    "/preloader/blue_doodle.png",
    "/preloader/green_doodle.png",
    "/preloader/orange_doodle.png",
    "/preloader/pink_doodle.png"
];

export default function Preloader(): JSX.Element | null {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isLeaving, setIsLeaving] = useState<boolean>(false);
    const [currdoodle, setCurrDoodle] = useState<number>(0);
    const [fadeIn, setFadeIn] = useState<boolean>(false);

    // detect page load
    useEffect(() => {
        const handleLoad = () => setIsLoaded(true);
        if (document.readyState === "complete") {
            setIsLoaded(true);
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    useEffect(() => {
        setFadeIn(true);
    }, [])

    // cycle doodles
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrDoodle((prev) => (prev + 1) % doodles.length);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    // minimum display time → slide out → unmount
    useEffect(() => {
        if (!isLoaded) return;
        const slideTimer = setTimeout(() => setIsLeaving(true), 2500);
        const unmountTimer = setTimeout(() => setIsVisible(false), 3200);
        return () => {
            clearTimeout(slideTimer);
            clearTimeout(unmountTimer);
        };
    }, [isLoaded]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 w-screen h-screen z-300 flex items-center justify-center bg-[#F5E1CD] transition-all duration-700 ease-in-out
                ${isLeaving ? "translate-y-full" : "translate-y-0"}
            `}
        >
            <div className={`flex flex-col items-center justify-center ${fadeIn ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in opacity `}>
                <div className={`relative`}>
                    <p className={`${bringbold.className} z-10 text-6xl text-[#2B0C7D] relative `}>
                        This is Vaibee.inc
                    </p>
                    <Image
                        src={doodles[currdoodle]}
                        alt="doodles"
                        height={300}
                        width={300}
                        className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
                    />
                </div>
                <Image
                    src="/preloader/vaibee_loader.png"
                    alt="vaibee_loader"
                    height={619}
                    width={370}
                    className="z-10"
                />
            </div>
        </div>
    );
}