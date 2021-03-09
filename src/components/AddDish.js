import { useState } from 'react';

import DishDataService from '../services/dish.service';

function AddDish(props) {
  const [dish] = useState(props.newDish);
  // const [submitted, setSubmitted] = useState(false);
  const saveDish = () => {
    var data = {
      name: dish
    };

    DishDataService.create(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <li disabled>
      No such dish in our database,
      <button className="btn btn-sm btn-link" onClick={saveDish}>
        Create {dish}
      </button>
    </li>
  );
}

export default AddDish;
