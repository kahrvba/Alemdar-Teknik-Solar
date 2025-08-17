import React from 'react';

interface BatteryStatusProps {
    voltage: number;
    percentage: number;
    rate: number;
}

export const BatteryStatus: React.FC<BatteryStatusProps> = ({
    voltage,
    percentage,
    rate
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <div className="w-8 h-12 border-2 border-gray-400 rounded-sm relative">
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-sm transition-all duration-300"
                            style={{ height: `${percentage}%` }}
                        />
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-gray-400 rounded-t-sm" />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">Battery</h3>
                    <p className="text-sm font-medium text-gray-800 mt-1">{voltage} V</p>
                    <p className="text-sm font-medium text-gray-800">{percentage} %</p>
                    <p className="text-xs text-green-600 font-medium mt-1">+{rate} %/hr</p>
                </div>
            </div>
        </div>
    );
};