export default function TotalsPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Totals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Total Generation</h2>
                    <div className="text-3xl font-bold text-green-600">0 kWh</div>
                    <p className="text-gray-600">Lifetime generation</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Daily Average</h2>
                    <div className="text-3xl font-bold text-blue-600">0 kWh</div>
                    <p className="text-gray-600">Average daily production</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Peak Production</h2>
                    <div className="text-3xl font-bold text-orange-600">0 kW</div>
                    <p className="text-gray-600">Highest recorded output</p>
                </div>
            </div>
        </div>
    );
}
