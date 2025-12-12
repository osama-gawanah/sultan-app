"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function LeadershipSection() {
    const t = useTranslations("LeadershipSection")
    const leaders = t.raw("leaders") as Array<{ name: string; role: string, img: string }>
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })

    return (
        <section className="relative w-full px-5 py-20 md:py-32  flex justify-center items-center ">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-600/3 rounded-full blur-[100px]" />
            </div>

            <div ref={containerRef} className="relative z-10 w-full flex flex-col gap-16 md:gap-24">
                {/* Section Header - Large Statement Typography */}
                <div className="text-center space-y-6 px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center text-gray-900 text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]"
                    >
                        {t("title")}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="self-stretch text-center text-gray-600 text-sm md:text-sm lg:text-base font-medium leading-[18.20px] md:leading-relaxed lg:leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>



                {/* Leadership Grid - Premium Card Design */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {leaders.map((leader, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2 + index * 0.15,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="group relative"
                        >
                            {/* Card Container */}
                            <div className="relative h-full overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border border-blue-200 transition-all duration-500 hover:border-blue-600/50 hover:bg-white/90 shadow-sm hover:shadow-md">
                                {/* Image Section */}
                                <div className="relative w-full aspect-[3/4] overflow-hidden">
                                    <Image
                                        src={leader.img}
                                        alt={leader.name}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                    {/* Dark Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                                    {/* Accent Border on Hover */}
                                    <div className="absolute inset-0 border-2 border-blue-600/0 group-hover:border-blue-600/30 rounded-3xl transition-all duration-500" />
                                </div>
                                <div className="inline-flex absolute top-4 left-4 items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-blue-600/30">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                    <span className="text-xs font-medium tracking-wide text-blue-600">
                                        {leader.role}
                                    </span>
                                </div>
                                {/* Content Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-6 space-y-3">
                                    {/* Title - Name */}
                                    <p className="text-lg text-white tracking-wide uppercase">{leader.name}</p>

                                    {/* Decorative Line */}
                                    <div className="pt-2">
                                        <div className="h-[1px] w-0 bg-gradient-to-r from-blue-600 to-transparent group-hover:w-full transition-all duration-700" />
                                    </div>
                                </div>

                                {/* Corner Accent */}
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-600/0 group-hover:border-blue-600/50 rounded-tr-2xl transition-all duration-500" />
                            </div>

                            {/* Glow Effect on Hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-blue-600/10 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    )
}
