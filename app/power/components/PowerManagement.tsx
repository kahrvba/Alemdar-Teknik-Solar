'use client';

import React, { useState } from 'react';

interface PowerManagementProps {
    initialPriority?: string;
}

export const PowerManagement: React.FC<PowerManagementProps> = ({
    initialPriority = 'Solar/Battery/Utility'
}) => {
    const [priority, setPriority] = useState(initialPriority);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Here you would typically save the changes to your backend
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset to initial value
        setPriority(initialPriority);
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-row items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-900">Power management</h2>
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Edit
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleCancel}
                            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <div className="text-gray-700 font-medium mb-2">Output source priority</div>
                    {isEditing ? (
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Solar/Battery/Utility">Solar/Battery/Utility</option>
                            <option value="Solar/Utility/Battery">Solar/Utility/Battery</option>
                            <option value="Utility/Solar/Battery">Utility/Solar/Battery</option>
                        </select>
                    ) : (
                        <div className="text-gray-800 font-medium">{priority}</div>
                    )}
                </div>
            </div>
        </div>
    );
};
