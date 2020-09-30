import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Dashboard/Dashboard.module.css';
import appStyles from '../../styles/App.module.css';

class Sport extends Component {
  render() {
    return (
      <Link to="/sport">
        <div className={styles.dashboardContainer} data-test="component-sport">
          <div className={styles.containerHeader}>
            <h3 className={styles.containerTitle} data-test="title">
              Sport
            </h3>
          </div>
          <div className={styles.containerMain}>
            <h3 className={appStyles.h3} data-test="sub-title">
              Curious about your team?
            </h3>
            <p data-test="content">
              Enter your team name and check which teams they have beaten!
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

export default Sport;
