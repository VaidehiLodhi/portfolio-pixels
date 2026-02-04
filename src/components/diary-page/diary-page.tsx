import localFont from "next/font/local";
import { LinkPanel } from "./link-panel";
import { CattoFigurine } from "./catto-figurine";

export const belmonte = localFont({
  src: "../../../public/fonts/belmonte_ballpoint.otf",
  variable: "--font-belmonte_ballpoint",
  display: "swap",
});

export const DiaryPage = () => {
  return (
    <div
      className="relative w-full max-w-4xl overflow-hidden"
      style={{
        aspectRatio: "1084/780",
        backgroundImage: "url(/imgs/notebook-pimk.svg)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`${belmonte.className} p-8 grid grid-cols-4 h-full overflow-hidden`}
      >
        <div className="col-span-2 flex flex-col min-h-0 px-4 h-full">
          <p className="text-3xl pt-10 pl-6 pb-5">Hello!</p>
          <div className="flex flex-col gap-3 min-h-0">
            <p className="text-xl pl-4">
              My name is Vaidehi Lodhi, and I am a developer.
            </p>
            <p className="text-xl pl-4">
              I love designing digital experiences that blend different tech and
              mediums.
            </p>
            <p className="text-xl pl-4">
              Currently, focusing on going as deep into machine learning as I
              can get.
            </p>
            <p className="text-xl pl-4">
              Trying to get it all into my brain before it succumbs to the
              rigidity of age hehe.
            </p>
          </div>
          <img
            src="/imgs/cat_with_wool.svg"
            alt="cat with wool ofc"
            className="mt-auto max-w-full h-auto pl-2 py-3"
          />
        </div>
        <div className="col-span-2 flex flex-col min-h-0 h-full">
          <LinkPanel/>
        </div>
      </div>
    </div>
  );
};
