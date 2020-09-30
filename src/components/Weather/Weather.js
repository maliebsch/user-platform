import React from 'react';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RainIcon from '../../images/Rain_icon.png';
import SunIcon from '../../images/Sun_icon.png';
import CloudIcon from '../../images/CloudIcon.png';
import styles from '../Dashboard/Dashboard.module.css';
import weatherStyles from './Weather.module.css';

const Weather = ({ weather }) => {
  return (
    <div className={styles.dashboardContainer} data-test="component-weather">
      <div className={styles.containerHeader}>
        <h3 className={styles.containerTitle} data-test="title">
          Weather
        </h3>
      </div>
      <div className={styles.containerMain}>
        <div className={weatherStyles.weatherInfo}>
          <p>
            {weather[0].thumbnail !== ('Sun' && 'Rain' && 'Clouds') ? (
              <CalendarTodayIcon
                className={weatherStyles.calenderIcon}
                data-test="weather-icon-generic"
              />
            ) : weather[0].thumbnail === 'Rain' ? (
              <img
                src={RainIcon}
                alt="rainIcon"
                data-test="weather-icon-rain"
                className={weatherStyles.weatherIcon}
              />
            ) : weather[0].thumbnail === 'Sun' ? (
              <img
                src={SunIcon}
                alt="sunIcon"
                data-test="weather-icon-sun"
                className={weatherStyles.weatherIcon}
              />
            ) : weather[0].thumbnail === 'Clouds' ? (
              <img
                src={CloudIcon}
                alt="cloudIcon"
                data-test="weather-icon-cloud"
                className={weatherStyles.weatherIcon}
              />
            ) : null}
          </p>
          <span className={weatherStyles.temperature} data-test="temperature">
            {Math.round(weather[0].temperature)} degrees
          </span>
        </div>
        <p className={weatherStyles.location} data-test="location">
          {weather[0].location}
        </p>
      </div>
    </div>
  );
};

export default Weather;
