import { Courier_Prime, IM_Fell_DW_Pica } from "next/font/google";
import localFont from "next/font/local";

export const imfell = IM_Fell_DW_Pica({
  subsets: ["latin"],
  weight: "400",
  style: ['normal', 'italic'],
  variable: "--font-imfelldwpica",
  display: "swap",
});

export const courier_prime = Courier_Prime({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-courier-prime",
  display: "swap",
});

export const futura_book = localFont({
  src: "../../../../public/fonts/futura_book.ttf",
  variable: "--font-futura-book",
  display: "swap",
});

export const teenage_dream = localFont({
  src: "../../../../public/fonts/teenage-dreams.ttf",
  variable: "--font-teenage-dream",
  display: "swap",
});

export const GuestCheck = () => {
  return (
    <div className="flex flex-col bg-[#F5E1CD] pb-4 rounded-[10px] text-[#2B0C7D] max-w-65">
      <p className={`${imfell.className} text-center text-[30px]`}>
        Guest Check
      </p>
      <div
        className={`${futura_book.className} flex px-4 py-1 text-[8px] items-stretch justify-center`}
      >
        {["Date", "Table", "Guests", "Server"].map((item) => (
          <div
            key={item}
            className="border border-r-0 border-[#2B0C7D] px-1.5 h-6 flex items-start justify-center"
          >
            {item}
          </div>
        ))}

        <div
          className={`${courier_prime.className} text-[#DF4346] text-lg border border-[#2B0C7D] px-1.5 h-6 flex items-center justify-center`}
        >
          143007
        </div>
      </div>

      <div
        className={`${futura_book.className} flex items-center justify-around gap-x-1 text-[8px] px-8`}
      >
        {[
          "APT",
          ".",
          "SOUP/SAL",
          ".",
          "ENTREE",
          ".",
          "VEG/POT",
          ".",
          "DESSERT",
          ".",
          "BEV",
        ].map((item) => (
          <span>{item}</span>
        ))}
      </div>

      <div className="flex items-center justify-center px-2">
        <div className="w-8 h-7 border border-[#2B0C7D] border-l-0" />
        <div className="w-30 h-7 border border-[#2B0C7D] border-l-0" />
        <div className="w-8 h-7 border border-[#2B0C7D] border-l-0" />
        <div className="w-8 h-7 border border-[#2B0C7D] border-l-0 border-r-0" />
      </div>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`flex items-center justify-center px-2 ${i === 3 ? "relative" : ""}`}
        >
          <div className="w-8 h-7 border border-[#2B0C7D] border-l-0 border-t-0" />
          <div className="w-30 h-7 border border-[#2B0C7D] border-l-0 border-t-0" />
          <div className="w-8 h-7 border border-[#2B0C7D] border-l-0 border-t-0" />
          <div className="w-8 h-7 border border-[#2B0C7D] border-l-0 border-t-0 border-r-0" />
          {i === 3 && (
            <div
              className={`${teenage_dream.className} leading-none absolute text-[#620AE6] text-[52px]`}
            >
              <p>every</p>
              <p>second</p>
              <p>counts</p>
            </div>
          )}
        </div>
      ))}

      <p className={`${imfell.className} text-center italic text-[16px] py-2`}>
        Thank you - Please come again
      </p>
      <p className="text-[8px] px-4">Guest Receipt</p>
      <div
        className={`${futura_book.className} flex px-4 py-1 text-[8px] items-start justify-center`}
      >
        {["Date", "Table", "Guests", "Server"].map((item) => (
          <div
            key={item}
            className="border border-r-0 border-[#2B0C7D] px-1.5 h-6 flex items-start justify-center"
          >
            {item}
          </div>
        ))}

        <div
          className={`${courier_prime.className} text-[#DF4346] text-lg border border-[#2B0C7D] px-1.5 h-6 flex items-center justify-center`}
        >
          143007
        </div>
      </div>
    </div>
  );
};
