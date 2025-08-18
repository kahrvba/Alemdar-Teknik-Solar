'use client';

import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { AddAutomationModal } from './Modal';

interface AutomationRule {
    id: string;
    name: string;
    condition: string;
    action: string;
    isActive: boolean;
}

interface AutomationsProps {
    initialRules?: AutomationRule[];
}

export const Automations: React.FC<AutomationsProps> = ({
    initialRules = []
}) => {
    const [rules, setRules] = useState<AutomationRule[]>(initialRules);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddAutomation = () => {
        setShowAddModal(true);
    };

    const handleSaveAutomation = (newRule: AutomationRule) => {
        setRules([...rules, newRule]);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Automations</h2>

            <p className="text-gray-700 mb-6">
                Automations enable you to set inverter settings based on a schedule, battery state of charge, grid outage or other condition.
            </p>

            <button
                onClick={handleAddAutomation}
                className="w-full border border-dashed border-gray-300 rounded-lg py-4 px-6 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center text-blue-600">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium">Add automation</span>
                </div>
            </button>

            <AddAutomationModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleSaveAutomation}
            />
        </div>
    );
};
