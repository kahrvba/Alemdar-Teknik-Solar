'use client';

import React from 'react';

interface DataTableProps {
    data: Array<{
        period: string;
        load: string;
        solarPV: string;
        batteryCharged: string;
        batteryDischarged: string;
        gridUsed: string;
        gridExported: string;
    }>;
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm bg-white">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Period
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Load
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Solar PV
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Battery Charged
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Battery Discharged
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grid Used
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grid Exported
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {row.period}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                {row.load}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                {row.solarPV}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                {row.batteryCharged}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                {row.batteryDischarged}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                {row.gridUsed}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                {row.gridExported}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
