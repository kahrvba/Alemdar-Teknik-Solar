'use client';

import React, { useState, useEffect } from 'react';
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
} from 'recharts';
import { TimeFilter, TimeRange, TIME_RANGES, REFRESH_INTERVALS } from './TimeFilter';
import {
    generateMPPTDataForTimeRange,
    generateBatteryDataForTimeRange,
    generateGridDataForTimeRange,
    generateSystemDataForTimeRange,
    DataPoint
} from './DataGenerators';

// Main Charts Container Component
export const SolarChartsWithFilter: React.FC = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(TIME_RANGES[7]); // Default to Last 24 hours
    const [selectedRefreshInterval, setSelectedRefreshInterval] = useState(REFRESH_INTERVALS[0]); // Default to Off
    const [refreshKey, setRefreshKey] = useState(0);

    // Auto refresh logic
    useEffect(() => {
        if (selectedRefreshInterval.seconds > 0) {
            const interval = setInterval(() => {
                setRefreshKey(prev => prev + 1);
            }, selectedRefreshInterval.seconds * 1000);

            return () => clearInterval(interval);
        }
    }, [selectedRefreshInterval.seconds]);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="space-y-6">
            <TimeFilter
                selectedTimeRange={selectedTimeRange}
                selectedRefreshInterval={selectedRefreshInterval}
                onTimeRangeChange={setSelectedTimeRange}
                onRefreshIntervalChange={setSelectedRefreshInterval}
                onRefresh={handleRefresh}
            />

            <div className="space-y-8">
                <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-6">
                    <MPPTCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />
                </section>
                <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-6">
                    <BatterySystemCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />
                </section>
                <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-6">
                    <GridSystemCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />
                </section>
            </div>
        </div>
    );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, unit = '', suffix = '' }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3">
                <div className="font-semibold text-gray-900 mb-1 text-sm">
                    {label}
                </div>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-gray-700">
                            {entry.value}{unit}{suffix}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// Base Chart Component
interface BaseChartProps {
    title: string;
    data: any[];
    dataKey: string;
    yAxisDomain?: [number, number];
    unit?: string;
    color?: string;
    showReference?: boolean;
    referenceValue?: number;
    height?: number;
}

const BaseChart: React.FC<BaseChartProps> = ({
    title,
    data,
    dataKey,
    yAxisDomain,
    unit = '',
    color = '#3b82f6',
    showReference = false,
    referenceValue = 0,
    height = 200
}) => {
    const currentHour = new Date().getHours();
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:00`;
    const [isMobile, setIsMobile] = useState(false);

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

    // Determine if we should use area chart based on data characteristics
    const hasNegativeValues = data.some(item => item[dataKey] < 0);
    const shouldShowArea = !hasNegativeValues;

    // Adjust height for mobile devices
    const mobileHeight = isMobile ? height * 0.8 : height;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-4" style={{ height: mobileHeight + 60 }}>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-3 text-center">{title}</h3>
            <div style={{ height: mobileHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                    {shouldShowArea ? (
                        <AreaChart data={data} margin={isMobile
                            ? { top: 5, right: 5, left: 5, bottom: 20 }
                            : { top: 5, right: 10, left: 10, bottom: 25 }}>
                            <CartesianGrid strokeDasharray="2 2" stroke="#e5e7eb" strokeOpacity={0.5} />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: isMobile ? 7 : 8, fill: '#6b7280' }}
                                interval={isMobile ? 'preserveStartEnd' : 0} // Fewer ticks on mobile
                                angle={-45}
                                textAnchor="end"
                                height={isMobile ? 30 : 40}
                            />
                            <YAxis
                                domain={yAxisDomain}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: isMobile ? 7 : 8, fill: '#6b7280' }}
                                tickFormatter={(value) => `${value}${unit}`}
                                width={isMobile ? 30 : 35}
                            />
                            {showReference && (
                                <ReferenceLine
                                    y={referenceValue}
                                    stroke="#374151"
                                    strokeDasharray="2 2"
                                    strokeOpacity={0.7}
                                />
                            )}
                            <ReferenceLine
                                x={currentTimeString}
                                stroke="#dc2626"
                                strokeDasharray="3 3"
                                strokeOpacity={0.8}
                            />
                            <Area
                                type="monotone"
                                dataKey={dataKey}
                                stroke={color}
                                fill={`${color}20`}
                                strokeWidth={isMobile ? 1.5 : 2}
                                dot={false}
                            />
                            <Tooltip content={<CustomTooltip unit={unit} />} />
                        </AreaChart>
                    ) : (
                        <LineChart data={data} margin={isMobile
                            ? { top: 5, right: 5, left: 5, bottom: 20 }
                            : { top: 5, right: 10, left: 10, bottom: 25 }}>
                            <CartesianGrid strokeDasharray="2 2" stroke="#e5e7eb" strokeOpacity={0.5} />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: isMobile ? 7 : 8, fill: '#6b7280' }}
                                interval={isMobile ? 'preserveStartEnd' : 0} // Fewer ticks on mobile
                                angle={-45}
                                textAnchor="end"
                                height={isMobile ? 30 : 40}
                            />
                            <YAxis
                                domain={yAxisDomain}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: isMobile ? 7 : 8, fill: '#6b7280' }}
                                tickFormatter={(value) => `${value}${unit}`}
                                width={isMobile ? 30 : 35}
                            />
                            {showReference && (
                                <ReferenceLine
                                    y={referenceValue}
                                    stroke="#374151"
                                    strokeDasharray="2 2"
                                    strokeOpacity={0.7}
                                />
                            )}
                            <ReferenceLine
                                x={currentTimeString}
                                stroke="#dc2626"
                                strokeDasharray="3 3"
                                strokeOpacity={0.8}
                            />
                            <Line
                                type="monotone"
                                dataKey={dataKey}
                                stroke={color}
                                strokeWidth={isMobile ? 1.5 : 2}
                                dot={false}
                                activeDot={{ r: isMobile ? 3 : 4, stroke: color, strokeWidth: 2, fill: '#fff' }}
                            />
                            <Tooltip content={<CustomTooltip unit={unit} />} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
            <div className="mt-1 sm:mt-2 text-center">
                <span className="text-[10px] sm:text-xs text-gray-500">No data</span>
            </div>
        </div>
    );
};

// MPPT Charts Component
export const MPPTCharts: React.FC<{ timeRange: TimeRange; refreshKey: number }> = ({ timeRange, refreshKey }) => {
    const [mppt1Data, setMppt1Data] = useState<DataPoint[]>([]);
    const [mppt2Data, setMppt2Data] = useState<DataPoint[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMppt1Data(generateMPPTDataForTimeRange(timeRange, 1));
        setMppt2Data(generateMPPTDataForTimeRange(timeRange, 2));

        // Detect if on mobile device
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
        <div className="space-y-3 sm:space-y-6">
            <div className="text-center">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">MPPT Monitoring</h2>
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mt-1 sm:mt-2"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6">
                {/* MPPT 1 */}
                <BaseChart
                    title="MPPT 1 voltage"
                    data={mppt1Data}
                    dataKey="voltage"
                    unit="V"
                    color="#f59e0b"
                    yAxisDomain={[0, 60]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="MPPT 1 current"
                    data={mppt1Data}
                    dataKey="current"
                    unit="A"
                    color="#3b82f6"
                    yAxisDomain={[0, 20]}
                    height={isMobile ? 160 : 200}
                />

                {/* MPPT 2 */}
                <BaseChart
                    title="MPPT 2 voltage"
                    data={mppt2Data}
                    dataKey="voltage"
                    unit="V"
                    color="#f59e0b"
                    yAxisDomain={[0, 60]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="MPPT 2 current"
                    data={mppt2Data}
                    dataKey="current"
                    unit="A"
                    color="#3b82f6"
                    yAxisDomain={[0, 20]}
                    height={isMobile ? 160 : 200}
                />

                {/* Power Charts */}
                <BaseChart
                    title="MPPT 1 power"
                    data={mppt1Data}
                    dataKey="power"
                    unit="kW"
                    color="#10b981"
                    yAxisDomain={[0, 1]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="MPPT 2 power"
                    data={mppt2Data}
                    dataKey="power"
                    unit="kW"
                    color="#10b981"
                    yAxisDomain={[0, 1]}
                    height={isMobile ? 160 : 200}
                />
            </div>
        </div>
    );
};

// Battery System Charts
export const BatterySystemCharts: React.FC<{ timeRange: TimeRange; refreshKey: number }> = ({ timeRange, refreshKey }) => {
    const [batteryData, setBatteryData] = useState<DataPoint[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setBatteryData(generateBatteryDataForTimeRange(timeRange));

        // Detect if on mobile device
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
        <div className="space-y-3 sm:space-y-6">
            <div className="text-center">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Battery System</h2>
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mt-1 sm:mt-2"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6">
                <BaseChart
                    title="Battery voltage"
                    data={batteryData}
                    dataKey="voltage"
                    unit="V"
                    color="#10b981"
                    yAxisDomain={[45, 55]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="Battery temperature"
                    data={batteryData}
                    dataKey="temperature"
                    unit="°C"
                    color="#f59e0b"
                    yAxisDomain={[15, 40]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="Battery current"
                    data={batteryData}
                    dataKey="current"
                    unit="A"
                    color="#3b82f6"
                    showReference={true}
                    referenceValue={0}
                    yAxisDomain={[-15, 15]}
                    height={isMobile ? 160 : 200}
                />
            </div>
        </div>
    );
};

// Grid and System Charts
export const GridSystemCharts: React.FC<{ timeRange: TimeRange; refreshKey: number }> = ({ timeRange, refreshKey }) => {
    const [gridData, setGridData] = useState<DataPoint[]>([]);
    const [systemData, setSystemData] = useState<DataPoint[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setGridData(generateGridDataForTimeRange(timeRange));
        setSystemData(generateSystemDataForTimeRange(timeRange));

        // Detect if on mobile device
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
        <div className="space-y-3 sm:space-y-6">
            <div className="text-center">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Grid & System Monitoring</h2>
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-1 sm:mt-2"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6">
                <BaseChart
                    title="Grid voltage"
                    data={gridData}
                    dataKey="voltage"
                    unit="V"
                    color="#8b5cf6"
                    yAxisDomain={[200, 250]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="Grid frequency"
                    data={gridData}
                    dataKey="frequency"
                    unit="Hz"
                    color="#06b6d4"
                    yAxisDomain={[49.5, 50.5]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="Load power"
                    data={systemData}
                    dataKey="loadPower"
                    unit="kW"
                    color="#ef4444"
                    yAxisDomain={[0, 4]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="Bus voltage"
                    data={systemData}
                    dataKey="busVoltage"
                    unit="V"
                    color="#6366f1"
                    yAxisDomain={[350, 450]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="AC output voltage"
                    data={systemData}
                    dataKey="acVoltage"
                    unit="V"
                    color="#84cc16"
                    yAxisDomain={[200, 250]}
                    height={isMobile ? 160 : 200}
                />
                <BaseChart
                    title="Inverter temperature"
                    data={systemData}
                    dataKey="inverterTemp"
                    unit="°C"
                    color="#f97316"
                    yAxisDomain={[20, 60]}
                    height={isMobile ? 160 : 200}
                />
            </div>
        </div>
    );
};
