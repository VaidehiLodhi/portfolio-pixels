import Image from "next/image";
import StickerPeel from "../StickerPeel";

export const RickStickerPack = () => {
  return (
    <div className="flex items-center justify-center">
      <StickerPeel
        imageSrc="/imgs/stickers/reveal-4/morty_babu.png"
        height={143.95}
        width={103.71}
        alt="morty"
        rotate={-8}
        peelBackHoverPct={30}
        peelBackActivePct={50}
        shadowIntensity={0.2}
        peelDirection={50}
      />
      <StickerPeel
        imageSrc="/imgs/stickers/reveal-4/ricku_babu.png"
        height={147.26}
        width={94.87}
        alt="rick"
        rotate={8}
        peelBackHoverPct={30}
        peelBackActivePct={40}
        shadowIntensity={0.2}
        peelDirection={340}
      />
    </div>
  );
};
