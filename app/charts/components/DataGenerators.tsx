import { TimeRange } from './TimeFilter';

export interface DataPoint {
    time: string;
    timestamp: number;
    [key: string]: any;
}

// Generate 24-hour data with all hours shown
export const generate24HourData = (
    dataGenerator: (hour: number) => any
): DataPoint[] => {
    const data: DataPoint[] = [];

    for (let hour = 0; hour < 24; hour++) {
        const timeLabel = `${hour.toString().padStart(2, '0')}:00`;
        const generatedData = dataGenerator(hour);

        data.push({
            time: timeLabel,
            timestamp: hour,
            ...generatedData
        });
    }

    return data;
};

// Generate time-based data according to the selected time range
export const generateTimeBasedData = (
    timeRange: TimeRange,
    dataGenerator: (timestamp: number, index: number) => any
): DataPoint[] => {
    // Special case for 24 hours - always show all 24 hours
    if (timeRange.value === '24h') {
        return generate24HourData((hour) => {
            const now = new Date();
            const timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour).getTime();
            return dataGenerator(timestamp, hour);
        });
    }

    const data: DataPoint[] = [];
    const now = new Date();
    const endTime = now.getTime();
    const startTime = endTime - (timeRange.minutes * 60 * 1000);

    // Calculate how many data points we need
    const intervalMs = timeRange.intervalMinutes * 60 * 1000;
    const totalPoints = Math.floor(timeRange.minutes / timeRange.intervalMinutes);

    for (let i = 0; i <= totalPoints; i++) {
        const timestamp = startTime + (i * intervalMs);
        const date = new Date(timestamp);

        // Format time based on the time range
        let timeLabel: string;
        if (timeRange.minutes <= 60) {
            // For ranges <= 1 hour, show minutes:seconds
            timeLabel = date.toLocaleTimeString('en-US', {
                hour12: false,
                minute: '2-digit',
                second: '2-digit'
            });
        } else if (timeRange.minutes <= 1440) {
            // For ranges <= 1 day, show hour:minute
            timeLabel = date.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            // For ranges > 1 day, show month/day hour:minute
            timeLabel = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            }) + ' ' + date.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        const generatedData = dataGenerator(timestamp, i);

        data.push({
            time: timeLabel,
            timestamp,
            ...generatedData
        });
    }

    return data;
};

// MPPT Data Generator
export const generateMPPTDataForTimeRange = (timeRange: TimeRange, mpptNumber: number) => {
    return generateTimeBasedData(timeRange, (timestamp, index) => {
        const date = new Date(timestamp);
        const hour = date.getHours();
        const minute = date.getMinutes();

        // Solar production logic based on time of day
        let voltage = 0;
        let current = 0;
        let power = 0;

        // Check if it's daylight hours (6 AM to 6 PM)
        if (hour >= 6 && hour <= 18) {
            const totalMinutes = hour * 60 + minute;
            const peakTime = 12 * 60; // Noon in minutes
            const dayStart = 6 * 60; // 6 AM
            const dayEnd = 18 * 60; // 6 PM

            let efficiency = 0;
            if (totalMinutes <= peakTime) {
                // Morning ramp up
                efficiency = (totalMinutes - dayStart) / (peakTime - dayStart);
            } else {
                // Afternoon ramp down
                efficiency = (dayEnd - totalMinutes) / (dayEnd - peakTime);
            }

            efficiency = Math.max(0, Math.min(1, efficiency));

            // Add some realistic variability
            const variability = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
            efficiency *= variability;

            voltage = 30 + efficiency * 25 + Math.random() * 3; // 30-58V range
            current = efficiency * 18 + Math.random() * 2; // 0-20A range
            power = (voltage * current) / 1000; // Convert to kW
        }

        return {
            voltage: parseFloat(voltage.toFixed(2)),
            current: parseFloat(current.toFixed(2)),
            power: parseFloat(power.toFixed(3))
        };
    });
};// Battery Data Generator
export const generateBatteryDataForTimeRange = (timeRange: TimeRange) => {
    return generateTimeBasedData(timeRange, (timestamp, index) => {
        const date = new Date(timestamp);
        const hour = date.getHours();
        const minute = date.getMinutes();

        // Battery behavior based on time of day
        let voltage = 48; // Base voltage
        let temperature = 25; // Base temperature
        let current = 0; // Base current

        // Solar charging hours
        if (hour >= 6 && hour <= 17) {
            const totalMinutes = hour * 60 + minute;
            const chargingEfficiency = Math.sin((totalMinutes - 360) / 660 * Math.PI); // Sine wave for charging

            voltage = 48 + chargingEfficiency * 6 + Math.random() * 0.5; // 48-54V
            temperature = 25 + chargingEfficiency * 10 + Math.random() * 3; // 25-35°C
            current = chargingEfficiency * 15 + Math.random() * 2; // 0-17A charging
        } else {
            // Discharging hours
            const dischargingRate = 0.3 + Math.random() * 0.4; // 0.3-0.7
            voltage = 48 - dischargingRate * 2 + Math.random() * 0.3; // 46-48V
            temperature = 20 + Math.random() * 5; // 20-25°C
            current = -(dischargingRate * 10 + Math.random() * 3); // -3 to -13A discharging
        }

        // Calculate power and state of charge
        const power = (voltage * Math.abs(current)) / 1000;
        const powerForSOC = current > 0 ? power : -power;

        // Simulate state of charge (simplified)
        let stateOfCharge = 50; // Base 50%
        if (hour >= 6 && hour <= 17) {
            stateOfCharge = 50 + (hour - 6) * 4 + Math.random() * 5; // Charging
        } else {
            stateOfCharge = 90 - (hour > 17 ? hour - 17 : hour + 7) * 3 + Math.random() * 5; // Discharging
        }
        stateOfCharge = Math.max(10, Math.min(100, stateOfCharge));

        return {
            voltage: parseFloat(voltage.toFixed(2)),
            temperature: parseFloat(temperature.toFixed(1)),
            current: parseFloat(current.toFixed(2)),
            power: parseFloat(powerForSOC.toFixed(3)),
            stateOfCharge: parseInt(stateOfCharge.toString()),
            status: current > 0 ? 'Charging' : 'Discharging'
        };
    });
};

// Grid Data Generator
export const generateGridDataForTimeRange = (timeRange: TimeRange) => {
    return generateTimeBasedData(timeRange, (timestamp, index) => {
        // Grid is generally stable with small variations
        const voltage = 220 + Math.random() * 20; // 220-240V
        const frequency = 49.8 + Math.random() * 0.4; // 49.8-50.2Hz

        return {
            voltage: parseFloat(voltage.toFixed(1)),
            frequency: parseFloat(frequency.toFixed(2))
        };
    });
};

// System Data Generator
export const generateSystemDataForTimeRange = (timeRange: TimeRange) => {
    return generateTimeBasedData(timeRange, (timestamp, index) => {
        const date = new Date(timestamp);
        const hour = date.getHours();

        // Load power varies throughout the day
        let loadPower = 0.5 + Math.random() * 0.3; // Base load 0.5-0.8kW
        if (hour >= 6 && hour <= 22) {
            loadPower += 1 + Math.random() * 2; // Higher during active hours 1.5-3.8kW
        }

        const acVoltage = 220 + Math.random() * 15; // 220-235V
        const busVoltage = 400 + Math.random() * 20; // 400-420V
        const inverterTemp = 35 + Math.random() * 15; // 35-50°C

        return {
            loadPower: parseFloat(loadPower.toFixed(3)),
            acVoltage: parseFloat(acVoltage.toFixed(1)),
            busVoltage: parseFloat(busVoltage.toFixed(1)),
            inverterTemp: parseFloat(inverterTemp.toFixed(1))
        };
    });
};
