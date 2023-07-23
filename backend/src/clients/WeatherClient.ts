
import { caching, MemoryCache } from 'cache-manager';

export interface IWeatherData {
    city: string;
    weather: string;
    temperature: string;
    wind: string;
}


export class WeatherService {
    private apiKey: string
    private memoryCache: MemoryCache | undefined
    constructor(apiKey: string) {
        this.apiKey = apiKey;
        caching('memory', {
            max: 100,
            ttl: 60 * 60 * 24, // 1 day
        }).then((cache) => {
            this.memoryCache = cache;
        }).catch((error) => {
            console.error(error);
        });
    }

    public async getWeatherData(cities: Array<string>): Promise<Array<IWeatherData>> {
        const weatherData = await Promise.all(cities.map((city) => this.fetchWeatherData(city)));
        return weatherData;
    }

    private async fetchWeatherData(city: string): Promise<IWeatherData> {
        const cachedData = await this.memoryCache?.get<IWeatherData>(city);
        if (cachedData) {
            return cachedData;
        }
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${city}&key=${this.apiKey}`);
        const data = await response.json();
        const result = {
            city: city,
            weather: data.current.condition.text,
            temperature: `${data.current.temp_c} °C`,
            wind: `Wind ${data.current.wind_kph} km/h`,
        }
        await this.memoryCache?.set(city, result, 5 * 60 * 1000);
        return result
    }
}
