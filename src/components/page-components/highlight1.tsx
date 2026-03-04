import Image from "next/image";

export const Highlight1 = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
      <div className="w-100 h-16 bg-[#EA6568] relative">
        <Image
          src="/imgs/stickers/reveal-1/streak.png"
          height={64}
          width={267}
          alt="streak"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
        />
        <Image
          src="/imgs/stickers/reveal-1/powerpuff.png"
          height={122}
          width={142}
          alt="powerpuff"
          className="absolute -top-8 right-0 translate-x-10"
        />
      </div>
    </div>
  );
};
