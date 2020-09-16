import React, { Component } from 'react';
import { signUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import formStyles from '../../styles/Form.module.css';
import styles from './SignUp.module.css';
import appStyles from '../../styles/App.module.css';
import cx from 'classnames';

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageURL: null,
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  onSelectionHandler = async (e) => {
    //get file
    const file = e.target.files[0];

    //create storage ref
    const storageRef = firebase.storage().ref();

    // upload file and store file URL
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const imageURL = await fileRef.getDownloadURL();
    this.setState({ imageURL });
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className={styles.signUp}>
        <h1 className={appStyles.h1}>User platform</h1>
        <form
          className={formStyles.signUpForm}
          onSubmit={(e) => this.onSubmitHandler(e)}
        >
          <div className={formStyles.signUpCred}>
            <div className={formStyles.formControl}>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className={formStyles.inputField}
                onChange={(e) => this.onChangeHandler(e)}
              />
              <input
                type="text"
                id="email"
                placeholder="Email"
                className={formStyles.inputField}
                onChange={(e) => this.onChangeHandler(e)}
              />
            </div>
            <div className={formStyles.formControl}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className={formStyles.inputField}
                onChange={(e) => this.onChangeHandler(e)}
              />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                className={formStyles.inputField}
                onChange={(e) => this.onChangeHandler(e)}
              />
            </div>
          </div>
          <div className={styles.cta}>
            <label htmlFor="imgURL" className={styles.imgUpload}>
              Add picture
            </label>
            <input
              id="imgURL"
              className={styles.inputImgUpload}
              type="file"
              onChange={(e) => this.onSelectionHandler(e)}
            />

            <button className={cx(formStyles.btn, styles.btnAlt)}>
              Register
            </button>
            <div className={formStyles.errorMessage}>
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
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
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
