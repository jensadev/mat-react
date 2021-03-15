import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Dashbar from '../components/Dashbar';
import Loading from '../components/Loading';
import MealForm from '../components/MealForm';
import MealsList from '../components/MealsList';
function MealsComponent() {
  const apiOrigin = 'http://localhost:8080/api';
  // const [meals, setMeals] = useState([]);

  const [pager, setPager] = useState(false);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [test, setTest] = useState(false);
  const handleCallback = (childData) => {
    setTest(childData);
  };

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(location.search);
      const page = parseInt(params.get('page')) || 1;
      // if (page !== this.state.pager.currentPage) {
      //   fetch(`/api/items?page=${page}`, { method: 'GET' })
      //     .then((response) => response.json())
      //     .then(({ pager, pageOfItems }) => {
      //       this.setState({ pager, pageOfItems });
      //     });
      // }
      // console.log(pager.currentPage);
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

          const responseData = await response.json();

          if (responseData.pager != 'undefined') {
            setPager(responseData.pager);
            setPageOfItems(responseData.pageOfItems);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getAccessTokenSilently, pager, test]);

  return (
    <div className="h-100 d-flex flex-column">
      <Dashbar />
      <main className="container mt-3">
        <div className="my-3">
          <MealForm parentCallback={handleCallback} />
        </div>
        {pager && (
          <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
            <h6 className="border-bottom border-gray pb-2 mb-0">
              Senaste måltider
            </h6>
            <MealsList meals={pageOfItems} />
            <nav className="pt-3">
              {pager.pages && pager.pages.length && (
                <ul className="pagination">
                  <li
                    className={`page-item first-item ${
                      pager.currentPage === 1 ? 'disabled' : ''
                    }`}>
                    <Link to={{ search: `?page=1` }} className="page-link">
                      First
                    </Link>
                  </li>
                  <li
                    className={`page-item previous-item ${
                      pager.currentPage === 1 ? 'disabled' : ''
                    }`}>
                    <Link
                      to={{ search: `?page=${pager.currentPage - 1}` }}
                      className="page-link">
                      Previous
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
                      Next
                    </Link>
                  </li>
                  <li
                    className={`page-item last-item ${
                      pager.currentPage === pager.totalPages ? 'disabled' : ''
                    }`}>
                    <Link
                      to={{ search: `?page=${pager.totalPages}` }}
                      className="page-link">
                      Last
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        )}
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
    </div>
  );

  //   return (
  //   <div className="container bg-light text-dark">
  //     <button color="primary" className="mt-5" onClick={callApi}>
  //       Ping API
  //     </button>
  //     <div className="result-block-container">
  //       {state.showResult && (
  //         <div className="result-block" data-testid="api-result">
  //           <h6 className="muted">Result</h6>
  //           <pre>{JSON.stringify(state.apiMessage, null, 2)}</pre>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default withAuthenticationRequired(MealsComponent, {
  // eslint-disable-next-line react/display-name
  onRedirecting: () => <Loading />
});

// import React, { useEffect, useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// const Posts = () => {
//   const { getAccessTokenSilently } = useAuth0();
//   const [posts, setPosts] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const token = await getAccessTokenSilently({
//           audience: 'https://api.example.com/',
//           scope: 'read:posts',
//         });
//         const response = await fetch('https://api.example.com/posts', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setPosts(await response.json());
//       } catch (e) {
//         console.error(e);
//       }
//     })();
//   }, [getAccessTokenSilently]);

//   if (!posts) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <ul>
//       {posts.map((post, index) => {
//         return <li key={index}>{post}</li>;
//       })}
//     </ul>
//   );
// };

// export default Posts;
