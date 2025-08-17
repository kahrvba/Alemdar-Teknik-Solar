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
        <div className="min-h-screen p-2 sm:p-4 lg:p-6">
            <div className="w-full mx-auto space-y-6 sm:space-y-8">
                {/* Global Time Filter at the top */}
                <div className="flex justify-end items-end">
                    <TimeFilter
                        selectedTimeRange={selectedTimeRange}
                        selectedRefreshInterval={selectedRefreshInterval}
                        onTimeRangeChange={setSelectedTimeRange}
                        onRefreshIntervalChange={setSelectedRefreshInterval}
                        onRefresh={handleRefresh}
                    />
                </div>

                {/* Single Column Layout */}
                <div className="  space-y-8 sm:space-y-12">
                    {/* Battery Charts - Interactive Dashboard */}
                    <section className=" space-y-3 sm:space-y-4 ">

                        <BatteryCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />
                    </section>

                    {/* MPPT Charts */}
                    <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-6">
                        <MPPTCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />
                    </section>

                    {/* Battery System Charts */}
                    <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-6">
                        <BatterySystemCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />
                    </section>

                    {/* Grid and System Charts */}
                    <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-6">
                        <GridSystemCharts timeRange={selectedTimeRange} refreshKey={refreshKey} />
                    </section>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-xs sm:text-sm py-6 sm:py-8 px-4">
                    <p>Solar Assistant - Real-time monitoring system</p>
                    <p className="mt-1">Last updated: {new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}
