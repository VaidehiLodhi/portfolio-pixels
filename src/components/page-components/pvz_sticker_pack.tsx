import Image from "next/image";
import StickerPeel from "../StickerPeel";

export const PeaShooterStickerPack = () => {
  return (
    <div className="flex items-end justify-center">
      <StickerPeel
        imageSrc="/imgs/stickers/reveal-2/pea_shooter.png"
        height={154.85}
        width={117.25}
        alt="pea_shooter"
        rotate={-8}
        peelBackHoverPct={5}
        peelBackActivePct={20}
        shadowIntensity={0.2}
        peelDirection={190}
      />
      <StickerPeel
        imageSrc="/imgs/stickers/reveal-2/flowey.png"
        height={174.73}
        width={124.95}
        alt="flowey"
        rotate={-8}
        peelBackHoverPct={5}
        peelBackActivePct={20}
        shadowIntensity={0.2}
        peelDirection={120}
      />
    </div>
  );
};
