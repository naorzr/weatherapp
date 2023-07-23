import React, { createContext, useState } from 'react';
import { IHistory, IWeatherData } from '../api';

export interface IWeatherContext {
  weatherData: IWeatherData[];
  setWeatherData: (data: IWeatherData[]) => void;
  historyData: IHistory[];
  setHistoryData: (data: IHistory[]) => void;
}

export const WeatherContext = createContext<IWeatherContext | undefined>(undefined);

export const WeatherProvider = ({ children }: React.PropsWithChildren) => {
  const [weatherData, setWeatherData] = useState<IWeatherData[]>([]);
  const [historyData, setHistoryData] = useState<IHistory[]>([]);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, historyData, setHistoryData }}>
      {children}
    </WeatherContext.Provider>
  );
};
