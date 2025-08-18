'use client'
import React, { useState } from 'react';
import { ConfigSection } from './ConfigSection';
import { FormField, StaticField } from './FormField';

interface GeneralSettingsProps {
    // Props can be added if needed
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [settings, setSettings] = useState({
        systemName: 'My Solar System',
        timezone: 'UTC+01:00 (Europe/Paris)',
        language: 'English'
    });

    const handleSave = () => {
        // Handle save logic here
        setIsEditing(false);
    };

    return (
        <ConfigSection
            title="General Settings"
            actionButton={{
                text: isEditing ? 'Save' : 'Edit',
                onClick: isEditing ? handleSave : () => setIsEditing(true),
                color: isEditing ? 'bg-green-600' : 'bg-blue-600'
            }}
        >
            <FormField label="System Name">
                {isEditing ? (
                    <input
                        type="text"
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.systemName}
                        onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                    />
                ) : (
                    <StaticField value={settings.systemName} />
                )}
            </FormField>

            <FormField label="Timezone">
                {isEditing ? (
                    <select
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.timezone}
                        onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    >
                        <option value="UTC+01:00 (Europe/Paris)">UTC+01:00 (Europe/Paris)</option>
                        <option value="UTC+00:00 (Europe/London)">UTC+00:00 (Europe/London)</option>
                        <option value="UTC-05:00 (America/New_York)">UTC-05:00 (America/New_York)</option>
                        <option value="UTC-08:00 (America/Los_Angeles)">UTC-08:00 (America/Los_Angeles)</option>
                    </select>
                ) : (
                    <StaticField value={settings.timezone} />
                )}
            </FormField>

            <FormField label="Language">
                {isEditing ? (
                    <select
                        className="px-3 py-2 border rounded-md w-full"
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    >
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                ) : (
                    <StaticField value={settings.language} />
                )}
            </FormField>
        </ConfigSection>
    );
};
