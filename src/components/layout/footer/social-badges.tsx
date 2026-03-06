import Image from "next/image";
import Link from "next/link";

export const SocialBadges = () => {
  const socials = [
    {
      name: "linkedin",
      link: "https://linkedin.com/in/yourprofile",
      src: "/imgs/footer/logos/linkeding.svg",
      height: 20,
      width: 20,
    },
    {
      name: "x",
      link: "https://x.com/yourhandle",
      src: "/imgs/footer/logos/xing.svg",
      height: 20,
      width: 20,
    },
    {
      name: "github",
      link: "https://github.com/yourusername",
      src: "/imgs/footer/logos/githubing.svg",
      height: 20,
      width: 20,
    },
    {
      name: "mail",
      link: "mailto:your@email.com",
      src: "/imgs/footer/logos/mailing.svg",
      height: 13,
      width: 20,
    },
  ];

  return (
    <div className="flex gap-8 py-8">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Image
            src={social.src}
            alt={social.name}
            height={social.height}
            width={social.width}
          />
        </Link>
      ))}
    </div>
  );
};
