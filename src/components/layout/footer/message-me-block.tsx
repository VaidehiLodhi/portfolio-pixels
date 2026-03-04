import localFont from "next/font/local";
import { FormFields } from "./form-fields";
import { SocialBadges } from "./social-badges";

export const magnat_text_regular = localFont({
  src: "../../../../public/fonts/magnat_family/text_test/magnat_text_test_regular.woff",
  variable: "--font-magnat_text_regular",
  display: "swap",
});

export const departure_mono = localFont({
  src: "../../../../public/fonts/departure-mono.woff2",
  variable: "--font-departure-mono",
  display: "swap",
});

export const MessageMeBlock =()=> {
    return (
      <div className="flex flex-col items-center w-full justify-center pt-12 text-[#DF4346]">
        <div className="flex flex-col w-full gap-0 items-start justify-center pb-5 pl-15">
          <div
            className={`${magnat_text_regular.className} leading-none text-left text-[34px]`}
          >
            Yup, that's me, Vaidehi.
          </div>
          <div
            className={`${magnat_text_regular.className} text-left text-[34px]`}
          >
            (Vaibee on the internet, hehe)
          </div>
        </div>
        <div className={`${departure_mono.className} pl-20 w-full flex flex-col gap-0 items-start justify-center text-[14px]`}>
          <p>I'm always up for opportunities to work</p>
          <p>on new projects, participate in a hackathon or</p>
          <p>anything fun!</p>
          <p>So, feel free to reach out!</p>
          <p>If you have a fun idea, I'd love to hear it</p>
        </div>
        <FormFields/>
        <SocialBadges/>
      </div>
    );
}