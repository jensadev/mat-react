import { useAuth0 } from '@auth0/auth0-react';
import { parseISO } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';

import Dashbar from '../components/Dashbar';
import Dashboard from '../components/Dashboard';
import Mform from '../components/Meals/Form';
import Mlist from '../components/Meals/List';
import Listitem from '../components/Meals/Listitem';

function Meals() {
  const { getAccessTokenSilently } = useAuth0();
  const [pager, setPager] = useState({});
  const [pageOfItems, setPageOfItems] = useState([]);
  const [today] = useState(new Date());
  const defaultMeal = {
    date: today,
    typeId: 3,
    dish: ''
  };
  const [meal, setMeal] = useState(defaultMeal);

  const handleMealEdit = (e) => {
    // console.log(e);
    if (e.id) {
      const m = {
        id: e.id,
        date: parseISO(e.date),
        typeId: parseInt(e.typeId),
        dish: e.dish
      };
      setMeal(m);
    } else {
      setMeal(defaultMeal);
    }
  };

  const handleListUpdate = (e) => {
    // console.log(e);
    if (e.dishId) setMeal(defaultMeal);
    setPager({});
    setPageOfItems([]);
  };

  useEffect(() => {
    (async () => {
      // const apiOrigin = 'http://localhost:8080/api';
      const params = new URLSearchParams(location.search);
      const page = parseInt(params.get('page')) || 1;
      try {
        const token = await getAccessTokenSilently();
        if (page !== pager.currentPage) {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/meals?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (response.status == 200) {
            const responseData = await response.json();

            // console.table(responseData.pager);
            // console.table(responseData.pageOfItems);
            if (!responseData.pager.totalItems == 0) {
              setPager(responseData.pager);
              setPageOfItems(responseData.pageOfItems);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getAccessTokenSilently, pager]);

  return (
    <Fragment>
      <Dashbar />
      <main className="d-flex flex-column container mt-3">
        <div className="my-3">
          <Mform
            meal={meal}
            onMealUpdateOrCreate={handleListUpdate}
            onMealEdit={handleMealEdit}
          />
        </div>
        <Mlist pager={pager}>
          {pageOfItems.length > 0 ? (
            pageOfItems.map((meal) => (
              <Listitem
                key={meal.id}
                meal={meal}
                onMealDelete={handleListUpdate}
                onMealEdit={handleMealEdit}
              />
            ))
          ) : (
            <div className="pt-3">Inga måltider</div>
          )}
        </Mlist>
        <Dashboard />
      </main>
    </Fragment>
  );
}

export default Meals;
