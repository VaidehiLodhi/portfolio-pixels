"use client";

import { useState } from "react";
import { useIsMobile } from "../../../hooks/use-is-mobile";
import { bringbold } from "../char-per-char";
import Image from "next/image";
import { belmonte } from "../punch-white/skillset-button";
import { departure_mono } from "./footer/beige-bookmark";

export const MobileWarner =()=> {
    const [isVisible, setIsVisible] = useState(false);
    const isMobile = useIsMobile();

    if(!isMobile || isVisible) return null;

    return (
        <div className="relative mt-10 mx-10 mb-20 inset-0 z-200 flex items-center justify-center"> 
            <div className={`${departure_mono.className} relative w-100 rounded-[10px] min-h-95 text-sm text-[#3B2313] flex flex-col bg-[#F5E1CD] overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none select-none">
                    <Image
                        src="/imgs/mobile_warner/orange_orange.png"
                        alt="orange_orange"
                        width={289}
                        height={296}
                        className="w-full mt-[-10px]"
                        priority
                    />
                </div>
                <div className="relative z-10 flex flex-col gap-3 px-5 pt-35 pb-20 leading-1.55">
                    <p>heyy! thanks for visiting my website.</p>
                    <p>
                        Now, since u r seeing this, <br/> 
                        u my friend must be on some mobile device :o <br/>
                        & my website is still in progress, <br/>
                        especially for phones. <br/>
                    </p>
                    <p>
                        I don’t want to simply resize everything <br/>
                         and call it a day, <br/>
                        so it’ll take some more time to 
                        get there :p 
                    </p>
                    <p>
                        In the meantime, <br/>
                        please visit on laptop &lt;3 <br/>
                        if you still wish to continue, let me warn you, the uncharted territory is a bit too, topsy-turvy :p
                    </p>
                </div>
                <div className="absolute bottom-0 right-0 w-fit flex justify-center pointer-events-none select-none">
                    <Image
                        src="/imgs/mobile_warner/leaf_short.png"
                        alt="leaf"
                        width={100}
                        height={100}
                        className="opacity-90 mt-[-10px]"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}