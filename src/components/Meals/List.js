import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Listitem from './Listitem';
import Pagination from './Pagination';
function List(props) {
  const [pager, setPager] = useState({});
  const [pageOfItems, setPageOfItems] = useState([]);

  const { getAccessTokenSilently } = useAuth0();
  const handleChange = (e) => {
    props.onMealChange(e.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    // runs on location, i.e. route, change
    console.log('handle route change here', location);
  }, [location]);

  useEffect(() => {
    (async () => {
      const apiOrigin = 'http://localhost:8080/api';
      const params = new URLSearchParams(location.search);
      const page = parseInt(params.get('page')) || 1;
      try {
        const token = await getAccessTokenSilently();
        if (page !== pager.currentPage) {
          const response = await fetch(
            `${apiOrigin}/users/meals?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (response.status == 200) {
            const responseData = await response.json();

            setPager(responseData.pager);
            setPageOfItems(responseData.pageOfItems);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getAccessTokenSilently, location.search, pager]);

  return (
    <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
      <h6 className="border-bottom border-gray pb-2 mb-0">Senaste måltider</h6>
      <div>
        {pageOfItems &&
          pageOfItems.map((meal) => (
            <Listitem key={meal.id} meal={meal} onChange={handleChange} />
          ))}
      </div>
      <Pagination pager={pager} />
    </div>
  );
  // // return <input value={props.meal} onChange={handleChange} />;
}

export default List;
