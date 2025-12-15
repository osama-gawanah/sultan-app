"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Header } from "./header"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Play } from "lucide-react"
import { DashboardPreview } from "./dashboard-preview"
import { MatrixRain } from "./ui/matrix-rain"
export function HeroSection() {
  const t = useTranslations("HeroSection")

  return (
    <section
      className="border flex flex-col items-center text-center relative mx-auto overflow-hidden 
         w-full h-[100dvh] lg:h-[750px]"
    >
      <MatrixRain />

      {/* Optimized Background - CSS for grid, minimal SVG for overlays */}
      <div className="absolute inset-0 z-10">
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

          {/* Gradient overlays */}
          <g opacity="0.6">
            <path
              d="M1447.45 -87.0203V-149.03H1770V1248.85H466.158V894.269C1008.11 894.269 1447.45 454.931 1447.45 -87.0203Z"
              fill="url(#gradient1)"
            />
          </g>
          <g opacity="0.5">
            <path
              d="M1383.45 -151.02V-213.03H1706V1184.85H402.158V830.269C944.109 830.269 1383.45 390.931 1383.45 -151.02Z"
              fill="url(#gradient2)"
            />
          </g>
          <g opacity="0.4" style={{ mixBlendMode: "lighten" }}>
            <path
              d="M1567.45 -231.02V-293.03H1890V1104.85H586.158V750.269C1128.11 750.269 1567.45 310.931 1567.45 -231.02Z"
              fill="url(#gradient3)"
            />
          </g>
          <g opacity="0.3" style={{ mixBlendMode: "overlay" }}>
            <path
              d="M65.625 750.269H284.007C860.205 750.269 1327.31 283.168 1327.31 -293.03H1650V1104.85H65.625V750.269Z"
              fill="url(#gradient4)"
            />
          </g>

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

      <div className="relative w-full z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 mt-28 md:mt-[120px]">

        <DashboardPreview />
      </div>


    </section>
  )
}
