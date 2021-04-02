import { parseISO } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';

import Dashbar from '../components/Dashbar';
import Dashboard from '../components/Dashboard';
import Loading from '../components/Loading';
import Mform from '../components/Meals/Form';
import Mlist from '../components/Meals/List';
import Listitem from '../components/Meals/Listitem';
import MealService from '../services/meal';

function Meals(props) {
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
    if (e.dishId) setMeal(defaultMeal);
    setPager({});
    setPageOfItems([]);
  };

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(location.search);
      const page = parseInt(params.get('page')) || 1;
      try {
        if (page !== pager.currentPage) {
          MealService.index(page).then(
            (res) => {
              if (res.pager) {
                if (!res.pager.totalItems == 0) {
                  setPager(res.pager);
                  setPageOfItems(res.pageOfItems);
                }
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [pager, props.location.search]);

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
            <Fragment>
              <div className="pt-3">Inga måltider</div>
              <Loading />
            </Fragment>
          )}
        </Mlist>
        <Dashboard />
      </main>
    </Fragment>
  );
}

export default Meals;
