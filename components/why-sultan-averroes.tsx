"use client"

import { motion } from "framer-motion"
import { BookOpen, Building2, TrendingUp, Globe, ShieldCheck, Play } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { useState, useRef } from "react"

const featureIcons = [BookOpen, Building2, TrendingUp, Globe, ShieldCheck]

const featureColors = [
  { color: "#6366f1", gradient: "from-indigo-500 to-purple-500" },
  { color: "#0ea5e9", gradient: "from-sky-500 to-blue-500" },
  { color: "#10b981", gradient: "from-emerald-500 to-teal-500" },
  { color: "#f59e0b", gradient: "from-amber-500 to-orange-500" },
  { color: "#ef4444", gradient: "from-red-500 to-rose-500" },
]

interface GridItemProps {
  area: string
  feature: {
    number: string
    title: string
    description: string
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    color: string
    gradient: string
  }
  isRtl: boolean
  index: number
}

const GridItem = ({ area, feature, isRtl, index }: GridItemProps) => {
  const Icon = feature.icon

  return (
    <motion.li
      className={`min-h-[14rem] list-none ${area}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 group" style={{ borderColor: `${feature.color}30` }}>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-white/80 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-2xl dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          {/* Gradient Background Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${feature.color}08, transparent)`,
            }}
          />

          <div className="relative flex flex-1 flex-col justify-between gap-3 z-10">
            {/* Number Badge and Number */}
            <div className="flex items-start justify-between mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}05)`,
                  borderColor: `${feature.color}30`,
                }}
              >
                <Icon className="w-8 h-8" style={{ color: feature.color }} />
              </div>
              {/* <div
                className="text-6xl md:text-7xl font-bold opacity-10"
                style={{ color: feature.color }}
              >
                {feature.number}
              </div> */}
            </div>

            <div className="space-y-3 flex-1">
              <h3
                className="pt-0.5 text-xl/[1.375rem] font-semibold text-balance text-gray-900 md:text-2xl/[1.875rem] dark:text-white"
                dir={isRtl ? "rtl" : "ltr"}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm/[1.125rem] text-gray-600 md:text-base/[1.375rem] dark:text-neutral-400"
                dir={isRtl ? "rtl" : "ltr"}
              >
                {feature.description}
              </p>
            </div>

            {/* Decorative Element */}
            <div className="mt-6 pt-6">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: feature.color }}
                />
                <div
                  className="flex-1 h-0.5 rounded-full"
                  style={{ backgroundColor: `${feature.color}30` }}
                />
              </div>
            </div>
          </div>

          {/* Corner Accent */}
          <div
            className="absolute top-0  rounded-full right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${feature.color}, transparent)`,
              transform: "translate(30%, -30%)",
            }}
          />
        </div>
      </div>
    </motion.li>
  )
}

interface VideoCardProps {
  isRtl: boolean
  index: number
}

const VideoCard = ({ isRtl, index }: VideoCardProps) => {
  const t = useTranslations("WhySultanAverroes")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const videoData = t.raw("video") as {
    url: string
    title: string
    description: string
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <motion.li
      className="min-h-[20rem] w-full col-span-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 group"
        style={{ borderColor: "#6366f130" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white/80 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-2xl dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          {/* Gradient Background Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              background: "linear-gradient(135deg, #6366f108, transparent)",
            }}
          />

          <div className="relative flex flex-col h-full z-10">
            {/* Header Section */}


            {/* Video Section */}
            <div className="relative flex-1 ">
              <div className="relative w-full h-full min-h-[16rem] md:min-h-[20rem] rounded-xl overflow-hidden bg-gray-900">
                {videoData.url ? (
                  <>
                    <video
                      ref={videoRef}
                      src={videoData.url}
                      className="w-full h-full object-cover"
                      loop
                      playsInline
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                    {/* Play/Pause Overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                      onClick={handlePlayPause}
                    >
                      <motion.div
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center shadow-2xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isPlaying ? (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-8 bg-gray-900 rounded-sm" />
                            <div className="w-2 h-8 bg-gray-900 rounded-sm" />
                          </div>
                        ) : (
                          <Play className="w-10 h-10 md:w-12 md:h-12 text-gray-900 ml-1" fill="currentColor" />
                        )}
                      </motion.div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                    <div className="text-center p-8">
                      <Play className="w-16 h-16 md:w-20 md:h-20 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400" dir={isRtl ? "rtl" : "ltr"}>
                        {isRtl ? "سيتم إضافة رابط الفيديو قريباً" : "Video URL will be added soon"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Corner Accent */}
          <div
            className="absolute top-0 rounded-full right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #6366f1, transparent)",
              transform: "translate(30%, -30%)",
            }}
          />
        </div>
      </div>
    </motion.li>
  )
}

export function WhySultanAverroes() {
  const t = useTranslations("WhySultanAverroes")
  const locale = useLocale()
  const isRtl = locale === "ar"

  const features = t.raw("features") as Array<{
    number: string
    title: string
    description: string
  }>

  const featuresWithMetadata = features.map((feature, index) => ({
    ...feature,
    icon: featureIcons[index],
    ...featureColors[index],
  }))

  // Define grid areas similar to the example
  const gridAreas = [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
  ]

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-6 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-4 lg:gap-4 xl:max-h-[70rem] xl:grid-rows-3">
          {featuresWithMetadata.map((feature, index) => (
            <GridItem
              key={feature.number}
              area={gridAreas[index] || ""}
              feature={feature}
              isRtl={isRtl}
              index={index}
            />
          ))}
          <VideoCard isRtl={isRtl} index={featuresWithMetadata.length} />
        </ul>

      </div>
    </section>
  )
}

