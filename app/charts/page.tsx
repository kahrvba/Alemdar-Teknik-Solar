export default function ChartsPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Charts</h1>
            <div className="grid grid-cols-1 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Power Generation Over Time</h2>
                    {/* Time series chart will go here */}
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Daily Production</h2>
                    {/* Daily production chart will go here */}
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Monthly Comparison</h2>
                    {/* Monthly comparison chart will go here */}
                </div>
            </div>
        </div>
    );
}
