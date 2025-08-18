'use client';

import React from 'react';
import { BatteryMedium, Zap, Activity } from 'lucide-react';

interface PowerMetric {
    label: string;
    value: string | number;
    unit: string;
    icon?: React.ReactNode;
    color?: string;
}

interface PowerStatusProps {
    metrics?: PowerMetric[];
}

export const PowerStatus: React.FC<PowerStatusProps> = ({
    metrics = [
        {
            label: 'Current Output',
            value: 3.2,
            unit: 'kW',
            icon: <Zap className="w-5 h-5 text-amber-500" />,
            color: 'text-amber-500'
        },
        {
            label: 'Battery Status',
            value: 87,
            unit: '%',
            icon: <BatteryMedium className="w-5 h-5 text-green-500" />,
            color: 'text-green-500'
        },
        {
            label: 'Grid Status',
            value: 'Connected',
            unit: '',
            icon: <Activity className="w-5 h-5 text-blue-500" />,
            color: 'text-blue-500'
        }
    ]
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Power Status</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-4 flex flex-col">
                        <div className="flex items-center mb-2">
                            {metric.icon}
                            <span className="ml-2 text-sm text-gray-600">{metric.label}</span>
                        </div>
                        <div className="flex items-baseline">
                            <span className={`text-2xl font-bold ${metric.color || 'text-gray-800'}`}>
                                {metric.value}
                            </span>
                            {metric.unit && (
                                <span className="ml-1 text-gray-600">{metric.unit}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
