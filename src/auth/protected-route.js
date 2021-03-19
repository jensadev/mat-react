/*eslint-disable */
import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Route } from 'react-router-dom';

import Loading from '../components/Loading';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />
    })}
    {...args}
  />
);

export default ProtectedRoute;
