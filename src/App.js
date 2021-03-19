import './App.scss';

import { useAuth0 } from '@auth0/auth0-react';
// import { useAuth0 } from '@auth0/auth0-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { Route, Router, Switch } from 'react-router-dom';

import ProtectedRoute from './auth/protected-route';
import Footer from './components/Footer';
// import Home from './components/Home';
import Loading from './components/Loading';
// import Logo from './components/Logo';
import NavBar from './components/NavBar';
import history from './utils/history';
import ExternalApi from './views/ExternalApi';
import Home from './views/Home';
import Meals from './views/Meals';
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
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/meals" component={Meals} />
          <ProtectedRoute path="/external-api" component={ExternalApi} />
        </Switch>
        <Footer />
        {/* <Logo /> */}
        <CookieConsent
          disableButtonStyles="true"
          buttonClasses="btn btn-light btn-outline-dark m-3"
          buttonText="Jag accepterar cookies"
          contentClasses="pb-3">
          Vi använder cookies för att ge dig en bättre upplevelse av vår
          webbplats.
        </CookieConsent>
      </div>
    </Router>
  );
}

export default App;
