'use client';

import React from 'react';

interface TotalCardProps {
    title: string;
    value: string;
    unit?: string;
    description?: string;
    className?: string;
}

export const TotalCard: React.FC<TotalCardProps> = ({
    title,
    value,
    unit = 'kWh',
    description,
    className = '',
}) => {
    return (
        <div className={`bg-white rounded-lg border border-gray-100 shadow-sm p-4 sm:p-6 ${className}`}>
            <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-medium text-gray-500">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</span>
                    <span className="text-sm text-gray-500">{unit}</span>
                </div>
                {description && (
                    <p className="text-xs sm:text-sm text-gray-500">{description}</p>
                )}
            </div>
        </div>
    );
};
