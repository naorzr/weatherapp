import React, { useContext, useEffect } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { getWeatherHistory } from '../api';
import styles from './History.module.css';

const History = () => {
  const weatherCtx = useContext(WeatherContext);

  const handleHistoryClick = (index: number) => {
    weatherCtx?.setWeatherData(weatherCtx?.historyData[index].data);
  };

  useEffect(() => {
    getWeatherHistory().then((data) => weatherCtx?.setHistoryData(data));
  },[])

  return (
    <table className={styles.historyTable}>
      <thead>
        <tr>
          <th>Time</th>
          <th>Cities</th>
        </tr>
      </thead>
      <tbody>
        {weatherCtx?.historyData.map((entry, index) => (
          <tr key={entry.timestamp} className={styles.historyItem} onClick={() => handleHistoryClick(index)}>
            <td>{entry.timestamp}</td>
            <td>{entry.data.map(x => x.city).join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default History;
