export default function ConfigurationPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Configuration</h1>
            <div className="grid grid-cols-1 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">System Settings</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">System Name</label>
                            <input
                                type="text"
                                className="px-3 py-2 border rounded-md"
                                placeholder="Enter system name"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Location</label>
                            <input
                                type="text"
                                className="px-3 py-2 border rounded-md"
                                placeholder="Enter system location"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">System Capacity (kW)</label>
                            <input
                                type="number"
                                className="px-3 py-2 border rounded-md"
                                placeholder="Enter system capacity"
                            />
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Save Changes
                        </button>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="email-alerts" />
                            <label htmlFor="email-alerts">Email Alerts</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="push-notifications" />
                            <label htmlFor="push-notifications">Push Notifications</label>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Update Notifications
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
