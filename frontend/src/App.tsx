import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import Search from './components/Search';
import WeatherTable from './components/WeatherTable';
import History from './components/History';
import styles from './App.module.css';

function App() {
  return (
    <WeatherProvider>
      <div className={styles.container}>
        <div className={styles.item}>
          <Search />
        </div>
        <div className={styles.item}>
          <WeatherTable />
        </div>
        <div className={styles.item}>
          <History />
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
