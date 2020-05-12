import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Routing/PrivateRoute';
import './App.css';

import { ThemeProvider } from '@material-ui/core';
import MainTheme from './theme/Main';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';
// Redux auth init
import { loadUser } from './store/actions/auth';

import Nav from './layout/nav/Nav';
import Auth from './pages/Auth/Auth';

import { Home } from './pages/Home/Home';
import { BackdropLoader } from './components/BackdropLoader/BackdropLoader';
import history from './util/History';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { PageDefault } from './layout/pageDefault/PageDefault';
import { CreateProfile } from './pages/Dashboard/CreateProfile/CreateProfile';
import { resetBackdropLoader } from './store/actions/loaders';

const App = () => {
  // Use effect for auto login on app load
  useEffect(() => {
    if (localStorage.token) store.dispatch(loadUser());
    else {
      store.dispatch(resetBackdropLoader());
      history.push('/authenticate');
    }
  }, []);
  return (
    <Provider store={store}>
      <div className="main">
        <Router history={history}>
          <ThemeProvider theme={MainTheme}>
            <BackdropLoader />
            <Nav />
            <Switch>
              <Route exact path="/" component={PageDefault(Home)} />
              <Route exact path="/authenticate" component={PageDefault(Auth)} />

              <PrivateRoute
                exact
                path="/dashboard"
                component={PageDefault(Dashboard)}
              />
              <PrivateRoute
                exact
                path="/profile/create"
                component={PageDefault(CreateProfile)}
              />
            </Switch>
          </ThemeProvider>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
