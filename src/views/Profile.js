import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';

import Loading from '../components/Loading';

function ProfileComponent() {
  const { user } = useAuth0();

  return (
    <div>
      <img
        src={user.picture}
        alt="Profile"
        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
      />
      <h2>{user.name}</h2>
      <p className="lead text-muted">{user.email}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default withAuthenticationRequired(ProfileComponent, {
  // eslint-disable-next-line react/display-name
  onRedirecting: () => <Loading />
});
