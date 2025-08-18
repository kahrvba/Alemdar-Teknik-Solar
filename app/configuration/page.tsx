import { GeneralSettings } from "./components/GeneralSettings";
import { WiFiSettings } from "./components/WiFiSettings";
import { InverterSettings } from "./components/InverterSettings";
import { BatterySettings } from "./components/BatterySettings";
import { SystemInfo } from "./components/SystemInfo";
import { MQTTSettings } from "./components/MQTTSettings";

export default function ConfigurationPage() {
    return (
        <div className="flex flex-col gap-6 pb-8">
            <h1 className="text-3xl font-bold">Configuration</h1>

            {/* On small screens, components will stack vertically; on medium and larger screens, they'll be in a 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                    <GeneralSettings />
                </div>
                <div className="md:col-span-1">
                    <WiFiSettings />
                </div>
                <div className="md:col-span-1">
                    <InverterSettings />
                </div>
                <div className="md:col-span-1">
                    <BatterySettings />
                </div>
                <div className="md:col-span-1">
                    <SystemInfo />
                </div>
                <div className="md:col-span-1">
                    <MQTTSettings />
                </div>
            </div>
        </div>
    );
}
