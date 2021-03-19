/*eslint-disable */
import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Route } from 'react-router-dom';

import Loading from '../components/Loading';
;

function ProtectedRoute({ component, ...args }) {
  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
  
      const response = await fetch(
        `${serverUrl}/api/messages/protected-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const responseData = await response.json();
  
      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  }
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />
      })}
      {...args}
    />
  );
  }
export default ProtectedRoute;
