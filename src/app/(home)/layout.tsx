import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Code_Pro } from "next/font/google";
import "../globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Preloader from "@/components/preloader/preloader";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollBg } from "@/components/layout/scroll-bg";
import { MobileWarner } from "@/components/layout/mobile-warner";
import { TextMarquee } from "@/components/text-marquee";
import { PinWheel } from "@/components/page-components/pinwheel";
import { FooterBlock } from "@/components/layout/footer/footer-block";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaibee.inc",
  description: "Its my portfolio! hehe, a kaleidoscope of my thoughts n ramblings",
};

export const source_code = Source_Code_Pro({
    subsets: ["latin"],
    variable: "--font-source-code",
    display: "swap",
})

export const didot = localFont({
  src: "../../../public/fonts/didot_italic.otf",
  variable: "--font-didot-italic",
  display: "swap",
});

export const housing = localFont({
  src: "../../../public/fonts/housing.ttf",
  variable: "--font-housing",
  display: "swap",
});

export const magnat_text_regular = localFont({
  src: "../../../public/fonts/magnat_family/text_test/magnat_text_test_regular.woff",
  variable: "--font-magnat_text_regular",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/preloader/blue_doodle.png" />
        <link rel="preload" as="image" href="/preloader/green_doodle.png" />
        <link rel="preload" as="image" href="/preloader/orange_doodle.png" />
        <link rel="preload" as="image" href="/preloader/pink_doodle.png" />
        <link rel="preload" as="image" href="/preloader/vaibee_loader.png" />
      </head>
      <body
        className={cn(
          `  ${geistSans.variable}
              ${geistMono.variable}
              ${source_code.variable}
              ${didot.variable}
              ${housing.variable}
              ${magnat_text_regular.variable} antialiased`,
          "bg-[#DF4346] overflow-x-hidden",
        )}
      >
        <Preloader/>
        <TooltipProvider>
        <ScrollBg />
        <MobileWarner />
        <TextMarquee />
        <main>{children}</main>
        <PinWheel />
        <FooterBlock />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: "var(--font-departure_mono)",
              background: "#2B0C7D",
              color: "#FAB5C5",
              border: "none",
            },
          }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
