import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ImgDialogContent,
} from "@/components/ui/dialog";
import localFont from "next/font/local";
import Image from "next/image";

export const departure_mono = localFont({
  src: "../../../../public/fonts/departure-mono.woff2",
  variable: "--font-departure-mono",
  display: "swap",
});

export const bringbold = localFont({
  src: "../../../../public/fonts/bringbold-nineties.ttf",
  variable: "--font-bringbold",
  display: "swap",
});

export function ImgScroll() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Scrollable Content</Button>
      </DialogTrigger>
      <ImgDialogContent
        className={`${departure_mono.className} text-[#332525] h-screen w-screen`}
      >
        <div className="w-screen h-full bg-[#F5E1CD] flex items-center justify-center gap-x-5">
          <div className="flex flex-col gap-y-6">
            <p className="text-lg uppercase">[OVERVIEW]</p>
            <div
              className={`${bringbold.className} text-4xl flex flex-col uppercase`}
            >
              <p>It's in the name;</p>
              <p>Hive provides a stage</p>
              <p>to allow a community</p>
              <p>of thinkers, planners</p>
              <p>collaborate.</p>
            </div>
            <div className="text-lg leading-6 flex flex-col">
              <p>A web based application that</p>
              <p>aims to provide users a</p>
              <p>kanban-like playing arena</p>
            </div>
          </div>
          <Image
            src="/imgs/mockups/hive_mockups/hive_mock_1.svg"
            alt="hive mockup"
            height={363}
            width={693.63}
          />
        </div>
        <div className="w-screen h-full bg-[#F5E1CD] flex gap-x-16">
          <div className="relative inline-block h-full">
            <Image
              src="/imgs/mockups/hive_mockups/clay_banks_japan.jpg"
              alt="clay_banks_japan"
              width={811}
              height={541}
              className="relative h-full"
            />
            <p className="absolute bottom-2 left-2 text-xs text-[#816D6D]">
              Photo by{" "}
              <a
                href="https://unsplash.com/photos/three-bicycles-parked-in-front-of-building-hwLAI5lRhdM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                className="underline"
              >
                Clay Banks
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/three-bicycles-parked-in-front-of-building-hwLAI5lRhdM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                className="underline"
              >
                Unsplash
              </a>
            </p>
            <video
              className="rounded-lg px-8 shadow-2xl absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%]"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="/imgs/mockups/hive_mockups/videos/creating_board_rewrap_rewrap_noa.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p>
            As mentioned earlier, <br />
            the aim of this is to mimic the freedom <br />
            offered by brainstorming, <br />
            scribbling down ideas. <br />
            Watching ur teammates figure stuff <br />
            around through a spectator interface. <br />
            Pitching in when needed.
            <br />
          </p>
        </div>
        <div className="w-screen h-full bg-[#F5E1CD] flex gap-x-16 items-end justify-center">
          <Image
            src="/imgs/mockups/hive_mockups/isometric_perspective_hive.png"
            alt="isometric_perspective_hive"
            width={862}
            height={575}
            className="relative h-full"
          />
          <div className="flex flex-col gap-y-3 items-start justify-center">
            <p>
              sometimes all a team <br />
              desires can be provided <br />
              through serene partnership <br />
            </p>
            <p>
              [ORGANIZATION PANEL] <br />
              invite the members you want,
              <br />
              curate the team u aspire <br />
            </p>
            <p>
              [ACTIVITY PANEL] <br />
              keep tabs on changes made,
              <br />
              let the changes guide you;
              <br />
            </p>
          </div>
        </div>
        <div className="w-screen h-full bg-[#F5E1CD] flex items-center justify-start">
          <div className="relative inline-block h-full">
            <Image
              src="/imgs/mockups/hive_mockups/macbook_whitebase.svg"
              alt="macbook_whitebase"
              width={920}
              height={480}
              className="relative h-full z-10"
            />

            <video
              className="rounded-lg w-[710px] h-[420px] absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[55%]"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="/imgs/mockups/hive_mockups/videos/draggable_rewrap_rewrap_noa.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="flex flex-col gap-y-4">
            <p>
              A fully draggable interface <br />
              that supports real time <br />
              action. <br />
              Add lists, cards,
              <br />
              descriptions. <br />
              Let your mates update them.
              <br />
            </p>
            <p>
              Utilise the kanban to <br />
              full potential, <br />
              drag all components until
              <br />
              they make sense to you.
              <br />
            </p>
            <p>
              The kanban way of doing things <br />
              gets a lot done.
              <br />
            </p>
          </div>
        </div>
      </ImgDialogContent>
    </Dialog>
  );
}
