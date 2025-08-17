'use client';

import React, { useState, useEffect } from 'react';
import { BatteryCharts } from './components/BatteryCharts';
import { MPPTCharts, BatterySystemCharts, GridSystemCharts } from './components/SolarCharts';
import { TimeFilter, TimeRange, TIME_RANGES, REFRESH_INTERVALS } from './components/TimeFilter';

export default function ChartsPage() {
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
        <div className="min-h-screen p-8 sm:p-4">
            <div className="w-full mx-auto space-y-4 sm:space-y-6 lg:space-y-8">

                {/* Global Time Filter - Full width on mobile */}
                <div className="w-full">
                    <TimeFilter
                        selectedTimeRange={selectedTimeRange}
                        selectedRefreshInterval={selectedRefreshInterval}
                        onTimeRangeChange={setSelectedTimeRange}
                        onRefreshIntervalChange={setSelectedRefreshInterval}
                        onRefresh={handleRefresh}
                    />
                </div>

                {/* Charts Layout - Seamless without containers */}
                <div className="space-y-10 sm:space-y-1 ">
                    {/* Battery Charts - Interactive Dashboard */}
                    <BatteryCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />

                    {/* MPPT Charts */}
                    <MPPTCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />

                    {/* Battery System Charts */}
                    <BatterySystemCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />

                    {/* Grid and System Charts */}
                    <GridSystemCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-xs sm:text-sm py-4 sm:py-6 px-2">
                    <p>Solar Assistant - Real-time monitoring system</p>
                    <p className="mt-1">Last updated: {new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}
