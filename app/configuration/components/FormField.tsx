'use client'
import React, { ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    children: ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children }) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">{label}</label>
            {children}
        </div>
    );
};

export const StaticField: React.FC<{ value: string | ReactNode }> = ({ value }) => {
    return (
        <div className="px-3 py-2 bg-gray-50 rounded-md">{value}</div>
    );
};

export const StatusIndicator: React.FC<{ status: string; color: string }> = ({ status, color }) => {
    return (
        <div className="flex items-center gap-2">
            <span className={`h-3 w-3 ${color} rounded-full`}></span>
            <span>{status}</span>
        </div>
    );
};
