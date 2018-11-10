import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomePage from './Home.jsx';

import '../styles/App.css';

export default class App extends React.Component {

  componentDidCatch(error, info) {
    alert(`Unexpected Error Occured: ${error.message} \n\n refreshing page`);
    window.location.reload();
  }

  render() {
    return (
      <div className="main-container">
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}
