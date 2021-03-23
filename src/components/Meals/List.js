// import React, { useEffect } from 'react';

// import { useLocation } from 'react-router-dom';
import Pagination from './Pagination';
function List(props) {
  // const location = useLocation();

  // useEffect(() => {
  //   // runs on location, i.e. route, change
  //   console.log('handle route change here', location);
  // }, [location]);

  return (
    <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
      <h6 className="border-bottom border-gray pb-2 mb-0">Senaste måltider</h6>
      <div>{props.children}</div>
      <Pagination pager={props.pager} />
    </div>
  );
  // // return <input value={props.meal} onChange={handleChange} />;
}

export default List;
