'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine,
    Area,
    AreaChart,
    Tooltip,
    Dot,
} from 'recharts';
import { TimeRange } from './TimeFilter';
import { generateBatteryDataForTimeRange } from './DataGenerators';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, type }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4 transition-all duration-200">
                <div className="font-semibold text-gray-900 mb-2">
                    {label} ({data.hour}:00)
                </div>
                {type === 'power' ? (
                    <div className="space-y-1">
                        <div className={`flex items-center gap-2 ${data.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <div className={`w-3 h-3 rounded-full ${data.value > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="font-medium">{data.status}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            Power: {data.power} kW
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-600">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="font-medium">State of Charge</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            Level: {data.percentage}%
                        </div>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

// Custom Dot Component for interactive cursor
const CustomDot = ({ cx, cy, payload }: any) => {
    return (
        <Dot
            cx={cx}
            cy={cy}
            r={6}
            fill="#ffffff"
            stroke="#3b82f6"
            strokeWidth={3}
            className="drop-shadow-lg"
        />
    );
};

const BatteryChart = ({
    title,
    data,
    yAxisDomain,
    showReference = false,
    type = 'default',
    unit = '',
    gradient = false
}: {
    title: string;
    data: any[];
    yAxisDomain: [number, number];
    showReference?: boolean;
    type?: 'power' | 'charge' | 'default';
    unit?: string;
    gradient?: boolean;
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const currentHour = new Date().getHours();
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:00`;

    // Detect if on mobile device
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const handleMouseMove = useCallback((data: any) => {
        if (data && data.activeTooltipIndex !== undefined) {
            setActiveIndex(data.activeTooltipIndex);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setActiveIndex(null);
    }, []);

    return (
        <div className="space-y-3 sm:space-y-6">
            {/* Chart Title with enhanced styling */}
            <div className="text-center space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">{title}</h3>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
            </div>

            {/* Chart Container with enhanced spacing - more compact on mobile */}
            <div className="h-[250px] sm:h-[320px] w-full p-2 sm:p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={isMobile 
                            ? { top: 10, right: 10, left: 25, bottom: 60 } 
                            : { top: 20, right: 40, left: 60, bottom: 80 }
                        }
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Enhanced Grid */}
                        <CartesianGrid
                            strokeDasharray="2 4"
                            stroke="#e5e7eb"
                            strokeOpacity={0.6}
                            horizontal={true}
                            vertical={true}
                        />

                        {/* X-Axis with limited ticks on mobile */}
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: isMobile ? 9 : 11,
                                fill: '#6b7280',
                                fontWeight: 500
                            }}
                            interval={isMobile ? 'preserveStartEnd' : 0} // Show fewer points on mobile
                            angle={-45}
                            textAnchor="end"
                            height={isMobile ? 60 : 80}
                            tickMargin={isMobile ? 10 : 15}
                        />

                        {/* Y-Axis with enhanced styling */}
                        <YAxis
                            domain={yAxisDomain}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: isMobile ? 10 : 12,
                                fill: '#6b7280',
                                fontWeight: 500
                            }}
                            tickFormatter={(value) => `${value}${unit}`}
                            width={isMobile ? 35 : 50}
                        />

                        {/* Reference line for power chart */}
                        {showReference && (
                            <ReferenceLine
                                y={0}
                                stroke="#374151"
                                strokeDasharray="4 4"
                                strokeWidth={1.5}
                                strokeOpacity={0.7}
                            />
                        )}

                        {/* Current time indicator */}
                        <ReferenceLine
                            x={currentTimeString}
                            stroke="#dc2626"
                            strokeDasharray="6 3"
                            strokeWidth={2}
                            strokeOpacity={0.8}
                        />

                        {/* Main Area Chart */}
                        <Area
                            type="monotone"
                            dataKey={type === 'power' ? 'power' : 'stateOfCharge'}
                            stroke={type === 'power' ? '#10b981' : '#3b82f6'}
                            fill={type === 'power' ? '#dcfce7' : '#dbeafe'}
                            strokeWidth={isMobile ? 2 : 3}
                            fillOpacity={0.6}
                            dot={false}
                            activeDot={<CustomDot />}
                        />

                        {/* Interactive Tooltip */}
                        <Tooltip
                            content={<CustomTooltip type={type} />}
                            cursor={{
                                stroke: '#6366f1',
                                strokeWidth: 2,
                                strokeDasharray: '4 4'
                            }}
                            animationDuration={200}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Enhanced Status Info - adjusted for mobile */}
            <div className="flex flex-wrap justify-center space-x-3 sm:space-x-8 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-600">Current Time</span>
                </div>
                {type === 'power' && (
                    <>
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                            <span className="text-gray-600">Charging</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                            <span className="text-gray-600">Discharging</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export const BatteryCharts: React.FC<{ timeRange: TimeRange; refreshKey: number }> = ({ timeRange, refreshKey }) => {
    const [batteryData, setBatteryData] = useState<any[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const data = generateBatteryDataForTimeRange(timeRange);
        setBatteryData(data);

        // Check if on mobile
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, [timeRange, refreshKey]);

    return (
        <div className="space-y-6 sm:space-y-12">

            
            
            {/* Battery Power Chart */}
            <BatteryChart
                title="Battery Power"
                data={batteryData}
                yAxisDomain={[-1, 1]}
                showReference={true}
                type="power"
                unit="kW"
            />

            {/* Divider - thinner on mobile */}
            <div className="border-t border-gray-200 my-4 sm:m-8"></div>

            {/* Battery State of Charge Chart */}
            <BatteryChart
                title="Battery State of Charge"
                data={batteryData}
                yAxisDomain={[0, 100]}
                showReference={false}
                type="charge"
                unit="%"
            />
        </div>
    );
};