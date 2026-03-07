"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Check, Copy } from "lucide-react";

export const LinkPanel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mailRef = useRef<HTMLImageElement>(null);
  const scaleDecorationsRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatDecorationsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(
    () => {
      // Mail icon scale animation
      if (mailRef.current) {
        gsap.to(mailRef.current, {
          scale: 1.1,
          duration: 1,
          repeat: -1,
          yoyo: true,
        });
      }

      // Scale animations for first 2 elements (linkedin left & right)
      scaleDecorationsRef.current.forEach((el, index) => {
        if (el) {
          // Determine if this is a left or right decoration
          const isLeft = index % 2 === 0;

          gsap.to(el, {
            scale: 1.2,
            duration: 1,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: isLeft ? "left center" : "right center",
          });
        }
      });

      // Up/down animations for last 2 elements (twitter, spotify)
      floatDecorationsRef.current.forEach((el, index) => {
        if (el) {
          const isLeft = index % 2 === 0;
          gsap.to(el, {
            y: isLeft ? -8 : 8,
            duration: 1,
            repeat: -1,
            yoyo: true,
          });
        }
      });
    },
    { scope: containerRef },
  );

  const linkObject = [
    {
      id: "mail",
      name: "Email",
      value: "vaidehixoxo@gmail.com",
      imglnk: "/imgs/logos/mail/mail-logo.svg",
      imgeffectlnk: "/imgs/logos/mail/stamp-borders.svg",
    },
    {
      id: "twitter",
      name: "X (Twitter)",
      value: "https://x.com/vaibee_on_tulip",
      imglnk: "/imgs/logos/twitter/twitter-logo.svg",
      imgeffectlnk: "/imgs/logos/twitter/tweety-birb.svg",
      effect: "float",
    },
    {
      id: "linkedin",
      name: "Linkedin",
      value: "https://www.linkedin.com/in/vaidehi-lodhi/",
      imglnk: "/imgs/logos/linkedin/linkedin-logo.svg",
      imgeffectlnk: "/imgs/logos/linkedin/sparkle-doodle.svg",
      effect: "scale",
    },
    {
      id: "spotify",
      name: "Spotify",
      value: "https://open.spotify.com/user/31son3ysnl6kjzjljt5bg4g2ttr4?si=ef0f72a4d9cf4392",
      imglnk: "/imgs/logos/spotify/spotify-solo.svg",
      imgeffectlnk: "/imgs/logos/spotify/music-note.svg",
      effect: "float",
      mirror: true,
    },
    {
      id: "github",
      name: "Github",
      value: "https://github.com/VaidehiLodhi",
      imglnk: "/imgs/logos/github_logo.svg",
      imgeffectlnk: "/imgs/logos/linkedin/sparkle-doodle.svg",
      effect: "scale",
    },
  ];

  let scaleIndex = 0;
  let floatIndex = 0;

  return (
    <div className="pt-6 md:pt-30 px-4 md:px-15">
      <div ref={containerRef} className="flex flex-col gap-6">
        {linkObject.map((object, index) => {
          const isFirstItem = index === 0;
          const isScale = object.effect === "scale";

          return (
            <div key={object.id} className="flex items-center gap-10">
              {/* Icon section */}
              {isFirstItem ? (
                <div className="relative inline-block  w-10 h-10 translate-x-3">
                  <Image
                    ref={mailRef}
                    src={object.imgeffectlnk}
                    alt={object.id}
                    fill
                    className="object-contain z-0"
                  />
                  <Image
                    src={object.imglnk}
                    alt={object.id}
                    height={30}
                    width={30}
                    className="absolute top-1.5 left-1.25 z-10"
                  />
                </div>
              ) : (
                <div className="flex gap-0.5">
                  {/* Left decoration */}
                  <div
                    ref={(el) => {
                      if (isScale) {
                        scaleDecorationsRef.current[scaleIndex++] = el;
                      } else {
                        floatDecorationsRef.current[floatIndex++] = el;
                      }
                    }}
                    className={`flex flex-col h-full ${
                      object.mirror
                        ? "items-end justify-end"
                        : "items-start justify-start"}`}
                  >
                    <Image
                      src={object.imgeffectlnk}
                      alt={object.id}
                      height={15}
                      width={15}
                    />
                  </div>

                  {/* Main logo */}
                  <Image
                    src={object.imglnk}
                    alt={object.id}
                    height={30}
                    width={30}
                  />

                  {/* Right decoration */}
                  <div
                    ref={(el) => {
                      if (isScale) {
                        scaleDecorationsRef.current[scaleIndex++] = el;
                      } else {
                        floatDecorationsRef.current[floatIndex++] = el;
                      }
                    }}
                    className={`flex flex-col h-full ${
                      isScale
                        ? "items-end justify-end translate-y-full"
                        : "items-start justify-start scale-x-[-1]"
                    }`}
                  >
                    <Image
                      src={object.imgeffectlnk}
                      alt={object.id}
                      height={15}
                      width={15}
                    />
                  </div>
                </div>
              )}
              {/* Name */}
              <div
                className={`w-16 md:w-32 flex-none text-xs md:text-base ${isFirstItem ? "pl-3 md:pl-5" : ""}`}
              >
                {isFirstItem && (
                  <div className="flex items-center justify-center gap-x-1">
                    {object.value}
                    <button
                      onClick={() => handleCopy("vaidehixoxo@gmail.com")}
                      className="text-[#332525]/60 hover:text-[#332525] transition-colors duration-200 cursor-pointer"
                    >
                      {copied ? <Check color="#332525" size={14} /> : <Copy color="#332525" size={14} />}
                    </button>
                  </div>
                )}
                {!isFirstItem && object.value && (
                  <a
                    href={object.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {object.name}
                  </a>
                )} 
                
                {!isFirstItem && !object.value && (
                  <span>{object.name}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};