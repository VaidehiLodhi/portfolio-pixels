import { cn } from "@/lib/utils";
import localFont from "next/font/local";

export const nok = localFont({
  src: "../../public/fonts/nok.ttf",
  variable: "--font-nok",
  display: "swap",
});

export const bringbold = localFont({
  src: "../../public/fonts/bringbold-nineties.ttf",
  variable: "--font-bringbold",
  display: "swap",
});

const textPattern = [
  { char: "D", font: bringbold.className, size: "text-[115px]" },
  { char: "E", font: nok.className, size: "text-[120px]" },
  { char: "V", font: bringbold.className, size: "text-[115px]" },
  { char: "E", font: bringbold.className, size: "text-[115px]" },
  { char: "L", font: bringbold.className, size: "text-[115px]" },
  { char: "O", font: nok.className, size: "text-[120px]" },
  { char: "P", font: bringbold.className, size: "text-[115px]" },
  { char: "E", font: nok.className, size: "text-[120px]" },
  { char: "R", font: nok.className, size: "text-[120px]" },
  { char: " ", font: "", size: "" },
  { char: "*", font: nok.className, size: "text-[115px]", spacing: "mx-4" },
  { char: " ", font: "", size: "" },
  { char: "V", font: nok.className, size: "text-[120px]" },
  { char: "A", font: bringbold.className, size: "text-[115px]" },
  { char: "I", font: bringbold.className, size: "text-[115px]" },
  { char: "B", font: nok.className, size: "text-[120px]" },
  { char: "E", font: bringbold.className, size: "text-[115px]" },
  { char: "E", font: nok.className, size: "text-[120px]" },
  { char: " ", font: "", size: "" },
  { char: "*", font: nok.className, size: "text-[115px]", spacing: "mx-4" },
  { char: " ", font: "", size: "" },
  { char: "D", font: bringbold.className, size: "text-[115px]" },
  { char: "E", font: bringbold.className, size: "text-[115px]" },
  { char: "S", font: nok.className, size: "text-[120px]" },
  { char: "I", font: nok.className, size: "text-[120px]" },
  { char: "G", font: bringbold.className, size: "text-[115px]" },
  { char: "N", font: nok.className, size: "text-[120px]" },
  { char: "E", font: bringbold.className, size: "text-[115px]" },
  { char: "R", font: nok.className, size: "text-[120px]" },
  { char: " ", font: "", size: "" },
  { char: "*", font: nok.className, size: "text-[115px]", spacing: "mx-4" },
  { char: " ", font: "", size: "" },
];

type CharPerCharProps = {
  outline?: boolean,
  color?: string,
}

export const CharPerChar = ({
  outline,
  color="#FAB5C5"
} : CharPerCharProps) => {
  return (
    <div className="flex items-baseline">
      {textPattern.map((item, index) => (
        <span
          key={index}
          className={cn(
            `${item.font} ${item.size}  ${item.spacing || ""}`,
            outline
             ? `text-transparent [-webkit-text-stroke:2px_#DF4346]`
             : "text-[#FAB5C5]" 
          )}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
};
