import './Home.scss';
import 'react-day-picker/lib/style.css';
import 'moment/locale/sv';

import React, { useEffect, useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment';
import { Link } from 'react-router-dom';

import AuthService from '../services/auth-service';
import MealsDataService from '../services/meals.service';
import Dashboard from './Dashboard';
import DishSearch from './DishSearch';
import Footer from './Footer';
import MealList from './MealList';
import Nav from './Nav';

function Home() {
  const [meals, setMeals] = useState([]);
  const user = JSON.parse(
    atob(AuthService.getCurrentUser().accessToken.split('.')[1])
  );

  useEffect(() => {
    MealsDataService.getAllUser(user.data.id).then(
      (response) => {
        console.log(response);
        setMeals(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMeals(_content);
      }
    );
  }, [user.data.id]);

  return (
    <div className="h-100 d-flex flex-column">
      <Nav />
      <Dashboard />
      <main className="container mt-3">
        <div className="my-3">
          <form>
            <div className=" row ">
              <div className="col-sm-7">
                <DishSearch />
              </div>
              <div className="col-sm-3">
                <DayPickerInput
                  inputProps={{
                    className: 'form-control form-control-lg text-dark'
                  }}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="LL"
                  placeholder={`${formatDate(new Date(), 'LL', 'it')}`}
                  dayPickerProps={{
                    className: 'rounded box-shadow text-dark',
                    locale: 'sv',
                    localeUtils: MomentLocaleUtils
                  }}
                />
              </div>
              <div className="col-sm-2">
                <button className="btn btn-lg btn-dark">Add meal</button>
              </div>
            </div>
          </form>
        </div>
        <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
          <h6 className="border-bottom border-gray pb-2 mb-0">
            Recent updates
          </h6>
          <MealList meals={meals} />
          <nav className="pt-3" aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <Link
                  className="page-link"
                  to="#"
                  tabIndex="-1"
                  aria-disabled="true">
                  Previous
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
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
          <h6 className="border-bottom border-gray pb-2 mb-0">Suggestions</h6>
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
      <Footer />
    </div>
  );
}

export default Home;
