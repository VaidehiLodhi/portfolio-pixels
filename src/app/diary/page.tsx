"use client"

import { CattoFigurine } from "@/components/diary-page/catto-figurine";
import { DiaryPage } from "@/components/diary-page/diary-page";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export default function DiaryHome() {
    const diaryRef = useRef(null);
    const cattoRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);

    // since it starts open
    useGSAP(() => {
        // animation will go here
        if (isOpen) {
            gsap.to(diaryRef.current, {
                x: "20%",
                duration: 0.7,
                ease: "power2.inOut"
            });
            // diary opens >< catto hides down
            gsap.to(cattoRef.current, {
                y: 100,
                duration: 0.7,
                ease: "power2.inOut"
            });
        } else {
            // animate to closed position (mostly off screen)
            gsap.to(diaryRef.current, {
                x: "87%",
                duration: 0.7,
                ease: "power2.inOut"
            });
            // catto pops innn :3
            gsap.to(cattoRef.current, {
                y: -80,
                duration: 0.7,
                ease: "back.out(1.2)",
                delay: 0.3  // slight delay so i appears after diary hehe 
            })
        }
    }, [isOpen]);

    const handleToggle =()=> {
        setIsOpen(!isOpen);
    }
    return (
        <div className="mt-15 w-full relative min-h-screen">
            <div 
                ref={diaryRef}
                onClick={handleToggle}
                className="absolute top-20 right-0 cursor-pointer">
                <DiaryPage/>

                {/* cattooo incoming*/}
                <div
                    ref={cattoRef}
                    className="absolute top-10 left-4 -z-10"
                    style={{transform: 'translateY(100px'}}
                >
                    <CattoFigurine/>    
                </div>
            </div>
        </div>
    )
}