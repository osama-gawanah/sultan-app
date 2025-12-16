"use client"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Marquee } from "@/components/ui/marquee"
import { partners, type Partner } from "@/constants/partners"

export function SocialProof() {
  const t = useTranslations("SocialProof")

  return (
    <section className="py-24 overflow-hidden" dir="ltr">
      <h2 className="mx-4 mb-12 text-center text-2xl font-medium md:text-4xl">
        {t("title")}
      </h2>
      <div className="overflow-hidden bg-white">
        <Marquee className="[--duration:50s]" pauseOnHover>
          <LogoItems logos={partners} />
        </Marquee>
      </div>
      <div className="overflow-hidden bg-white">
        <Marquee className="[--duration:50s]" reverse pauseOnHover>
          <LogoItems logos={partners} />
        </Marquee>
      </div>
    </section>
  )
}

const LogoItems = ({ logos }: { logos: Partner[] }) => {
  return (
    <>
      {logos.map((logo, i) => (
        <LogoItem key={i} src={logo.src} alt={logo.alt} href={logo.href} />
      ))}
    </>
  );
};

const LogoItem = ({ src, alt, href }: Partner) => {
  return (
    <a href={href} target="_blank" className="flex items-center w-80 justify-center px-4 py-4 text-blue-600 transition-colors hover:bg-blue-50 md:py-6">
      <Image
        src={src}
        alt={alt}
        width={120}
        height={60}
        className="h-12 w-full object-contain md:h-16"
      />
    </a>
  )
}
