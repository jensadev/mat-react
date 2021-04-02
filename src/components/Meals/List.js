// import React, { useEffect } from 'react';

// import { useLocation } from 'react-router-dom';
import Pagination from './Pagination';
function List(props) {
  return (
    <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
      <h1 className="h5 border-bottom border-gray pb-2 mb-0">
        Senaste måltider
      </h1>
      <div>{props.children}</div>
      <Pagination pager={props.pager} />
    </div>
  );
}

export default List;
