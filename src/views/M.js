// import { useAuth0 } from '@auth0/auth0-react';
import React, { Fragment, useState } from 'react';

import Dashbar from '../components/Dashbar';
import Dashboard from '../components/Dashboard';
// import Loading from '../components/Loading';
// import Mform from '../components/Meals/Form';
import Mlist from '../components/Meals/List';

function M() {
  const [today] = useState(new Date());
  const [meal, setMeal] = useState({
    date: today,
    typeId: 3,
    dish: '',
    edit: false
  });

  const handleMealChange = (e) => {
    setMeal(e);
    console.log(meal);
  };

  return (
    <Fragment>
      <Dashbar />
      <main className="d-flex flex-column container mt-3">
        <div className="my-3">
          {/* <Mform meal={meal} onMealChange={handleMealChange} /> */}
        </div>
        <Mlist meal={meal} onMealChange={handleMealChange} />
        <Dashboard />
      </main>
    </Fragment>
  );
}

export default M;
