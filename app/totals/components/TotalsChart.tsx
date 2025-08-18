'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceDot,
} from 'recharts';

interface TotalsChartProps {
    data: Array<any>;
    timeRange: '30d' | '52w' | '12m';
    height?: number | string;
}

export const TotalsChart: React.FC<TotalsChartProps> = ({ data, timeRange, height = "100%" }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
    const chartContainerRef = useRef<HTMLDivElement>(null);

    // Track mobile state and resize events
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const updateDimensions = () => {
            if (chartContainerRef.current) {
                // Dynamically calculate available height for optimal visualization
                const viewportHeight = window.innerHeight;
                const containerRect = chartContainerRef.current.getBoundingClientRect();
                const topPosition = containerRect.top;

                // Calculate optimal height based on viewport and position
                const availableHeight = Math.max(viewportHeight * 0.5, viewportHeight - topPosition - 100);

                setChartDimensions({
                    width: chartContainerRef.current.clientWidth,
                    height: typeof height === 'number' ? height : availableHeight
                });
            }
        };

        checkMobile();
        updateDimensions();

        window.addEventListener('resize', checkMobile);
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('resize', updateDimensions);
        };
    }, [height]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/95 backdrop-blur-sm p-3 border border-gray-200 shadow-lg rounded-md">
                    <p className="font-medium text-sm text-gray-700">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm mt-1">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span style={{ color: entry.color }} className="font-medium">{entry.name}</span>
                            <span className="text-gray-600">{entry.value} kWh</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Y-axis label configuration based on time range
    const getYAxisConfig = () => {
        // Dynamically calculate appropriate tick values based on data range
        const maxValue = Math.max(...data.map(item =>
            Math.max(item.load || 0, item.solarPV || 0, item.grid || 0)
        ));

        // Round up to a nice number for the y-axis
        const roundedMax = Math.ceil(maxValue / 100) * 100;
        const tickInterval = Math.max(Math.ceil(roundedMax / 6 / 100) * 100, 100);
        const customTicks = Array.from({ length: 6 }, (_, i) => i * tickInterval);

        switch (timeRange) {
            case '30d':
                return {
                    ticks: customTicks.length > 0 ? customTicks : [0, 20, 40, 60, 80, 100],
                    label: 'kWh'
                };
            case '52w':
            case '12m':
                return {
                    ticks: customTicks.length > 0 ? customTicks : [0, 200, 400, 600, 800, 1000],
                    label: 'kWh'
                };
            default:
                return {
                    ticks: customTicks.length > 0 ? customTicks : [0, 20, 40, 60, 80, 100],
                    label: 'kWh'
                };
        }
    };

    const yAxisConfig = getYAxisConfig();

    return (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm w-full" ref={chartContainerRef}>
            <div className="p-4">
                <div style={{ width: '100%', height: chartDimensions.height || '65vh', minHeight: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{
                                top: 20,
                                right: isMobile ? 10 : 30,
                                left: isMobile ? -15 : 0,
                                bottom: 10,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={!isMobile} />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: isMobile ? 10 : 12, fill: '#6b7280' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                                tickLine={false}
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                                tickCount={6}
                                ticks={yAxisConfig.ticks}
                                domain={[0, 'auto']}
                                tick={{ fontSize: isMobile ? 10 : 12, fill: '#6b7280' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                                tickLine={false}
                                width={45}
                                tickFormatter={(value) => `${value}`}
                                label={{
                                    value: yAxisConfig.label,
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: {
                                        textAnchor: 'middle',
                                        fill: '#6b7280',
                                        fontSize: 12
                                    },
                                    dy: 50,
                                    dx: -10
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                iconSize={10}
                                wrapperStyle={{ paddingTop: 10 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="load"
                                name="Load"
                                stroke="#6366f1"
                                fill="url(#colorLoad)"
                                strokeWidth={2}
                                activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 1, fill: '#ffffff' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="solarPV"
                                name="Solar PV"
                                stroke="#f59e0b"
                                fill="url(#colorSolar)"
                                strokeWidth={2}
                                activeDot={{ r: 6, stroke: '#d97706', strokeWidth: 1, fill: '#ffffff' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="grid"
                                name="Grid"
                                stroke="#ef4444"
                                fill="url(#colorGrid)"
                                strokeWidth={2}
                                activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 1, fill: '#ffffff' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
