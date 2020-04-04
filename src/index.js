import SignIn from './components/sign_in/SignIn.react';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayEnvironmentProvider} from 'react-relay/hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RelayEnvironment from './relay/RelayEnvironment';
import * as serviceWorker from './serviceWorker';

import './index.css';

const {Suspense} = React;

function signInLoader () {
  return (
    <SignIn />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          {signInLoader}
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
