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
      <div className="flex flex-col items-center justify-center text-[#FAB5C5]">
        <div className="flex flex-col gap-0 items-start justify-center pb-5">
          <div
            className={`${magnat_text_regular.className} leading-none text-left text-[36px]`}
          >
            Yup, that's me, Vaidehi.
          </div>
          <div
            className={`${magnat_text_regular.className} text-left text-[36px]`}
          >
            (Vaibee on the internet, hehe)
          </div>
        </div>
        <div className={`${departure_mono.className} flex flex-col gap-0 items-start justify-center text-[16px]`}>
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