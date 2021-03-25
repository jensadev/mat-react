import './App.scss';

import { useAuth0 } from '@auth0/auth0-react';
// import { useAuth0 } from '@auth0/auth0-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { lazy, Suspense } from 'react';
import CookieConsent from 'react-cookie-consent';
import { Route, Router, Switch } from 'react-router-dom';

import ProtectedRoute from './auth/protected-route';
import Flash from './components/Flash';
import Footer from './components/Footer';
// import Home from './components/Home';
import Loading from './components/Loading';
// import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Bus from './utils/bus';
import history from './utils/history';

const Home = lazy(() => import('./views/Home'));
const Meals = lazy(() => import('./views/Meals'));
const Legal = lazy(() => import('./views/Legal'));
const Profile = lazy(() => import('./views/Profile'));

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  window.flash = (message, type = 'success') =>
    Bus.emit('flash', { message, type });

  return (
    <Router history={history}>
      <div id="app" className="h-100 d-flex flex-column">
        <NavBar />
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route path="/" exact component={Home} />
            <Route path="/legal" exact component={Legal} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/meals" component={Meals} />
          </Suspense>
        </Switch>
        <Footer />
        <div className="position-absolute bottom-0 end-0 m-4">
          <Flash />
        </div>
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
