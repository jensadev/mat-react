import {
  FirstPageRounded,
  LastPageRounded,
  NavigateBeforeRounded,
  NavigateNextRounded
} from '@material-ui/icons';
// import { useState } from 'react';
import { Link } from 'react-router-dom';

function Pagination(props) {
  return (
    <nav className="pt-3">
      {props.pager.pages && props.pager.pages.length && (
        <ul className="pagination justify-content-center">
          <li
            className={`page-item first-item ${
              props.pager.currentPage === 1 ? 'disabled' : ''
            }`}>
            <Link to={{ search: `?page=1` }} className="page-link">
              <FirstPageRounded />
            </Link>
          </li>
          <li
            className={`page-item previous-item ${
              props.pager.currentPage === 1 ? 'disabled' : ''
            }`}>
            <Link
              to={{ search: `?page=${props.pager.currentPage - 1}` }}
              className="page-link">
              <NavigateBeforeRounded />
            </Link>
          </li>
          {props.pager.pages.map((page) => (
            <li
              key={page}
              className={`page-item number-item ${
                props.pager.currentPage === page ? 'active' : ''
              }`}>
              <Link to={{ search: `?page=${page}` }} className="page-link">
                {page}
              </Link>
            </li>
          ))}
          <li
            className={`page-item next-item ${
              props.pager.currentPage === props.pager.totalPages
                ? 'disabled'
                : ''
            }`}>
            <Link
              to={{ search: `?page=${props.pager.currentPage + 1}` }}
              className="page-link">
              <NavigateNextRounded />
            </Link>
          </li>
          <li
            className={`page-item last-item ${
              props.pager.currentPage === props.pager.totalPages
                ? 'disabled'
                : ''
            }`}>
            <Link
              to={{ search: `?page=${props.pager.totalPages}` }}
              className="page-link">
              <LastPageRounded />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Pagination;
