"use client";

import React from "react";
import { useId } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Database, Brain, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function HowItWorks() {
    const t = useTranslations("HowItWorks");
    const locale = useLocale();
    const isRtl = locale === "ar";
    const steps = t.raw("steps") as Array<{
        number: string;
        title: string;
        description?: string;
        features?: string[];
    }>;

    // Icons for each step
    const stepIcons = [Database, Brain, LayoutDashboard];

    return (
        <div className="py-20 lg:py-40 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className="relative bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-3xl overflow-hidden hover:border-blue-600/30 transition-all duration-300 group shadow-sm hover:shadow-md"
                        >
                            <Grid size={20} seed={index} />
                            <span className={cn("absolute top-12  w-6 text-9xl h-6 text-blue-600 font-bold opacity-10 flex items-center justify-center ", isRtl ? "left-20" : "right-20")}>
                                0{step.number}
                            </span>

                            {/* Decorative blue glow on hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/5 group-hover:to-blue-600/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                            {/* Step Number with Icon */}
                            <div className="relative z-20 mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 mb-4 group-hover:bg-blue-600/15 group-hover:border-blue-600/30 group-hover:scale-110 transition-all duration-300 relative">
                                    {React.createElement(stepIcons[index], {
                                        className: "w-7 h-7",
                                        strokeWidth: 2,
                                    })}

                                </div>
                            </div>

                            {/* Step Title */}
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 relative z-20 mb-4">
                                {step.title}
                            </h3>

                            {/* Step Description */}
                            {step.description && (
                                <p className="text-gray-600 text-base font-normal relative z-20 leading-relaxed">
                                    {step.description}
                                </p>
                            )}

                            {/* Step Features List */}
                            {step.features && step.features.length > 0 && (
                                <ul className="mt-4 space-y-2 relative z-20">
                                    {step.features.map((feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            className="text-gray-600 text-sm md:text-base flex items-start"
                                        >
                                            <span className={cn("text-blue-600  font-bold", isRtl ? "ml-2 " : "mr-2 ")}>•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Connector Line (for desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5 bg-gradient-to-r from-blue-600/50 to-transparent z-10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * Seeded random number generator for deterministic values
 */
function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export const Grid = ({
    pattern,
    size,
    seed = 0,
}: {
    pattern?: number[][];
    size?: number;
    seed?: number;
}) => {
    const generatePattern = (baseSeed: number): number[][] => {
        const patterns: number[][] = [];
        for (let i = 0; i < 5; i++) {
            const seed1 = baseSeed + i * 2;
            const seed2 = baseSeed + i * 2 + 1;
            const x = Math.floor(seededRandom(seed1) * 4) + 7;
            const y = Math.floor(seededRandom(seed2) * 6) + 1;
            patterns.push([x, y]);
        }
        return patterns;
    };

    const p = pattern ?? generatePattern(seed);
    return (
        <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-blue-600/5 to-blue-600/10 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full mix-blend-overlay fill-blue-600/5 stroke-blue-600/10"
                />
            </div>
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]: any, index: number) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}-${index}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}
