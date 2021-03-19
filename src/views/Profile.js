import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

// import Loading from '../components/Loading';

function Profile() {
  const { user } = useAuth0();

  return (
    <div className="container bg-light text-dark">
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

export default Profile;
