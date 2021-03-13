import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useState } from 'react';

import Loading from '../components/Loading';

export const ExternalApiComponent = () => {
  const apiOrigin = 'http://localhost:8080';

  const [state, setState] = useState({
    showResult: false,
    apiMessage: '',
    error: null
  });

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup
  } = useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/api/external`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return (
    <>
      <div className="mb-5">
        {state.error === 'consent_required' && (
          <div color="warning">
            You need to{' '}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleConsent)}>
              consent to get access to users api
            </a>
          </div>
        )}

        {state.error === 'login_required' && (
          <div color="warning">
            You need to{' '}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}>
              log in again
            </a>
          </div>
        )}

        <h1>External API</h1>
        <p className="lead">
          Ping an external API by clicking the button below.
        </p>

        <p>
          This will call a local API on port 3001 that would have been started
          if you run <code>npm run dev</code>. An access token is sent as part
          of the request&apos;s `Authorization` header and the API will validate
          it using the API&apos;s audience value.
        </p>

        <button color="primary" className="mt-5" onClick={callApi}>
          Ping API
        </button>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <pre>{JSON.stringify(state.apiMessage, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  // eslint-disable-next-line react/display-name
  onRedirecting: () => <Loading />
});
