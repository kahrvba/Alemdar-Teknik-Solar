'use client'
import React, { ReactNode } from 'react';

interface ConfigSectionProps {
    title: string;
    children: ReactNode;
    actionButton?: {
        text: string;
        onClick: () => void;
        color?: string;
    };
}

export const ConfigSection: React.FC<ConfigSectionProps> = ({
    title,
    children,
    actionButton
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                {actionButton && (
                    <button
                        onClick={actionButton.onClick}
                        className={`px-3 py-1 ${actionButton.color || 'bg-blue-600'} text-white rounded-md hover:opacity-90 text-sm`}
                    >
                        {actionButton.text}
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};
