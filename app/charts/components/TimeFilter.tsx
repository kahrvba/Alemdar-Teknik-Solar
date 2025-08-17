'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Clock, Calendar, RotateCcw } from 'lucide-react';

export interface TimeRange {
    label: string;
    value: string;
    minutes: number;
    intervalMinutes: number;
}

export const TIME_RANGES: TimeRange[] = [
    { label: 'Last 5 minutes', value: '5m', minutes: 5, intervalMinutes: 1 },
    { label: 'Last 15 minutes', value: '15m', minutes: 15, intervalMinutes: 1 },
    { label: 'Last 30 minutes', value: '30m', minutes: 30, intervalMinutes: 2 },
    { label: 'Last 1 hour', value: '1h', minutes: 60, intervalMinutes: 5 },
    { label: 'Last 3 hours', value: '3h', minutes: 180, intervalMinutes: 15 },
    { label: 'Last 6 hours', value: '6h', minutes: 360, intervalMinutes: 30 },
    { label: 'Last 12 hours', value: '12h', minutes: 720, intervalMinutes: 30 },
    { label: 'Last 24 hours', value: '24h', minutes: 1440, intervalMinutes: 60 },
    { label: 'Last 2 days', value: '2d', minutes: 2880, intervalMinutes: 120 },
    { label: 'Last 7 days', value: '7d', minutes: 10080, intervalMinutes: 360 },
];

export const REFRESH_INTERVALS = [
    { label: 'Off', value: 'off', seconds: 0 },
    { label: '10s', value: '10s', seconds: 10 },
    { label: '30s', value: '30s', seconds: 30 },
    { label: '1m', value: '1m', seconds: 60 },
    { label: '5m', value: '5m', seconds: 300 },
    { label: '15m', value: '15m', seconds: 900 },
    { label: '30m', value: '30m', seconds: 1800 },
    { label: '1h', value: '1h', seconds: 3600 },
    { label: '2h', value: '2h', seconds: 7200 },
    { label: '1d', value: '1d', seconds: 86400 },
];

interface TimeFilterProps {
    selectedTimeRange: TimeRange;
    selectedRefreshInterval: typeof REFRESH_INTERVALS[0];
    onTimeRangeChange: (timeRange: TimeRange) => void;
    onRefreshIntervalChange: (interval: typeof REFRESH_INTERVALS[0]) => void;
    onRefresh: () => void;
}

export const TimeFilter: React.FC<TimeFilterProps> = ({
    selectedTimeRange,
    selectedRefreshInterval,
    onTimeRangeChange,
    onRefreshIntervalChange,
    onRefresh,
}) => {
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const [isRefreshDropdownOpen, setIsRefreshDropdownOpen] = useState(false);
    const [customFrom, setCustomFrom] = useState('');
    const [customTo, setCustomTo] = useState('');
    const [isCustomMode, setIsCustomMode] = useState(false);

    const timeDropdownRef = useRef<HTMLDivElement>(null);
    const refreshDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
                setIsTimeDropdownOpen(false);
            }
            if (refreshDropdownRef.current && !refreshDropdownRef.current.contains(event.target as Node)) {
                setIsRefreshDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCustomTimeApply = () => {
        if (customFrom && customTo) {
            const fromDate = new Date(customFrom);
            const toDate = new Date(customTo);
            const diffMinutes = Math.abs(toDate.getTime() - fromDate.getTime()) / (1000 * 60);

            const customRange: TimeRange = {
                label: `Custom (${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()})`,
                value: 'custom',
                minutes: diffMinutes,
                intervalMinutes: Math.max(1, Math.floor(diffMinutes / 100))
            };

            onTimeRangeChange(customRange);
            setIsTimeDropdownOpen(false);
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
                {/* Time Range Selector */}
                <div className="relative flex-1 sm:flex-none" ref={timeDropdownRef}>
                    <button
                        onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                        className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="hidden sm:inline">{selectedTimeRange.label}</span>
                            <span className="sm:hidden text-xs">{selectedTimeRange.value}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                    {isTimeDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                            <div className="p-3 sm:p-4">
                                {/* Tabs */}
                                <div className="flex border-b border-gray-200 mb-3 sm:mb-4">
                                    <button
                                        onClick={() => setIsCustomMode(false)}
                                        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium ${!isCustomMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                    >
                                        Relative
                                    </button>
                                    <button
                                        onClick={() => setIsCustomMode(true)}
                                        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium ${isCustomMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                    >
                                        Custom
                                    </button>
                                </div>

                                {!isCustomMode ? (
                                    /* Relative Time Ranges */
                                    <div className="space-y-1">
                                        {TIME_RANGES.map((range) => (
                                            <button
                                                key={range.value}
                                                onClick={() => {
                                                    onTimeRangeChange(range);
                                                    setIsTimeDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 flex items-center justify-between ${selectedTimeRange.value === range.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                                    }`}
                                            >
                                                <span className="text-xs sm:text-sm">{range.label}</span>
                                                {selectedTimeRange.value === range.value && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    /* Custom Time Range */
                                    <div className="space-y-3 sm:space-y-4">
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From</label>
                                            <input
                                                type="datetime-local"
                                                value={customFrom}
                                                onChange={(e) => setCustomFrom(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To</label>
                                            <input
                                                type="datetime-local"
                                                value={customTo}
                                                onChange={(e) => setCustomTo(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <button
                                            onClick={handleCustomTimeApply}
                                            disabled={!customFrom || !customTo}
                                            className="w-full px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Refresh Button */}
                <button
                    onClick={onRefresh}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">Refresh</span>
                </button>

                {/* Auto Refresh Selector */}
                <div className="relative" ref={refreshDropdownRef}>
                    <button
                        onClick={() => setIsRefreshDropdownOpen(!isRefreshDropdownOpen)}
                        className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <span className="text-xs sm:text-sm">
                            <span className="hidden sm:inline">Auto: </span>
                            {selectedRefreshInterval.label}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                    {isRefreshDropdownOpen && (
                        <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <div className="py-1">
                                {REFRESH_INTERVALS.map((interval) => (
                                    <button
                                        key={interval.value}
                                        onClick={() => {
                                            onRefreshIntervalChange(interval);
                                            setIsRefreshDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-50 ${selectedRefreshInterval.value === interval.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                            }`}
                                    >
                                        {interval.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
