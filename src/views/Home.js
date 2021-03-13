import { useAuth0 } from '@auth0/auth0-react';
import React, { Fragment } from 'react';

import Content from '../components/Content';
// import Hero from '../components/Hero';

function Home() {
  const { user } = useAuth0();

  console.log(user);

  return (
    <Fragment>
      <Content />
    </Fragment>
  );
}

export default Home;
