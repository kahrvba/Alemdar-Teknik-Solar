export default function PowerPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Power</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Current Power Output</h2>
                    <div className="text-4xl font-bold text-green-600">0 W</div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Voltage</p>
                            <p className="text-xl font-semibold">0 V</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Current</p>
                            <p className="text-xl font-semibold">0 A</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Power Quality</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Frequency</p>
                            <p className="text-xl font-semibold">0 Hz</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Power Factor</p>
                            <p className="text-xl font-semibold">0.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
