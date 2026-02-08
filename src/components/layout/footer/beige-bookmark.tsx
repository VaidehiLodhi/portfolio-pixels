import localFont from "next/font/local";
import Image from "next/image";

export const departure_mono = localFont({
  src: "../../../../public/fonts/departure-mono.woff2",
  variable: "--font-departure-mono",
  display: "swap",
});

export const nok = localFont({
  src: "../../../../public/fonts/nok.ttf",
  variable: "--font-nok",
  display: "swap",
});

export const BeigeBookmark = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col pt-2 relative overflow-hidden">
        {/* SVG mask layer - applies to entire component */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          style={{ zIndex: -1 }}
        >
          <defs>
            <mask id="punch-holes">
              <rect width="100%" height="100%" fill="white" />
              {[...Array(9)].map((_, i) => (
                <circle
                  key={i}
                  cx={`${1 + i * 12.25}%`}
                  cy="95%"
                  r="8"
                  fill="black"
                />
              ))}
            </mask>
          </defs>
        </svg>

        {/* Content with mask applied */}
        <div
          className="relative bg-[#F5E1CD] rounded-t-[10px] pb-4 "
          style={{
            maskImage: "url(#punch-holes)",
            WebkitMaskImage: "url(#punch-holes)",
          }}
        >
          <Image
            src="/imgs/footer/cat_crossward.svg"
            alt="cat crossward"
            width={177.74}
            height={146.22}
          />
          <div
            className={`${departure_mono.className} text-[#E60AA9] pt-7 pb-8 flex flex-col text-[14px] text-center`}
          >
            <div>creating,</div>
            <div>from my nook</div>
          </div>
        </div>
      </div>

      <div className="bg-[#F5E1CD] rounded-b-[10px] flex flex-col items-center justify-between pt-2">
        <Image
          src="/imgs/footer/barcode.svg"
          alt="barcode"
          width={137}
          height={52}
          className="h-auto pb-2"
        />
        <p
          className={`${nok.className} uppercase text-[42px] p-0 m-0 leading-none  text-[#F69FA5]`}
        >
          VAIBEE.INC
        </p>
      </div>
    </div>
  );
};