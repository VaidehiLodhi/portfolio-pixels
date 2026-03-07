import { bringbold } from "@/components/char-per-char";

export const metadata = {
  title: "404 (new error era)"
}

export default function NotFound() {
  return (
    <div className=" fixed inset-0 w-screen h-screen bg-[#FAB5C5] flex items-center justify-center overflow-hidden">
      {/* Doodle tile overlay */}
      <div
        className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        style={{
          backgroundImage: "url('/imgs/doodle_mega_tile_pink.png')",
          backgroundSize: "1262px 187px",
          backgroundRepeat: "repeat",
          transform: "translateX(-10px)",
        }}
      />

      {/* 404 text */}
      <h1 className={`${bringbold.className} text-center relative z-10 text-9xl font-black text-white select-none`}>
        404
      </h1>
    </div>
  );
}