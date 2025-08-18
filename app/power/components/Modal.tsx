'use client';

import React, { useState, Fragment } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full" style={{ maxWidth: '500px' }}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500"
                                        aria-label="Close"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <div>{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AddAutomationModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (data: any) => void }> = ({
    isOpen,
    onClose,
    onSave
}) => {
    const [name, setName] = useState('');
    const [conditionType, setConditionType] = useState('schedule');
    const [action, setAction] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name,
            condition: conditionType,
            action,
            id: Date.now().toString(),
            isActive: true
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Automation">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Automation Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2"
                        placeholder="Daily Battery Optimization"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                        Condition Type
                    </label>
                    <select
                        id="condition"
                        value={conditionType}
                        onChange={(e) => setConditionType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2"
                        required
                    >
                        <option value="schedule">Schedule</option>
                        <option value="batteryLevel">Battery Level</option>
                        <option value="gridStatus">Grid Status</option>
                        <option value="solarProduction">Solar Production</option>
                    </select>
                </div>

                {conditionType === 'schedule' && (
                    <div>
                        <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                            Schedule
                        </label>
                        <input
                            type="time"
                            id="schedule"
                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            required
                        />
                    </div>
                )}

                {conditionType === 'batteryLevel' && (
                    <div>
                        <label htmlFor="batteryLevel" className="block text-sm font-medium text-gray-700 mb-1">
                            Battery Level
                        </label>
                        <div className="flex items-center">
                            <input
                                type="number"
                                id="batteryLevel"
                                min="0"
                                max="100"
                                className="w-20 border border-gray-300 rounded-md shadow-sm px-3 py-2"
                                required
                            />
                            <span className="ml-2">%</span>
                        </div>
                    </div>
                )}

                <div>
                    <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">
                        Action
                    </label>
                    <select
                        id="action"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        required
                    >
                        <option value="">Select an action</option>
                        <option value="changePriority">Change Priority</option>
                        <option value="toggleCharging">Toggle Battery Charging</option>
                        <option value="toggleGridExport">Toggle Grid Export</option>
                    </select>
                </div>

                <div className="flex justify-end pt-4 space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Add Automation
                    </button>
                </div>
            </form>
        </Modal>
    );
};
