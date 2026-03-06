import Image from "next/image";
import React from "react";
import { magnat_text_regular } from "../punch-white/white-content";
import { SidebarTabsTrigger, Tabs, TabsContent, TabsList } from "../ui/tabs";
import { Button } from "../ui/button";
import { CardContent, CardHeader, SidebarCard } from "../ui/card";
import localFont from "next/font/local";
import { TextScrollMarquee } from "./text-scroll-marquee";
import { hiveObject } from "./project-texts/hive_object";
import {
  blockType,
  metadataBlockType,
  SidebarCardContent,
} from "./sidebat-content";
import Link from "next/link";
import { ragChatInterface } from "./project-texts/rag_chat_object";
import { transformerObject } from "./project-texts/transformer_object";
import { vaibeeIncObject } from "./project-texts/vaibee_object";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { GithubMulticolorIcon } from "./github-multicolor";

interface PunchPaperRedProps {
  className?: string;
  style?: React.CSSProperties;
}

export const four_b_pencil = localFont({
  src: "../../../public/fonts/four-b-pencil.otf",
  variable: "--font-four_b_pencil",
  display: "swap",
});

const projectContentMap: Record<string, blockType[]> = {
  hive: hiveObject,
  rag_chat_interface: ragChatInterface,
  transformer: transformerObject,
  vaibee_inc: vaibeeIncObject,
};

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
      id: "vaibee_inc",
      name: "Vaibee.inc",
      title: "VAIBEE.INC * A LABOUR OF LOVE * VAIBEE.INC * A LABOUR OF LOVE *",
      activeState: "#F8EAFF",
      fontActiveState: "#2B0C7D",
    },
    {
      id: "rag_chat_interface",
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
      className={`${className} bg-[#B7BED7] relative w-full min-w-screen md:min-w-2xl max-w-3xl aspect-3/4 flex flex-col`}
      style={style}
    >
      {/* top border */}
      <div className="relative">
        <div
          className={`${magnat_text_regular.className} absolute top-0 left-0 right-0 bg-transparent h-12 rounded-t-md border-b-[1.5px] border-current grid grid-cols-12 text-xs font-bold`}
        >
          <div className="col-span-4 border-r-[1.5px] border-current">
            <div className="w-full h-full p-2.5 flex items-center justify-between">
              <Image
                src="/imgs/star-doodle.svg"
                width={23.88}
                height={25.4}
                alt="star-doodle-img"
              />
              <span className="font-extralight text-xs md:text-sm">
                Project
              </span>
            </div>
          </div>
          <div className="col-span-8">
            <div className="w-full h-full p-2.5 flex items-center">
              <span className="font-extralight text-xs md:text-sm">
                Details
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full h-full min-h-0">
        {/* ── MOBILE: tabs on top, content below ── */}
        <Tabs defaultValue="hive" className="flex flex-col h-full md:hidden">
          <TabsList className="bg-[#B7BED7] p-0 w-full flex flex-row  shrink-0">
            {projects.map((project) => (
              <SidebarTabsTrigger
                key={project.id}
                variant="mobile"
                style={
                  { "--active-bg": project.activeState } as React.CSSProperties
                }
                value={project.id}
                className="h-full"
              >
                {project.name}
              </SidebarTabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 min-h-100 overflow-y-auto">
            {projects.map((project) => (
              <TabsContent
                key={project.id}
                value={project.id}
                className="h-full m-0"
              >
                <SidebarCard
                  style={{ backgroundColor: project.activeState }}
                  className="h-full rounded-none"
                >
                  <CardHeader className="p-0 pt-2">
                    <TextScrollMarquee
                      title={project.title}
                      textColor={project.fontActiveState}
                    />
                    <div className="flex items-center gap-x-3 px-3 pt-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            className={`${magnat_text_regular.className} w-fit text-xs h-7`}
                            style={{
                              backgroundColor: project.fontActiveState,
                              color: project.activeState,
                            }}
                            asChild
                          >
                            <Link
                              href={`${(projectContentMap[project.id][0] as metadataBlockType).overview}`}
                            >
                              Showcase
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          arrowClassName="bg-transparent fill-transparent"
                          style={{ backgroundColor: project.fontActiveState }}
                        >
                          <p>All images & video demo in here!</p>
                        </TooltipContent>
                      </Tooltip>
                      <Link
                        href={`${(projectContentMap[project.id][0] as metadataBlockType).githublnk}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubMulticolorIcon
                          fill={project.fontActiveState}
                          size={22}
                        />
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 py-2">
                    <div className="flex flex-col gap-4 text-[12px]">
                      <SidebarCardContent
                        blocks={projectContentMap[project.id]}
                      />
                    </div>
                  </CardContent>
                </SidebarCard>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        {/* ── DESKTOP: original left/right split ── */}
        <Tabs
          defaultValue="hive"
          orientation="vertical"
          className="hidden md:flex h-full w-full"
        >
          <div className="grid grid-cols-12 w-full h-full">
            {/* Left panel */}
            <TabsList className="bg-[#B7BED7] p-0 col-span-4 h-full w-full flex flex-col items-start justify-start rounded-none border-r">
              {projects.map((project) => (
                <SidebarTabsTrigger
                  key={project.id}
                  variant="sidebar"
                  className="w-full"
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
                      <div className="flex items-center justify-start gap-x-4">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              className={`${magnat_text_regular.className} w-fit ml-7`}
                              style={{
                                backgroundColor: project.fontActiveState,
                                color: project.activeState,
                              }}
                              asChild
                            >
                              <Link
                                href={`${(projectContentMap[project.id][0] as metadataBlockType).overview}`}
                              >
                                Project showcase
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            arrowClassName="bg-transparent fill-transparent"
                            style={{ backgroundColor: project.fontActiveState }}
                          >
                            <p>
                              All images & video demo in here, check it out!
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        <Link
                          href={`${(projectContentMap[project.id][0] as metadataBlockType).githublnk}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GithubMulticolorIcon
                            fill={project.fontActiveState}
                            size={30}
                          />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-8">
                        <SidebarCardContent
                          blocks={projectContentMap[project.id]}
                        />
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

PunchPaperRed.displayName = "PunchPaperRed";
