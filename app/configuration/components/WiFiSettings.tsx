'use client'
import React, { useState } from 'react';
import { ConfigSection } from './ConfigSection';
import { FormField, StaticField, StatusIndicator } from './FormField';

interface WiFiSettingsProps {
    // Props can be added if needed
}

export const WiFiSettings: React.FC<WiFiSettingsProps> = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [settings, setSettings] = useState({
        networkName: 'Home Network',
        status: 'Connected',
        signalStrength: '90%',
        ipAddress: '192.168.1.100',
        macAddress: '00:1A:2B:3C:4D:5E',
        mode: 'Client'
    });

    const handleSave = () => {
        // Handle save logic here
        setIsEditing(false);
    };

    return (
        <ConfigSection
            title="WiFi Network"
            actionButton={{
                text: isEditing ? 'Save' : 'Edit',
                onClick: isEditing ? handleSave : () => setIsEditing(true),
                color: isEditing ? 'bg-green-600' : 'bg-blue-600'
            }}
        >
            <FormField label="Network Name (SSID)">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.networkName}
                        onChange={(e) => setSettings({ ...settings, networkName: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.networkName} />
                )}
            </FormField>

            <FormField label="Status">
                <StatusIndicator status={settings.status} color="bg-green-500" />
            </FormField>

            <FormField label="Signal Strength">
                <StaticField value={settings.signalStrength} />
            </FormField>

            <FormField label="IP Address">
                <StaticField value={settings.ipAddress} />
            </FormField>

            <FormField label="MAC Address">
                <StaticField value={settings.macAddress} />
            </FormField>

            <FormField label="Mode">
                {isEditing ? (
                    <select
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.mode}
                        onChange={(e) => setSettings({ ...settings, mode: e.target.value })}
                    >
                        <option value="Client">Client</option>
                        <option value="Access Point">Access Point</option>
                        <option value="Dual Mode">Dual Mode</option>
                    </select>
                ) : (
                    <StaticField value={settings.mode} />
                )}
            </FormField>
        </ConfigSection>
    );
};
