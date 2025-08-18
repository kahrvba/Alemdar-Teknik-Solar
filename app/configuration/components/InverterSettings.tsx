'use client'
import React, { useState } from 'react';
import { ConfigSection } from './ConfigSection';
import { FormField, StaticField } from './FormField';

interface InverterSettingsProps {
    // Props can be added if needed
}

export const InverterSettings: React.FC<InverterSettingsProps> = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [settings, setSettings] = useState({
        model: 'SolarEdge SE7600H',
        serialNumber: 'SE12345678',
        firmwareVersion: 'v3.2.9',
        outputPower: '7.6 kW',
        maxPowerPoint: '380V',
        gridFrequency: '60 Hz'
    });

    const handleSave = () => {
        // Handle save logic here
        setIsEditing(false);
    };

    return (
        <ConfigSection
            title="Inverter Settings"
            actionButton={{
                text: isEditing ? 'Save' : 'Edit',
                onClick: isEditing ? handleSave : () => setIsEditing(true),
                color: isEditing ? 'bg-green-600' : 'bg-blue-600'
            }}
        >
            <FormField label="Model">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.model}
                        onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.model} />
                )}
            </FormField>

            <FormField label="Serial Number">
                <StaticField value={settings.serialNumber} />
            </FormField>

            <FormField label="Firmware Version">
                <StaticField value={settings.firmwareVersion} />
            </FormField>

            <FormField label="Output Power">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.outputPower}
                        onChange={(e) => setSettings({ ...settings, outputPower: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.outputPower} />
                )}
            </FormField>

            <FormField label="Maximum Power Point">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.maxPowerPoint}
                        onChange={(e) => setSettings({ ...settings, maxPowerPoint: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.maxPowerPoint} />
                )}
            </FormField>

            <FormField label="Grid Frequency">
                {isEditing ? (
                    <select
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.gridFrequency}
                        onChange={(e) => setSettings({ ...settings, gridFrequency: e.target.value })}
                    >
                        <option value="50 Hz">50 Hz</option>
                        <option value="60 Hz">60 Hz</option>
                    </select>
                ) : (
                    <StaticField value={settings.gridFrequency} />
                )}
            </FormField>
        </ConfigSection>
    );
};
