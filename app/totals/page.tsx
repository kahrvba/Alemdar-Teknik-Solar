'use client';

import React, { useState, useEffect } from 'react';
import { TotalsChart } from './components/TotalsChart';
import { DetailedTable } from './components/DetailedTable';

// Function to generate dynamic dates for the chart data
const generateDynamicDates = () => {
    const today = new Date();

    // Generate 30 days data for each of the past 30 days
    const chartData30d = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(date);

        // Generate realistic-looking values with some randomization around a baseline
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        // Create some patterns - weekends have different usage patterns
        const loadBase = isWeekend
            ? 15 + Math.floor(Math.random() * 10)
            : 8 + Math.floor(Math.random() * 12);

        // Solar generation depends on weather patterns - create some cloudy days
        const isCloudy = Math.random() > 0.7;
        const solarPVBase = isCloudy
            ? 5 + Math.floor(Math.random() * 10)
            : 15 + Math.floor(Math.random() * 25);

        // Grid usage happens only occasionally when solar isn't enough
        const gridBase = solarPVBase < loadBase
            ? Math.ceil(Math.max(0, loadBase - solarPVBase) * (0.8 + Math.random() * 0.4))
            : 0;

        chartData30d.push({
            name: formattedDate,
            load: loadBase,
            solarPV: solarPVBase,
            grid: gridBase
        });
    }

    // Generate 52 weeks data (past year with bi-monthly intervals)
    const chartData52w = [];
    for (let i = 5; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i * 2);
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(date);

        // Season-aware value generation (higher load in winter, higher solar in summer)
        const monthIndex = date.getMonth();
        const isSummer = monthIndex >= 4 && monthIndex <= 8; // May to September

        const loadBase = isSummer ? 100 + Math.floor(Math.random() * 250) : 300 + Math.floor(Math.random() * 400);
        const solarPVBase = isSummer ? 200 + Math.floor(Math.random() * 300) : 100 + Math.floor(Math.random() * 200);
        const gridBase = isSummer ? Math.floor(Math.random() * 180) : 150 + Math.floor(Math.random() * 400);

        chartData52w.push({
            name: formattedDate,
            load: loadBase,
            solarPV: solarPVBase,
            grid: gridBase
        });
    }

    return { chartData30d, chartData52w };
};

// Generate table data with dynamic dates
const generateTableData = () => {
    const today = new Date();

    // Generate daily data for the last 30 days
    const dailyData = [];
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(date);

        // Create patterns in the data
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const hasData = i < 20; // First 20 days have data, older days might have zeroes

        // Create some weather patterns
        const isCloudy = Math.random() > 0.7;
        const solarValue = hasData ?
            (isCloudy ? (5 + Math.random() * 15) : (20 + Math.random() * 80)).toFixed(1) :
            '0';

        // Create load patterns (weekends have different usage)
        const loadValue = hasData ?
            (isWeekend ? (10 + Math.random() * 15) : (7 + Math.random() * 12)).toFixed(1) :
            '0';

        // Battery charging depends on solar generation
        const batteryChargedValue = hasData && parseFloat(solarValue) > parseFloat(loadValue) ?
            (Math.min(parseFloat(solarValue) - parseFloat(loadValue), 25) * (0.7 + Math.random() * 0.3)).toFixed(1) :
            '0';

        // Battery discharging happens when load exceeds solar
        const batteryDischargedValue = hasData && parseFloat(solarValue) < parseFloat(loadValue) ?
            (Math.min(parseFloat(loadValue) - parseFloat(solarValue), 15) * (0.6 + Math.random() * 0.4)).toFixed(1) :
            '0';

        // Grid used when both solar and battery can't meet demand
        const gridUsedValue = hasData &&
            parseFloat(solarValue) + parseFloat(batteryDischargedValue) < parseFloat(loadValue) ?
            (parseFloat(loadValue) - parseFloat(solarValue) - parseFloat(batteryDischargedValue)).toFixed(1) :
            '0';

        dailyData.push({
            period: formattedDate,
            load: `${loadValue} kWh`,
            solarPV: `${solarValue} kWh`,
            batteryCharged: `${batteryChargedValue} kWh`,
            batteryDischarged: `${batteryDischargedValue} kWh`,
            gridUsed: `${gridUsedValue} kWh`,
            gridExported: '0 kWh'
        });
    }

    // Generate monthly data for the past year
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIndex = today.getMonth();

    const monthlyData = [];
    for (let i = 0; i < 12; i++) {
        const monthIndex = (currentMonthIndex - i + 12) % 12;
        const monthName = monthNames[monthIndex];

        // Season-aware value generation
        const isSummer = monthIndex >= 4 && monthIndex <= 8; // May to September
        const isWinter = monthIndex <= 1 || monthIndex >= 10; // November to February

        let loadBase, solarPVBase, batteryChargedBase, batteryDischargedBase, gridUsedBase;

        if (isSummer) {
            loadBase = 100 + Math.floor(Math.random() * 500);
            solarPVBase = 300 + Math.floor(Math.random() * 800);
            batteryChargedBase = 200 + Math.floor(Math.random() * 500);
            batteryDischargedBase = 50 + Math.floor(Math.random() * 300);
            gridUsedBase = Math.random() > 0.7 ? Math.floor(Math.random() * 50) : 0;
        } else if (isWinter) {
            loadBase = 1500 + Math.floor(Math.random() * 1500);
            solarPVBase = 400 + Math.floor(Math.random() * 300);
            batteryChargedBase = 400 + Math.floor(Math.random() * 400);
            batteryDischargedBase = 300 + Math.floor(Math.random() * 350);
            gridUsedBase = 700 + Math.floor(Math.random() * 1800);
        } else {
            loadBase = 400 + Math.floor(Math.random() * 300);
            solarPVBase = 500 + Math.floor(Math.random() * 600);
            batteryChargedBase = 200 + Math.floor(Math.random() * 2000);
            batteryDischargedBase = 100 + Math.floor(Math.random() * 200);
            gridUsedBase = 50 + Math.floor(Math.random() * 300);
        }

        monthlyData.push({
            period: monthName,
            load: `${loadBase} kWh`,
            solarPV: `${solarPVBase} kWh`,
            batteryCharged: `${batteryChargedBase} kWh`,
            batteryDischarged: `${batteryDischargedBase} kWh`,
            gridUsed: `${gridUsedBase} kWh`,
            gridExported: '0 kWh'
        });
    }

    return { dailyData, monthlyData };
};

// Generate the dynamic data
const { chartData30d, chartData52w } = generateDynamicDates();
const { dailyData, monthlyData } = generateTableData();

const TotalsPage = () => {
    const [timeRange, setTimeRange] = useState<'30d' | '52w' | '12m'>('30d');
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        // Set initial window height and update on resize
        const updateWindowHeight = () => {
            setWindowHeight(window.innerHeight);
        };

        updateWindowHeight();
        window.addEventListener('resize', updateWindowHeight);
        return () => window.removeEventListener('resize', updateWindowHeight);
    }, []);

    // Get the appropriate data based on selected time range
    const getChartData = () => {
        switch (timeRange) {
            case '30d':
                return chartData30d;
            case '52w':
            case '12m':
                return chartData52w;
            default:
                return chartData30d;
        }
    };

    // Get the appropriate table data based on selected time range
    const getTableData = () => {
        switch (timeRange) {
            case '30d':
                return dailyData;
            case '52w':
            case '12m':
                return monthlyData;
            default:
                return dailyData;
        }
    };

    // Get the title based on selected time range
    const getTimeRangeTitle = () => {
        switch (timeRange) {
            case '30d':
                return 'Last 30 days';
            case '52w':
                return 'Last 52 weeks';
            case '12m':
                return 'Last 12 months';
            default:
                return 'Last 30 days';
        }
    };

    return (
        <div className="w-full px-2 sm:px-4 py-4 sm:py-6 space-y-6">
            {/* Layout grid for 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6" style={{ minHeight: windowHeight * 0.7 }}>
                {/* Left column with chart */}
                <div className="flex flex-col h-full">
                    <div className="mb-3 sm:mb-4">
                        <h2 className="text-xl font-medium text-gray-900">{getTimeRangeTitle()}</h2>
                    </div>

                    <div className="mb-3">
                        {/* Time Range Selector */}
                        <div className="flex flex-wrap gap-1 sm:gap-2 bg-gray-100 p-1 rounded-lg w-fit">
                            {[
                                { label: 'Last 30 Days', value: '30d' },
                                { label: 'Last 52 Weeks', value: '52w' },
                                { label: 'Last 12 Months', value: '12m' },
                            ].map((range) => (
                                <button
                                    key={range.value}
                                    onClick={() => setTimeRange(range.value as any)}
                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors
                    ${timeRange === range.value
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Energy Chart - flex-grow to make it fill available space */}
                    <div className="flex-grow">
                        <TotalsChart
                            data={getChartData()}
                            timeRange={timeRange}
                        />
                    </div>
                </div>

                {/* Right column with table */}
                <div className="h-full flex flex-col">
                    <DetailedTable
                        data={getTableData()}
                        title={getTimeRangeTitle()}
                        maxHeight={windowHeight * 0.65}
                        className="flex-grow"
                    />
                </div>
            </div>

            {/* Notes */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-xs sm:text-sm text-gray-600 mt-6">
                <h3 className="font-medium text-gray-900">The following affects the numbers you see above:</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>The power used by the inverter(s) themselves are not included in the total load, but is supplied from either grid or solar PV.</li>
                    <li>A battery doesn't discharge the same amount of kWh it took to charge it due to battery efficiency.</li>
                    <li>Depending on your inverter model, measurements isn't perfectly accurate. Some are far from it.</li>
                </ul>
            </div>
        </div>
    );
};

export default TotalsPage;
