import { useAuth0 } from '@auth0/auth0-react';
import {
  FirstPageRounded,
  LastPageRounded,
  NavigateBeforeRounded,
  NavigateNextRounded
} from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Dashbar from '../components/Dashbar';
// import Loading from '../components/Loading';
import MealForm from '../components/MealForm';
import MealsList from '../components/MealsList';

function Meals() {
  const apiOrigin = 'http://localhost:8080/api';
  // const [meals, setMeals] = useState([]);

  const [pager, setPager] = useState({});
  const [pageOfItems, setPageOfItems] = useState([]);
  // const [test, setTest] = useState(false);
  const handleCallback = (childData) => {
    // setTest(childData);
    console.log(childData);
    setPager({});
  };

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
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
            const responseData = response.json();
            setPager(responseData.pager);
            setPageOfItems(responseData.pageOfItems);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently, pager.currentPage, location.search]);

  return (
    <Fragment>
      <Dashbar />
      <main className="h-100 d-flex flex-column container mt-3">
        <div className="my-3">
          <MealForm parentCallback={handleCallback} />
        </div>
        <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
          <h6 className="border-bottom border-gray pb-2 mb-0">
            Senaste måltider
          </h6>
          <Fragment>
            <MealsList meals={pageOfItems} />
            <nav className="pt-3">
              {pager.pages && pager.pages.length && (
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item first-item ${
                      pager.currentPage === 1 ? 'disabled' : ''
                    }`}>
                    <Link to={{ search: `?page=1` }} className="page-link">
                      <FirstPageRounded />
                    </Link>
                  </li>
                  <li
                    className={`page-item previous-item ${
                      pager.currentPage === 1 ? 'disabled' : ''
                    }`}>
                    <Link
                      to={{ search: `?page=${pager.currentPage - 1}` }}
                      className="page-link">
                      <NavigateBeforeRounded />
                    </Link>
                  </li>
                  {pager.pages.map((page) => (
                    <li
                      key={page}
                      className={`page-item number-item ${
                        pager.currentPage === page ? 'active' : ''
                      }`}>
                      <Link
                        to={{ search: `?page=${page}` }}
                        className="page-link">
                        {page}
                      </Link>
                    </li>
                  ))}
                  <li
                    className={`page-item next-item ${
                      pager.currentPage === pager.totalPages ? 'disabled' : ''
                    }`}>
                    <Link
                      to={{ search: `?page=${pager.currentPage + 1}` }}
                      className="page-link">
                      <NavigateNextRounded />
                    </Link>
                  </li>
                  <li
                    className={`page-item last-item ${
                      pager.currentPage === pager.totalPages ? 'disabled' : ''
                    }`}>
                    <Link
                      to={{ search: `?page=${pager.totalPages}` }}
                      className="page-link">
                      <LastPageRounded />
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </Fragment>
        </div>
        <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
          <h6 className="border-bottom border-gray pb-2 mb-0">Förslag</h6>
          <div className="media text-muted pt-3">
            <img
              data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1"
              alt=""
              className="mr-2 rounded"
            />
            <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div className="d-flex justify-content-between align-items-center w-100">
                <strong className="text-gray-dark">Full Name</strong>
                <Link to="#">Follow</Link>
              </div>
              <span className="d-block">@username</span>
            </div>
          </div>
          <div className="media text-muted pt-3">
            <img
              data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1"
              alt=""
              className="mr-2 rounded"
            />
            <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div className="d-flex justify-content-between align-items-center w-100">
                <strong className="text-gray-dark">Full Name</strong>
                <Link to="#">Follow</Link>
              </div>
              <span className="d-block">@username</span>
            </div>
          </div>
          <div className="media text-muted pt-3">
            <img
              data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1"
              alt=""
              className="mr-2 rounded"
            />
            <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div className="d-flex justify-content-between align-items-center w-100">
                <strong className="text-gray-dark">Full Name</strong>
                <Link to="#">Follow</Link>
              </div>
              <span className="d-block">@username</span>
            </div>
          </div>
          <small className="d-block text-right mt-3">
            <Link to="#">All suggestions</Link>
          </small>
        </div>
      </main>
      {/* <Footer /> */}
    </Fragment>
  );
}

export default Meals;
