import React from 'react';

export const OverviewChart: React.FC = () => {
    const yAxisLabels = ['1', '0.750', '0.500', '0.250', '0', '-0.25', '-0.50', '-0.75', '-1'];
    const timeLabels = ['18:00', '22:00', '02:00', '06:00', '10:00', '14:00'];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 h-full w-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
            </div>

            {/* Chart area */}
            <div className="relative flex-1 w-full h-full min-h-[400px] bg-white pt-2 pb-8 px-14">
                {/* Grid lines */}
                <div className="absolute inset-y-2 left-14 right-0 flex flex-col justify-between">
                    {yAxisLabels.map((label, i) => (
                        <div key={i} className="w-full h-px bg-gray-100" />
                    ))}
                </div>

                {/* Vertical grid lines */}
                <div className="absolute inset-y-2 left-14 right-0 flex justify-between">
                    {timeLabels.map((_, i) => (
                        <div key={i} className="h-full w-px bg-gray-100" />
                    ))}
                </div>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2">
                    {yAxisLabels.map((label, i) => (
                        <div key={i} className="text-xs text-gray-500 -mt-1.5">{label}</div>
                    ))}
                </div>

                {/* No data message */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No data</span>
                </div>

                {/* Time labels */}
                <div className="absolute bottom-0 left-14 right-0 flex justify-between">
                    {timeLabels.map((time, i) => (
                        <div key={i} className="text-xs text-gray-500">{time}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};
