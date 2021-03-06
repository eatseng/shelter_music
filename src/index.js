import Auth from './utils/Auth';
import Home from './components/Home.react';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayEnvironmentProvider} from 'react-relay/hooks';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import RelayEnvironment from './relay/RelayEnvironment';
import Room from './components/room/Room.react';
import SignIn from './components/sign_in/SignIn.react';
import * as serviceWorker from './serviceWorker';

import './index.css';

const {Suspense} = React;

function homeLoader () {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<div className="signIn">Loading...</div>}>
        <Home />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

function roomLoader () {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<div className="signIn">Loading...</div>}>
        <Room />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

function signInLoader () {
  return (
    <SignIn />
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({location}) =>
        Auth.isAuthenticated() === true ? (
          React.createElement(children)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          {homeLoader}
        </PrivateRoute>
        <PrivateRoute exact path="/room">
          {roomLoader}
        </PrivateRoute>
        <Route exact path="/login">
          {signInLoader}
        </Route>
        <Route>
          <div className="fourZeroFour">404 not found</div>
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
