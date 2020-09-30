import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Background from './images/background.jpg';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import SportSearch from './components/SportSearch/SportSearch';
import SignUp from './components/SignUp/SignUp';
import styles from './styles/App.module.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div
          className={styles.app}
          data-test="component-app"
          style={{ backgroundImage: `url("${Background}")` }}
        >
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/sport" component={SportSearch} />
            {/* <Route exact path="/photos" component={PhotoUpload} />
            <Route exact path="/news" component={News} />
            <Route exact path="/news/latest" component={NewsArticle} />  */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
