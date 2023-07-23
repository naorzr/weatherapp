import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import styles from './WeatherTable.module.css';

const WeatherTable = () => {
    const weatherCtx = useContext(WeatherContext);

    return weatherCtx?.weatherData && (
        <table className={styles.weatherTable}>
            <thead>
                <tr>
                    <th>City</th>
                    <th>Weather</th>
                </tr>
            </thead>
            <tbody>
                {weatherCtx.weatherData.map((data) => (
                    <tr key={data.city}>
                        <td>{data.city}</td>
                        <td>{`${data.temperature}, Wind ${data.wind}, ${data.weather}`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default WeatherTable;
