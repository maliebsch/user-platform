import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import styles from './Login.module.css';
import appStyles from '../../styles/App.module.css';
import formStyles from '../../styles/Form.module.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className={styles.login} data-test="component-login">
        <h1 className={appStyles.h1} data-test="heading-login">
          User platform
        </h1>
        <form
          className={formStyles.loginForm}
          data-test="login-form"
          onSubmit={(e) => this.onSubmitHandler(e)}
        >
          <div className={formStyles.loginCred}>
            <input
              type="text"
              id="username"
              placeholder="Username/email"
              className={formStyles.inputField}
              data-test="username-input"
              onChange={(e) => this.onChangeHandler(e)}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              data-test="password-input"
              className={formStyles.inputField}
              onChange={(e) => this.onChangeHandler(e)}
            />
          </div>
          <div className={formStyles.cta}>
            <button className={formStyles.btn}>Login</button>
            <div className={formStyles.errorMessage}>
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
        <p className={styles.info} data-test="signUp-info">
          New to our platform?
          <Link to="/signup" className={styles.underline} alt="signUp">
            {' '}
            Sign up
          </Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginCred) => dispatch(login(loginCred)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
