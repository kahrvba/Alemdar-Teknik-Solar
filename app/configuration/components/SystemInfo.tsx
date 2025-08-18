'use client'
import React from 'react';
import { ConfigSection } from './ConfigSection';
import { FormField, StaticField } from './FormField';

interface SystemInfoProps {
    // Props can be added if needed
}

export const SystemInfo: React.FC<SystemInfoProps> = () => {
    const systemInfo = {
        softwareVersion: 'v2.3.1',
        installationDate: '2023-05-12',
        lastUpdate: '2023-09-28',
        totalUptime: '142 days',
        deviceID: 'SOLAR-ASST-1234567',
        hardware: 'Raspberry Pi 4B 4GB'
    };

    return (
        <ConfigSection
            title="System Information"
            actionButton={{
                text: 'Check Updates',
                onClick: () => console.log('Checking for updates...'),
                color: 'bg-blue-600'
            }}
        >
            <FormField label="Software Version">
                <StaticField value={systemInfo.softwareVersion} />
            </FormField>

            <FormField label="Installation Date">
                <StaticField value={systemInfo.installationDate} />
            </FormField>

            <FormField label="Last Update">
                <StaticField value={systemInfo.lastUpdate} />
            </FormField>

            <FormField label="Total Uptime">
                <StaticField value={systemInfo.totalUptime} />
            </FormField>

            <FormField label="Device ID">
                <StaticField value={systemInfo.deviceID} />
            </FormField>

            <FormField label="Hardware">
                <StaticField value={systemInfo.hardware} />
            </FormField>
        </ConfigSection>
    );
};
