import Image from "next/image";
import React from "react";
import { magnat_text_regular } from "../punch-white/white-content";
import {
  SidebarTabsTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SidebarCard,
} from "../ui/card";
import localFont from "next/font/local";
import { TextScrollMarquee } from "./text-scroll-marquee";
import { hiveObject } from "./project-texts/hive_object";
import { SidebarCardContent } from "./sidebat-content";

interface PunchPaperRedProps {
  className?: string;
  style?: React.CSSProperties;
}

export const four_b_pencil = localFont({
  src: "../../../public/fonts/four-b-pencil.otf",
  variable: "--font-four_b_pencil",
  display: "swap",
});

export const PunchPaperRed = React.forwardRef<
  HTMLDivElement,
  PunchPaperRedProps
>(({ className = "", style }, ref) => {
  const projects = [
    {
      id: "hive",
      name: "Hive",
      title: "HIVE * KANBAN COLLABORATION * HIVE * KANBAN COLLABORATION *",
      activeState: "#F5F4C7",
      fontActiveState: "#FAC206",
    },
    {
      id: "nodebase",
      name: "NodeBase",
      title: "NODEBASE * AGENTIC AUTOMATION * NODEBASE * AGENTIC AUTOMATION *",
      activeState: "#F8EAFF",
      fontActiveState: "#2B0C7D",
    },
    {
      id: "ragchat",
      name: "RAG Chat Pipeline",
      title: "CHAT PIPELINE * RAG * CHAT PIPELINE * RAG *",
      activeState: "#FFF1F1",
      fontActiveState: "#FF6464",
    },
    {
      id: "transformer",
      name: "Transformer",
      title: "TRANSFORMER * ARCHITECTURE * TRANSFORMER * ARCHITECTURE *",
      activeState: "#ECFDF8",
      fontActiveState: "#00CD95",
    },
  ];

  return (
    <div
      ref={ref}
      className={`${className} bg-[#B7BED7] relative w-full max-w-3xl aspect-3/4 shadow-xl flex flex-col`}
      style={style}
    >
      <div className="relative">
        {/* top border */}
        <div
          className={`${magnat_text_regular.className} absolute top-0 left-0 right-0 bg-transparent h-12 rounded-t-md border-b-[1.5px] border-current grid grid-cols-12 text-xs laptop:text-sm font-bold md:mb-0`}
        >
          <div className="col-span-4 border-r-[1.5px] border-current">
            <div className="w-full h-full p-2.5 flex items-center justify-between">
              <Image
                src="/imgs/star-doodle.svg"
                width={23.88}
                height={25.4}
                alt="star-doodle-img"
              />
              <span className="font-extralight text-sm">Project</span>
            </div>
          </div>
          <div className="col-span-8">
            <div className="w-full h-full p-2.5 flex items-center justify between">
              <span className="font-extralight text-sm">Details</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full h-full">
        <Tabs
          defaultValue="hive"
          orientation="vertical"
          className="h-full w-full"
        >
          <div className="grid grid-cols-12 w-full h-full">
            {/* Left panel */}
            <TabsList className="bg-[#B7BED7] p-0 col-span-4 h-full w-full flex flex-col items-start justify-start rounded-none border-r">
              {projects.map((project) => (
                <SidebarTabsTrigger
                  key={project.id}
                  className={`w-full`}
                  style={
                    {
                      "--active-bg": project.activeState,
                    } as React.CSSProperties
                  }
                  value={project.id}
                >
                  {project.name}
                </SidebarTabsTrigger>
              ))}
            </TabsList>

            {/* Right panel */}
            <div className="col-span-8 h-full rounded-none">
              {projects.map((project) => (
                <TabsContent
                  key={project.id}
                  value={project.id}
                  className="h-full"
                >
                  <SidebarCard
                    style={{ backgroundColor: project.activeState }}
                    className="h-full rounded-none"
                  >
                    <CardHeader className="p-0 pt-2.5">
                      <TextScrollMarquee
                        title={project.title}
                        textColor={project.fontActiveState}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-8">
                        <SidebarCardContent blocks={hiveObject} />
                      </div>
                    </CardContent>
                  </SidebarCard>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
});
