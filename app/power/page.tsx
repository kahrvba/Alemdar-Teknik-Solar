'use client';

import React from 'react';
import { PowerManagement } from './components/PowerManagement';
import { Automations } from './components/Automations';

export default function PowerPage() {
    return (
        <div className="w-full px-4 py-6 space-y-6">
            {/* Power management section */}
            <PowerManagement initialPriority="Solar/Battery/Utility" />

            {/* Automations section */}
            <Automations />
        </div>
    );
}
