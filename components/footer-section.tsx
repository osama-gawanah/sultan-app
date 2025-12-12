"use client"

import { Twitter, Github, Linkedin } from "lucide-react"
import Image from "next/image"
import { useLocale } from "next-intl"
import { cn } from "@/lib/utils"

export function FooterSection() {
  const locale = useLocale()
  const isRtl = locale === "ar"
  const currentYear = new Date().getFullYear()
  return (
    <footer className="w-full mx-auto px-5 flex flex-col gap-6 py-10">
      <div className="flex flex-row items-center justify-between gap-6">
        <div className={cn("flex gap-3", isRtl ? "-mr-6" : "-ml-6")}>
          <Image src="/logo-sultan.png" alt="Sultan Logo" width={140} height={140} />
        </div>

        <div className="flex justify-center items-center gap-4">
          <a href="#" aria-label="Twitter" className="w-5 h-5 flex items-center justify-center hover:text-foreground transition-colors">
            <Twitter className="w-full h-full text-muted-foreground hover:text-foreground" />
          </a>
          <a href="#" aria-label="GitHub" className="w-5 h-5 flex items-center justify-center hover:text-foreground transition-colors">
            <Github className="w-full h-full text-muted-foreground hover:text-foreground" />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-5 h-5 flex items-center justify-center hover:text-foreground transition-colors">
            <Linkedin className="w-full h-full text-muted-foreground hover:text-foreground" />
          </a>
        </div>
      </div>
      
      <div className="flex justify-center items-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Sultan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
