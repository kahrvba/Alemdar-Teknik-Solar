'use client';

import React, { useState, useCallback } from 'react';
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

// Generate proper 24-hour time data for battery power (in kW)
const generateBatteryPowerData = () => {
    const data = [];
    for (let hour = 0; hour < 24; hour++) {
        let value;
        if (hour >= 6 && hour <= 17) {
            // Daylight hours - charging (positive values)
            const peak = 12; // noon
            const distance = Math.abs(hour - peak);
            value = Math.max(0, (6 - distance) / 6) * 0.8 + Math.random() * 0.2;
        } else {
            // Night hours - discharging (negative values)
            value = -(0.1 + Math.random() * 0.4);
        }

        data.push({
            time: `${hour.toString().padStart(2, '0')}:00`,
            hour: hour,
            value: parseFloat(value.toFixed(3)),
            status: value > 0 ? 'Charging' : 'Discharging',
            power: Math.abs(value).toFixed(3)
        });
    }
    return data;
};

// Generate proper 24-hour time data for battery state of charge (%)
const generateBatteryStateData = () => {
    const data = [];
    let currentCharge = 95; // Start at 95%

    for (let hour = 0; hour < 24; hour++) {
        if (hour >= 6 && hour <= 17) {
            // Daylight hours - charging
            const chargeRate = Math.random() * 2 + 1; // 1-3% per hour
            currentCharge = Math.min(100, currentCharge + chargeRate);
        } else {
            // Night hours - discharging
            const dischargeRate = Math.random() * 3 + 2; // 2-5% per hour
            currentCharge = Math.max(10, currentCharge - dischargeRate);
        }

        data.push({
            time: `${hour.toString().padStart(2, '0')}:00`,
            hour: hour,
            value: parseInt(currentCharge.toString()),
            percentage: parseInt(currentCharge.toString())
        });
    }
    return data;
};

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

const batteryPowerData = generateBatteryPowerData();
const batteryStateData = generateBatteryStateData();

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
    const currentHour = new Date().getHours();
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:00`;

    const handleMouseMove = useCallback((data: any) => {
        if (data && data.activeTooltipIndex !== undefined) {
            setActiveIndex(data.activeTooltipIndex);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setActiveIndex(null);
    }, []);

    return (
        <div className="space-y-6">
            {/* Chart Title with enhanced styling */}
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
            </div>

            {/* Chart Container with enhanced spacing */}
            <div className="h-[320px] w-full bg-gradient-to-br from-gray-50/30 to-white rounded-xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 20, right: 40, left: 60, bottom: 80 }}
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

                        {/* X-Axis with all hours visible */}
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 11,
                                fill: '#6b7280',
                                fontWeight: 500
                            }}
                            interval={0} // Show all hours
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            tickMargin={15}
                        />

                        {/* Y-Axis with enhanced styling */}
                        <YAxis
                            domain={yAxisDomain}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 12,
                                fill: '#6b7280',
                                fontWeight: 500
                            }}
                            tickFormatter={(value) => `${value}${unit}`}
                            width={50}
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
                            dataKey="value"
                            stroke={type === 'power' ? '#10b981' : '#3b82f6'}
                            fill={type === 'power' ? '#dcfce7' : '#dbeafe'}
                            strokeWidth={3}
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

            {/* Enhanced Status Info */}
            <div className="flex justify-center space-x-8 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-600">Current Time</span>
                </div>
                {type === 'power' && (
                    <>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-gray-600">Charging</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <span className="text-gray-600">Discharging</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export const BatteryCharts: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Charts Container */}
            <div className="p-4 space-y-12">
                {/* Battery Power Chart */}
                <BatteryChart
                    title="Battery Power"
                    data={batteryPowerData}
                    yAxisDomain={[-1, 1]}
                    showReference={true}
                    type="power"
                    unit="kW"
                />

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Battery State of Charge Chart */}
                <BatteryChart
                    title="Battery State of Charge"
                    data={batteryStateData}
                    yAxisDomain={[0, 100]}
                    showReference={false}
                    type="charge"
                    unit="%"
                />
            </div>
        </div>
    );
};