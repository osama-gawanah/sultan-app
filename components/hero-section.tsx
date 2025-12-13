"use client"

import React, { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "./header"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Play } from "lucide-react"
import { DashboardPreview } from "./dashboard-preview"
import { useScroll, useTransform, motion, useMotionValue, useMotionValueEvent } from "framer-motion"

export function HeroSection() {
  const t = useTranslations("HeroSection")
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  // Create different parallax speeds for each gradient overlay
  // Each moves at a different speed to create depth effect (reduced intensity)
  const gradient1Y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const gradient2Y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const gradient3Y = useTransform(scrollYProgress, [0, 1], [0, -160])
  const gradient4Y = useTransform(scrollYProgress, [0, 1], [0, 60])
  
  // Refs for gradient elements
  const gradient1Ref = useRef<SVGLinearGradientElement>(null)
  const gradient2Ref = useRef<SVGLinearGradientElement>(null)
  const gradient3Ref = useRef<SVGLinearGradientElement>(null)
  const gradient4Ref = useRef<SVGRadialGradientElement>(null)
  
  // Animated values for gradient positions in defs (reduced intensity)
  const g1Y1 = useTransform(scrollYProgress, [0, 1], [-149.03, -229.03])
  const g1Y2 = useTransform(scrollYProgress, [0, 1], [1248.85, 1168.85])
  const g2Y1 = useTransform(scrollYProgress, [0, 1], [-213.03, -333.03])
  const g2Y2 = useTransform(scrollYProgress, [0, 1], [1184.85, 1064.85])
  const g3Y1 = useTransform(scrollYProgress, [0, 1], [-293.03, -453.03])
  const g3Y2 = useTransform(scrollYProgress, [0, 1], [1104.85, 944.85])
  const g4Y = useTransform(scrollYProgress, [0, 1], [557.24, 617.24])
  
  // Update gradient attributes on scroll
  useMotionValueEvent(g1Y1, "change", (latest) => {
    if (gradient1Ref.current) {
      gradient1Ref.current.setAttribute("y1", String(latest))
    }
  })
  useMotionValueEvent(g1Y2, "change", (latest) => {
    if (gradient1Ref.current) {
      gradient1Ref.current.setAttribute("y2", String(latest))
    }
  })
  useMotionValueEvent(g2Y1, "change", (latest) => {
    if (gradient2Ref.current) {
      gradient2Ref.current.setAttribute("y1", String(latest))
    }
  })
  useMotionValueEvent(g2Y2, "change", (latest) => {
    if (gradient2Ref.current) {
      gradient2Ref.current.setAttribute("y2", String(latest))
    }
  })
  useMotionValueEvent(g3Y1, "change", (latest) => {
    if (gradient3Ref.current) {
      gradient3Ref.current.setAttribute("y1", String(latest))
    }
  })
  useMotionValueEvent(g3Y2, "change", (latest) => {
    if (gradient3Ref.current) {
      gradient3Ref.current.setAttribute("y2", String(latest))
    }
  })
  useMotionValueEvent(g4Y, "change", (latest) => {
    if (gradient4Ref.current) {
      gradient4Ref.current.setAttribute(
        "gradientTransform",
        `translate(989.13 ${latest}) rotate(47.9516) scale(466.313 471.424)`
      )
    }
  })

  return (
    <section
      ref={sectionRef}
      className="border flex flex-col items-center text-center relative mx-auto overflow-hidden md:my-6 py-0
         w-full h-[600px] md:h-[600px] lg:h-[750px] md:px-0"
    >
      {/* Optimized Background - CSS for grid, minimal SVG for overlays */}
      <div className="absolute inset-0 z-0">
        {/* CSS Grid Pattern - Much faster than 770 SVG rectangles */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 35.6px,
                hsl(210, 100%, 60%) 35.6px,
                hsl(210, 100%, 60%) 36px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 35.6px,
                hsl(210, 100%, 60%) 35.6px,
                hsl(210, 100%, 60%) 36px
              )
            `,
            backgroundSize: '36px 36px',
            backgroundPosition: '-20px 9px',
            opacity: 0.11,
            maskImage: 'linear-gradient(to bottom right, transparent 0%, hsl(210, 80%, 50%) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom right, transparent 0%, hsl(210, 80%, 50%) 100%)',
          }}
        />
        
        {/* Simplified SVG - only 12 highlighted cells + gradients (was 770+ rectangles) */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1220 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
        >
          {/* Only the 12 highlighted filled rectangles instead of 770+ */}
          <g>
            <rect x="699.711" y="81" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.08" />
            <rect x="195.711" y="153" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.09" />
            <rect x="1023.71" y="153" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.09" />
            <rect x="123.711" y="225" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.09" />
            <rect x="1095.71" y="225" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.09" />
            <rect x="951.711" y="297" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.09" />
            <rect x="231.711" y="333" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.07" />
            <rect x="303.711" y="405" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.07" />
            <rect x="87.7109" y="405" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.09" />
            <rect x="519.711" y="405" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.08" />
            <rect x="771.711" y="405" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.09" />
            <rect x="591.711" y="477" width="36" height="36" fill="hsl(210, 100%, 60%)" fillOpacity="0.07" />
          </g>

          {/* Gradient overlays with parallax animation */}
          <motion.g 
            opacity="0.6"
            style={{ y: gradient1Y }}
          >
            <path
              d="M1447.45 -87.0203V-149.03H1770V1248.85H466.158V894.269C1008.11 894.269 1447.45 454.931 1447.45 -87.0203Z"
              fill="url(#gradient1)"
            />
          </motion.g>
          <motion.g 
            opacity="0.5"
            style={{ y: gradient2Y }}
          >
            <path
              d="M1383.45 -151.02V-213.03H1706V1184.85H402.158V830.269C944.109 830.269 1383.45 390.931 1383.45 -151.02Z"
              fill="url(#gradient2)"
            />
          </motion.g>
          <motion.g 
            opacity="0.4" 
            style={{ mixBlendMode: "lighten", y: gradient3Y }}
          >
            <path
              d="M1567.45 -231.02V-293.03H1890V1104.85H586.158V750.269C1128.11 750.269 1567.45 310.931 1567.45 -231.02Z"
              fill="url(#gradient3)"
            />
          </motion.g>
          <motion.g 
            opacity="0.3" 
            style={{ mixBlendMode: "overlay", y: gradient4Y }}
          >
            <path
              d="M65.625 750.269H284.007C860.205 750.269 1327.31 283.168 1327.31 -293.03H1650V1104.85H65.625V750.269Z"
              fill="url(#gradient4)"
            />
          </motion.g>

          <rect
            x="0.5"
            y="0.5"
            width="1219"
            height="809"
            rx="15.5"
            stroke="hsl(210, 100%, 60%)"
            strokeOpacity="0.06"
          />

          <defs>
            <linearGradient 
              ref={gradient1Ref}
              id="gradient1" 
              x1="1118.08" 
              y1="-149.03" 
              x2="1118.08" 
              y2="1248.85" 
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="hsl(210, 100%, 70%)" />
              <stop offset="0.578125" stopColor="hsl(210, 100%, 65%)" />
              <stop offset="1" stopColor="hsl(210, 100%, 50%)" />
            </linearGradient>
            <linearGradient 
              ref={gradient2Ref}
              id="gradient2" 
              x1="1054.08" 
              y1="-213.03" 
              x2="1054.08" 
              y2="1184.85" 
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="hsl(210, 100%, 70%)" />
              <stop offset="0.578125" stopColor="hsl(210, 100%, 65%)" />
              <stop offset="1" stopColor="hsl(210, 100%, 50%)" />
            </linearGradient>
            <linearGradient 
              ref={gradient3Ref}
              id="gradient3" 
              x1="1238.08" 
              y1="-293.03" 
              x2="1238.08" 
              y2="1104.85" 
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="hsl(210, 100%, 70%)" />
              <stop offset="0.578125" stopColor="hsl(210, 100%, 65%)" />
              <stop offset="1" stopColor="hsl(210, 100%, 50%)" />
            </linearGradient>
            <radialGradient
              ref={gradient4Ref}
              id="gradient4"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(989.13 557.24) rotate(47.9516) scale(466.313 471.424)"
            >
              <stop stopColor="hsl(210, 100%, 70%)" />
              <stop offset="0.157789" stopColor="hsl(210, 100%, 65%)" />
              <stop offset="1" stopColor="hsl(210, 100%, 50%)" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Header positioned at top of hero container */}
      <div className="absolute -top-4 left-0 right-0 z-20">
        <Header />
      </div>

      <div className="relative w-full z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 mt-36 md:mt-[120px]">
      
        <DashboardPreview />
      </div>


    </section>
  )
}
