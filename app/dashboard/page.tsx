import { Monitor, Cloud, Zap, CheckCircle, Battery } from "lucide-react";
import { CircularGauge } from "./components/CircularGauge";
import { OverviewChart } from "./components/OverviewChart";
import { StatusCard } from './components/StatusCard';
import { BatteryCharts } from './components/BatteryCharts';

export default function DashboardPage() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                {/* Main Dashboard Container */}
                <div className="order-2 xl:order-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                        {/* Status Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <StatusCard
                                title="Inverter"
                                subtitle="Solar/Battery mode"
                                icon={<Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />}
                                bgColor="bg-gray-50"
                            />

                            <StatusCard
                                title="Solar PV"
                                subtitle="D: 0 kWh"
                                value="W: 165 kWh"
                                icon={<Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />}
                                bgColor="bg-amber-50"
                            />

                            <StatusCard
                                title="Grid"
                                value="250.6 V"
                                icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />}
                                bgColor="bg-blue-50"
                            />

                            <StatusCard
                                title="Battery"
                                subtitle={<span className="text-green-600">54 V | 78%</span>}
                                value={<span className="text-green-700">9.2 %/hr</span>}
                                icon={<Battery className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />}
                                bgColor="bg-green-50"
                            />
                        </div>

                        {/* Circular Gauges */}
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                            <CircularGauge
                                value={2400}
                                label="Load"
                                unit="W"
                                color="#3b82f6"
                                size={120}
                            />

                            <CircularGauge
                                value={4018}
                                label="Solar PV"
                                unit="W"
                                color="#eab308"
                                size={120}
                            />

                            <CircularGauge
                                value={0}
                                label="Grid"
                                unit="W"
                                color="#6b7280"
                                size={120}
                            />

                            <CircularGauge
                                value={1836}
                                label="Battery"
                                unit="W"
                                color="#22c55e"
                                size={120}
                            />
                        </div>
                    </div>
                </div>

                {/* Overview Chart */}
                <div className="order-1 xl:order-2 xl:col-span-1">
                    <div className="h-64 sm:h-80 xl:h-full">
                        <OverviewChart />
                    </div>
                </div>
            </div>

            {/* Battery Charts Section */}
            <BatteryCharts />
        </div>
    );
}   
