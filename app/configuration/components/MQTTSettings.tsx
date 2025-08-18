'use client'
import React, { useState } from 'react';
import { ConfigSection } from './ConfigSection';
import { FormField, StaticField, StatusIndicator } from './FormField';

interface MQTTSettingsProps {
    // Props can be added if needed
}

export const MQTTSettings: React.FC<MQTTSettingsProps> = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [settings, setSettings] = useState({
        brokerAddress: 'mqtt.example.com',
        port: '1883',
        username: 'mqttuser',
        password: '••••••••',
        clientID: 'solar-assistant-client',
        useTLS: true,
        connectionStatus: 'Connected'
    });

    const handleSave = () => {
        // Handle save logic here
        setIsEditing(false);
    };

    const handleTestConnection = () => {
        // Handle test connection logic here
        console.log('Testing connection...');
    };

    return (
        <ConfigSection
            title="MQTT Broker Settings"
            actionButton={{
                text: isEditing ? 'Save' : 'Edit',
                onClick: isEditing ? handleSave : () => setIsEditing(true),
                color: isEditing ? 'bg-green-600' : 'bg-blue-600'
            }}
        >
            <FormField label="Broker Address">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.brokerAddress}
                        onChange={(e) => setSettings({ ...settings, brokerAddress: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.brokerAddress} />
                )}
            </FormField>

            <FormField label="Port">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.port}
                        onChange={(e) => setSettings({ ...settings, port: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.port} />
                )}
            </FormField>

            <FormField label="Username">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.username}
                        onChange={(e) => setSettings({ ...settings, username: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.username} />
                )}
            </FormField>

            <FormField label="Password">
                {isEditing ? (
                    <input
                        type="password"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.password}
                        onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.password} />
                )}
            </FormField>

            <FormField label="Client ID">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.clientID}
                        onChange={(e) => setSettings({ ...settings, clientID: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.clientID} />
                )}
            </FormField>

            <div className="flex items-center gap-2">
                <label className="font-medium text-sm">Use TLS/SSL</label>
                {isEditing ? (
                    <input
                        type="checkbox"
                        checked={settings.useTLS}
                        onChange={(e) => setSettings({ ...settings, useTLS: e.target.checked })}
                        className="h-4 w-4"
                    />
                ) : (
                    <div className="ml-2">{settings.useTLS ? 'Yes' : 'No'}</div>
                )}
            </div>

            <FormField label="Connection Status">
                <StatusIndicator status={settings.connectionStatus} color="bg-green-500" />
            </FormField>

            {!isEditing && (
                <button
                    onClick={handleTestConnection}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
                >
                    Test Connection
                </button>
            )}
        </ConfigSection>
    );
};
