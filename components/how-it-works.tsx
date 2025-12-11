"use client";

import React from "react";
import { useId } from "react";
import { useTranslations } from "next-intl";
import { Database, Brain, LayoutDashboard } from "lucide-react";

export function HowItWorks() {
    const t = useTranslations("HowItWorks");
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
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className="relative bg-card/50 backdrop-blur-sm border border-border p-8 rounded-3xl overflow-hidden hover:border-[hsl(25,100%,50%)]/30 transition-all duration-300 group"
                        >
                            <Grid size={20} />
                            <span className="absolute top-12 right-20 w-6 text-9xl h-6 text-[hsl(25,100%,50%)] font-bold opacity-10 flex items-center justify-center ">
                                0{step.number}
                            </span>
                         
                            {/* Decorative orange glow on hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(25,100%,50%)]/0 via-[hsl(25,100%,50%)]/0 to-[hsl(25,100%,50%)]/0 group-hover:from-[hsl(25,100%,50%)]/10 group-hover:via-[hsl(25,100%,50%)]/5 group-hover:to-[hsl(25,100%,50%)]/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                            {/* Step Number with Icon */}
                            <div className="relative z-20 mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(25,100%,50%)]/10 border border-[hsl(25,100%,50%)]/20 text-[hsl(25,100%,60%)] mb-4 group-hover:bg-[hsl(25,100%,50%)]/15 group-hover:border-[hsl(25,100%,50%)]/30 group-hover:scale-110 transition-all duration-300 relative">
                                    {React.createElement(stepIcons[index], {
                                        className: "w-7 h-7",
                                        strokeWidth: 2,
                                    })}

                                </div>
                            </div>

                            {/* Step Title */}
                            <h3 className="text-xl md:text-2xl font-bold text-foreground relative z-20 mb-4">
                                {step.title}
                            </h3>

                            {/* Step Description */}
                            {step.description && (
                                <p className="text-muted-foreground text-base font-normal relative z-20 leading-relaxed">
                                    {step.description}
                                </p>
                            )}

                            {/* Step Features List */}
                            {step.features && step.features.length > 0 && (
                                <ul className="mt-4 space-y-2 relative z-20">
                                    {step.features.map((feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            className="text-muted-foreground text-sm md:text-base flex items-start"
                                        >
                                            <span className="text-[hsl(25,100%,60%)] mr-2 mt-1 font-bold">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Connector Line (for desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5 bg-gradient-to-r from-[hsl(25,100%,50%)]/50 to-transparent z-10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const Grid = ({
    pattern,
    size,
}: {
    pattern?: number[][];
    size?: number;
}) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
        <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-[hsl(25,100%,50%)]/5 to-[hsl(25,100%,50%)]/10 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full mix-blend-overlay fill-[hsl(25,100%,50%)]/5 stroke-[hsl(25,100%,50%)]/10"
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
