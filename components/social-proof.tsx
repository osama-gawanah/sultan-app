"use client"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export function SocialProof() {
  const t = useTranslations("SocialProof")
  
  const logos: Array<{ src: string; alt: string; href: string }> = Array.from({ length: 8 }).map((_, i) => ({
    src: `/logos/logo0${i + 1}.svg`,
    alt: `شعار شريك رقم ${i + 1}`,
    href: "#",
  }))

  return (
    <section className=" py-24 overflow-hidden">
      <h2 className="mx-4 mb-12 text-center text-2xl font-medium md:text-4xl">
        {t("title")}
      </h2>
      <div className="flex translate-y-[50%] rotate-[7deg] scale-110 overflow-hidden border-y-4 border-blue-600 bg-white">
        <TranslateWrapper>
          <LogoItems logos={logos} />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItems logos={logos} />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItems logos={logos} />
        </TranslateWrapper>
      </div>
      <div className="flex -translate-y-[50%] -rotate-[7deg] scale-110 overflow-hidden border-y-4 border-blue-600 bg-white">
        <TranslateWrapper reverse>
          <LogoItems logos={logos} />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItems logos={logos} />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItems logos={logos} />
        </TranslateWrapper>
      </div>
    </section>
  )
}

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: ReactNode
  reverse?: boolean
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex px-2"
    >
      {children}
    </motion.div>
  )
}

const LogoItems = ({ logos }: { logos: Array<{ src: string; alt: string; href: string }> }) => (
  <>
    {logos.map((logo, i) => (
      <LogoItem key={i} src={logo.src} alt={logo.alt} href={logo.href} />
    ))}
  </>
)

const LogoItem = ({ src, alt,href }: { src: string; alt: string; href:string }) => {
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
