import './App.scss';

import { useAuth0 } from '@auth0/auth0-react';
// import { useAuth0 } from '@auth0/auth0-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import Footer from './components/Footer';
// import Home from './components/Home';
import Loading from './components/Loading';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import history from './utils/history';
import ExternalApi from './views/ExternalApi';
import Home from './views/Home';
import Profile from './views/Profile';

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <div className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
          </Switch>
        </div>
        <Footer />
        <Logo />
      </div>
    </Router>
  );
}

export default App;
