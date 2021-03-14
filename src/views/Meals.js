import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Dashbar from '../components/Dashbar';
import Loading from '../components/Loading';
import MealForm from '../components/MealForm';
import MealsList from '../components/MealsList';
function MealsComponent() {
  // console.table(user);
  // const sub = String(user.sub).split('|')[1];
  // console.log(sub);
  const apiOrigin = 'http://localhost:8080/api';
  const [meals, setMeals] = useState([]);
  // const [state, setState] = useState({
  //   showResult: false,
  //   apiMessage: '',
  //   error: null
  // });

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();

        const response = await fetch(`${apiOrigin}/users/meals`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseData = await response.json();

        console.table(responseData);
        if (responseData) {
          setMeals(responseData);
        }
        // setState({
        //   ...state,
        //   showResult: responseData == false ? false : true,
        //   apiMessage: responseData
        // });
      } catch (error) {
        console.log(error);
        // setState({
        //   ...state,
        //   error: error.error
        // });
      }
    })();
  }, [getAccessTokenSilently]);

  return (
    <div className="h-100 d-flex flex-column">
      <Dashbar />
      <main className="container mt-3">
        <div className="my-3">
          <MealForm />
        </div>
        <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
          <h6 className="border-bottom border-gray pb-2 mb-0">
            Senaste måltider
          </h6>
          {meals && <MealsList meals={meals} />}
          <nav className="pt-3" aria-label="Page navigation example">
            <ul className="pagination justify-content-center mb-2">
              <li className="page-item disabled">
                <Link
                  className="page-link"
                  to="#"
                  tabIndex="-1"
                  aria-label="Previous"
                  aria-disabled="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mb-1"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#" aria-label="Next">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mb-1"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
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
