import React from 'react';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RainIcon from '../../images/Rain_icon.png';
import SunIcon from '../../images/Sun_icon.png';
import CloudIcon from '../../images/CloudIcon.png';
import styles from '../Dashboard/Dashboard.module.css';
import weatherStyles from './Weather.module.css';

const Weather = ({ weather }) => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.containerHeader}>
        <h3 className={styles.containerTitle}>Weather</h3>
      </div>
      <div className={styles.containerMain}>
        <div className={weatherStyles.weatherInfo}>
          <p>
            {weather[0].thumbnail !== 'Sun' || 'Rain' || 'Clouds' ? (
              <CalendarTodayIcon className={weatherStyles.calenderIcon} />
            ) : weather[0].thumbnail === 'Rain' ? (
              <img
                src={RainIcon}
                alt="rainIcon"
                className={weatherStyles.weatherIcon}
              />
            ) : weather[0].thumbnail === 'Sun' ? (
              <img
                src={SunIcon}
                alt="sunIcon"
                className={weatherStyles.weatherIcon}
              />
            ) : weather[0].thumbnail === 'Clouds' ? (
              <img
                src={CloudIcon}
                alt="cloudIcon"
                className={weatherStyles.weatherIcon}
              />
            ) : null}
          </p>
          <span className={weatherStyles.temperature}>
            {Math.round(weather[0].temperature)} degrees
          </span>
        </div>
        <p className={weatherStyles.location}>{weather[0].location}</p>
      </div>
    </div>
  );
};

export default Weather;
