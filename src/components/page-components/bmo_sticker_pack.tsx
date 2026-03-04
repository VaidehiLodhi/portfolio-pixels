import Image from "next/image";
import StickerPeel from "../StickerPeel";

export const BmoStickerPack = () => {
  return (
    <div className="flex items-end justify-center">
      <Image
        src="/imgs/stickers/reveal-3/bmo_boi.gif"
        height={182}
        width={139}
        alt="bmo_boi"
      />
      <StickerPeel
        imageSrc="/imgs/stickers/reveal-3/lavendar.png"
        height={148}
        width={97}
        alt="flowey"
        rotate={-8}
        peelBackHoverPct={30}
        peelBackActivePct={50}
        shadowIntensity={0.2}
        peelDirection={50}
      />
    </div>
  );
};
