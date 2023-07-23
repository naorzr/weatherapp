
export interface IWeatherData {
    city: string;
    weather: string;
    temperature: string;
    wind: string;
}
export interface IHistory {
    timestamp: string;
    data: IWeatherData[]
}

export async function getWeatherData(cities: string[]): Promise<IWeatherData[]> {
    const response = await fetch(`http://localhost:3000/api/weather?cities=${cities.join(",")}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export async function getWeatherHistory(): Promise<IHistory[]> {
    const response = await fetch('http://localhost:3000/api/history');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
