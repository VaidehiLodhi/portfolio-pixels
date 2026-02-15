import Image from "next/image";
import StickerPeel from "../StickerPeel";

export const PlantinoStickerPack = () => {
  return (
    <div className="flex items-end justify-center">
      <StickerPeel
        imageSrc="/imgs/stickers/reveal-2/cactus.png"
        height={161.96}
        width={79.09}
        alt="cactus"
        rotate={-8}
        peelBackHoverPct={10}
        peelBackActivePct={30}
        shadowIntensity={0.2}
        peelDirection={200}
      />
      <Image
        src="/imgs/stickers/reveal-2/snol_leaf.png"
        height={82}
        width={75}
        alt="snol_leaf"
        className="rotate-9"
      />
    </div>
  );
};
