import localFont from "next/font/local";
import { SkillsetButton } from "./skillset-button";

// magnat test text light
export const magnat_text_light = localFont({
  src: "../../../public/fonts/magnat_family/text_test/magnat_text_test_light.woff",
  variable: "--font-magnat_text_light",
  display: "swap",
});

// magnat test text regular
export const magnat_text_regular = localFont({
  src: "../../../public/fonts/magnat_family/text_test/magnat_text_test_regular.woff",
  variable: "--font-magnat_text_regular",
  display: "swap",
});

// magnat test light
export const magnat_test_light = localFont({
  src: "../../../public/fonts/magnat_family/test/magnat_test_light.woff",
  variable: "--font-magnat_test_light",
  display: "swap",
});

// magnat test regular
export const magnat_test_regular = localFont({
  src: "../../../public/fonts/magnat_family/test/magnat_test_regular.woff",
  variable: "--font-magnat_test_regular",
  display: "swap",
});

export const WhiteContent =()=> {
    const skillsetArray = [
      {
        index: "01",
        label: "UI/UX",
        bgColor: "rgba(150,169,222,0.3)",
        hoverText1: "visual storytelling",
        hoverText2: "is supa cool",
        hoverText1Rotation: -2,
        hoverText2Rotation: 2,
        hoverTextPosition: { bottom: "0.5rem", left: "16rem" },
        hoverOffset1: 3,
        hoverOffset2: -3,
      },
      {
        index: "02",
        label: "Frontend",
        bgColor: "rgba(223,67,70,0.2)",
        hoverText1: "everything needs",
        hoverText2: "a lil sparkle ✧˖°",
        hoverText1Rotation: -3,
        hoverText2Rotation: 3,
        hoverTextPosition: { bottom: "0.5rem", right: "2rem" },
        hoverOffset1: 3,
        hoverOffset2: -3,
      },
      {
        index: "03",
        label: "Fullstack",
        bgColor: "rgba(252,218,147,0.3)",
        hoverText1: "end------------to------------end",
        hoverText2: "infrastructure for web, AI systems",
        hoverText1Rotation: 0,
        hoverText2Rotation: 0,
        hoverTextPosition: { bottom: "0.75rem", right: "1rem" },
        hoverOffset1: 1,
        hoverOffset2: 1,
      },
      {
        index: "04",
        label: "Machine Learning",
        bgColor: "rgba(250,181,197,0.2)",
        hoverText1: "so much can be solved with",
        hoverText2: "just an ML model",
        hoverText1Rotation: 2,
        hoverText2Rotation: 2,
        hoverTextPosition: { bottom: "0.5rem", left: "17rem" },
        hoverOffset1: 3,
        hoverOffset2: -3,
      },
      {
        index: "05",
        label: "Deep Learning",
        bgColor: "rgba(93,226,98,0.2)",
        hoverText1: "transformers, LLMs, PPO -",
        hoverText2: "gotta do more, gotta be more",
        hoverText1Rotation: 0,
        hoverText2Rotation: 0,
        hoverTextPosition: { bottom: "0.5rem", right: "0.75rem" },
        hoverOffset1: 3,
        hoverOffset2: -3,
      },
    ];

    return (
      <div className={`${magnat_test_light.className} w-full max-h-full flex flex-col `}>
        {/* my skillset */}
        <div className="mt-10 flex flex-col">
          <div className="flex items-center pl-5 pb-2 justify-start text-[28px]">
            Skillsets
          </div>
        </div>
        <div className="flex flex-col">
          <div className="pt-2 px-5 pb-12 flex flex-col gap-4">
            {skillsetArray.map((skill) => (
              <SkillsetButton
                index={skill.index}
                label={skill.label}
                bgColor={skill.bgColor}
                hoverText1={skill.hoverText1}
                hoverText2={skill.hoverText2}
                hoverText1Rotation={skill.hoverText1Rotation}
                hoverText2Rotation={skill.hoverText2Rotation}
                hoverTextPosition={skill.hoverTextPosition}
                hoverOffset1={skill.hoverOffset1}
                hoverOffset2={skill.hoverOffset2}
              />
            ))}
          </div>
          <div className={`${magnat_text_light.className} py-12`}>
            <div
              className={`text-sm py-1.5 text-center border border-dashed border-black`}
            >
              Tools and Stack
            </div>
            {/* first block web dev */}
            <div className="border border-dashed border-black border-t-0 border-b-0 mb-6">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] text-center py-1.5">Web Dev</span>

                <div className="flex w-full border-t border-dashed border-black">
                  <div className="border-r w-1/2 border-black border-dashed text-sm pl-8 py-1 ">
                    React
                  </div>
                  <div className="w-1/2 text-sm pl-8 py-1">Next.JS</div>
                </div>

                <div className="flex w-full border-t border-b border-dashed border-black">
                  <div className="border-r w-1/2 border-black border-dashed text-sm pl-8 py-1">
                    TanStack Ecosystem
                  </div>
                  <div className="w-1/2 text-sm py-1 pl-8">
                    NoSQL/SQL Databases
                  </div>
                </div>
              </div>
            </div>

            {/* second block ml */}
            <div className="border border-dashed border-black border-t-0  border-b-0 mb-6">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] text-center py-1.5">ML Tools</span>

                <div className="flex w-full border-t border-b border-dashed border-black">
                  <div className="border-r w-1/2 border-black border-dashed text-sm pl-8 py-1 ">
                    Scikit-learn Libraries
                  </div>
                  <div className="w-1/2 text-sm pl-8 py-1">PyTorch</div>
                </div>
              </div>
            </div>

            {/* third block */}
            <div className="border border-dashed border-black border-t-0 border-b-0 mb-6">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] text-center py-1.5">
                  Design Tools
                </span>

                <div className="flex w-full border-t border-b border-dashed border-black">
                  <div className="w-full text-sm pl-8 py-1 ">
                    Figma
                  </div>
                </div>
              </div>
            </div>

            {/* fourth block languages */}
            <div className="border border-dashed border-black border-t-0 border-b-0 mb-6">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] text-center py-1.5">
                  Languages
                </span>

                <div className="flex w-full border-t border-dashed border-black">
                  <div className="border-r w-1/2 border-black border-dashed text-sm pl-8 py-1 ">
                    Javascript
                  </div>
                  <div className="w-1/2 text-sm pl-8 py-1">
                    Typescript 
                  </div>
                </div>

                <div className="flex w-full border-t border-b border-dashed border-black">
                  <div className="border-r w-1/2 border-black border-dashed text-sm pl-8 py-1">
                    Python
                  </div>
                  <div className="w-1/2 text-sm py-1 pl-8">
                    C++
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}