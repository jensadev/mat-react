import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
// import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import Loading from '../components/Loading';
function ProtectedRoute({ component, ...args }) {
  const { getAccessTokenSilently, user } = useAuth0();
  const apiOrigin = 'http://localhost:8080/api';

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: user.email })
      });

      const responseData = await response.json();
      console.log(responseData.user.id);
      localStorage.setItem('uid', responseData.user.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (localStorage.getItem('uid') == 'undefined') {
    callApi();
  }

  return (
    <Route
      component={withAuthenticationRequired(component, {
        // eslint-disable-next-line react/display-name
        onRedirecting: () => <Loading />
      })}
      {...args}
    />
  );
}
export default ProtectedRoute;
