import './Home.scss';
import 'react-datepicker/dist/react-datepicker.css';

import sv from 'date-fns/locale/sv';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { Link } from 'react-router-dom';

import AuthService from '../services/auth-service';
import Dashboard from './Dashboard';
import DishSearch from './DishSearch';
import Footer from './Footer';
import Nav from './Nav';

registerLocale('sv', sv);

function Home() {
  const [startDate, setStartDate] = useState(new Date());

  console.table(AuthService.getCurrentUser());

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
                <DatePicker
                  className="form-control form-control-lg text-dark"
                  locale="sv"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
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
          <div className="d-flex align-items-start text-muted pt-3">
            <img
              src="https://via.placeholder.com/32/007bff"
              alt=""
              className="mr-2 rounded"
              width="32px"
              height="32px"
            />
            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong className="d-block text-gray-dark">@username</strong>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus.
            </p>
          </div>
          <div className="media text-muted pt-3">
            <img
              src="https://via.placeholder.com/32/e83e8c"
              alt=""
              className="mr-2 rounded"
            />
            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong className="d-block text-gray-dark">@username</strong>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus.
            </p>
          </div>
          <div className="media text-muted pt-3">
            <img
              src="https://via.placeholder.com/32/6f42c1"
              alt=""
              className="mr-2 rounded"
            />
            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong className="d-block text-gray-dark">@username</strong>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus.
            </p>
          </div>
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
