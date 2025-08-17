'use client'
import React, { useEffect, useState } from 'react';

interface CircularGaugeProps {
    value: number;
    label: string;
    unit: string;
    color: string;
    size?: number;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
    value,
    label,
    unit,
    color,
    size = 120
}) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const radius = 70;
    const strokeWidth = 5;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const maxValue = Math.max(5000, value * 1.2); // Dynamic max based on value
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (animatedValue / maxValue) * circumference;

    useEffect(() => {
        const duration = 1000; // Animation duration in ms
        const steps = 60; // Number of steps in the animation
        const stepDuration = duration / steps;
        const stepValue = value / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setAnimatedValue(prev => {
                const next = currentStep * stepValue;
                return next > value ? value : next;
            });

            if (currentStep >= steps) {
                clearInterval(timer);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    height={size}
                    width={size}
                    className="transform -rotate-90"
                >
                    {/* Background circle */}
                    <circle
                        stroke="#f3f4f6"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        r={normalizedRadius}
                        cx={size / 2}
                        cy={size / 2}
                        className="opacity-40"
                    />
                    {/* Progress circle */}
                    <circle
                        stroke={color}
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-in-out"
                        r={normalizedRadius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-semibold" style={{ color }}>
                            {Math.round(animatedValue)}
                        </span>
                        <span className="text-sm text-gray-500">{unit}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-2">
                <span className="text-sm font-medium text-gray-600">{label}</span>
            </div>
        </div>
    );
};