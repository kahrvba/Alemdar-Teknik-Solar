'use client';

import React, { useState, useEffect, useRef } from 'react';

interface EnergyData {
    period: string;
    load: string;
    solarPV: string;
    batteryCharged: string;
    batteryDischarged: string;
    gridUsed: string;
    gridExported: string;
}

interface DetailedTableProps {
    data: EnergyData[];
    className?: string;
    title?: string;
    maxHeight?: string | number;
}

export const DetailedTable: React.FC<DetailedTableProps> = ({
    data,
    className = '',
    title,
    maxHeight = '60vh'
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className={`w-full ${className}`}>
            {title && (
                <h2 className="text-xl font-medium text-gray-900 mb-4">{title}</h2>
            )}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
                <div
                    ref={tableRef}
                    className="overflow-auto"
                    style={{
                        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#cbd5e1 #f1f5f9'
                    }}
                >
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-20">
                                    {!isMobile ? "Period" : ""}
                                </th>
                                <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Load
                                </th>
                                <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Solar PV
                                </th>
                                <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Battery<br className="hidden sm:inline" />
                                    {isMobile ? "" : "Charged"}
                                    {isMobile ? "Chg." : ""}
                                </th>
                                <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Battery<br className="hidden sm:inline" />
                                    {isMobile ? "" : "Discharged"}
                                    {isMobile ? "Disch." : ""}
                                </th>
                                <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Grid Used
                                </th>
                                <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Grid<br className="hidden sm:inline" />
                                    {isMobile ? "" : "Exported"}
                                    {isMobile ? "Exp." : ""}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 sticky left-0 whitespace-nowrap z-10" style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#f9fafb' }}>
                                        {row.period}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                        {row.load}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                        {row.solarPV}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                        {row.batteryCharged}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                        {row.batteryDischarged}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                        {row.gridUsed}
                                    </td>
                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                        {row.gridExported}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
