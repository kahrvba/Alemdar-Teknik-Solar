'use client'
import React, { useState } from 'react';
import { ConfigSection } from './ConfigSection';
import { FormField, StaticField } from './FormField';

interface BatterySettingsProps {
    // Props can be added if needed
}

export const BatterySettings: React.FC<BatterySettingsProps> = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [settings, setSettings] = useState({
        batteryType: 'Lithium-Ion',
        capacity: '13.5 kWh',
        minStateOfCharge: '10%',
        maxStateOfCharge: '95%',
        chargingRate: '5 kW',
        dischargingRate: '5 kW'
    });

    const handleSave = () => {
        // Handle save logic here
        setIsEditing(false);
    };

    return (
        <ConfigSection
            title="Battery Configuration"
            actionButton={{
                text: isEditing ? 'Save' : 'Edit',
                onClick: isEditing ? handleSave : () => setIsEditing(true),
                color: isEditing ? 'bg-green-600' : 'bg-blue-600'
            }}
        >
            <FormField label="Battery Type">
                {isEditing ? (
                    <select
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.batteryType}
                        onChange={(e) => setSettings({ ...settings, batteryType: e.target.value })}
                    >
                        <option value="Lithium-Ion">Lithium-Ion</option>
                        <option value="Lead-Acid">Lead-Acid</option>
                        <option value="LFP">LFP (Lithium Iron Phosphate)</option>
                        <option value="NMC">NMC (Lithium Nickel Manganese Cobalt Oxide)</option>
                    </select>
                ) : (
                    <StaticField value={settings.batteryType} />
                )}
            </FormField>

            <FormField label="Capacity">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.capacity}
                        onChange={(e) => setSettings({ ...settings, capacity: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.capacity} />
                )}
            </FormField>

            <FormField label="Minimum State of Charge">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.minStateOfCharge}
                        onChange={(e) => setSettings({ ...settings, minStateOfCharge: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.minStateOfCharge} />
                )}
            </FormField>

            <FormField label="Maximum State of Charge">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.maxStateOfCharge}
                        onChange={(e) => setSettings({ ...settings, maxStateOfCharge: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.maxStateOfCharge} />
                )}
            </FormField>

            <FormField label="Charging Rate">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.chargingRate}
                        onChange={(e) => setSettings({ ...settings, chargingRate: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.chargingRate} />
                )}
            </FormField>

            <FormField label="Discharging Rate">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.dischargingRate}
                        onChange={(e) => setSettings({ ...settings, dischargingRate: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.dischargingRate} />
                )}
            </FormField>
        </ConfigSection>
    );
};
