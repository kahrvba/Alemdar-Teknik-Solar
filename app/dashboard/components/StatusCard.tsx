import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatusCardProps {
    title: string;
    subtitle?: string | React.ReactNode;
    value?: string | React.ReactNode;
    icon: React.ReactNode;
    bgColor?: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({
    title,
    subtitle,
    value,
    icon,
    bgColor = 'bg-gray-100'
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
                <div className={`${bgColor} rounded-lg p-2 sm:p-3 flex items-center justify-center flex-shrink-0`}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{title}</h3>
                    {subtitle && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
                    )}
                    {value && (
                        <p className="text-sm sm:text-base font-medium text-gray-800 mt-1">{value}</p>
                    )}
                </div>
            </div>
        </div>
    );
};