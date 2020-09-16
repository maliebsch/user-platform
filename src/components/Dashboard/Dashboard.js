import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { fetchWeather, getLocation } from '../../api/index';
import Weather from '../Weather/Weather';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import styles from './Dashboard.module.css';
import appStyles from '../../styles/App.module.css';

class Dashboard extends Component {
  state = {
    weather: null,
  };

  async componentDidMount() {
    const position = await getLocation();
    let weather = null;
    if (position !== null) {
      weather = await fetchWeather(position);
    }
    this.setState({ weather });
  }
  render() {
    const { auth, profile } = this.props;
    const { weather } = this.state;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }
    return (
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt="userImg"
              className={styles.userProfileImg}
            />
          ) : (
            <AccountBoxIcon className={styles.AccountBoxIcon} />
          )}
          <h1 className={appStyles.h1}>
            Good day{' '}
            <span className={styles.userProfileGreeting}>
              {profile.username}
            </span>
          </h1>
          {auth.uid ? (
            <button onClick={this.props.logout} className={styles.logout}>
              Logout
            </button>
          ) : null}
        </div>
        <div className={styles.dashboardMain}>
          {weather !== null ? <Weather weather={weather} /> : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Dashboard);
