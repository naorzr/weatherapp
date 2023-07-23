import React, { useContext, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { getWeatherData } from '../api';
import styles from './Search.module.css';

const Search = () => {
  const [cities, setCities] = useState('');
  const weatherCtx = useContext(WeatherContext);

  const handleSearch = async () => {
    const weatherData = await getWeatherData(cities.split(','));
    weatherCtx?.setWeatherData(weatherData);
  };

  return (
    <div className={styles.searchContainer}>
      <textarea 
        className={styles.textarea} 
        value={cities} 
        onChange={(e) => setCities(e.target.value)} 
      />
      <button className={styles.button} onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
