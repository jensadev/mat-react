import './MealsList.scss';

// import ScheduleIcon from '@material-ui/icons/ScheduleRounded';
import {
  // DeleteOutlineRounded,
  DeleteRounded,
  EditRounded,
  FastfoodRounded,
  FreeBreakfastRounded,
  RestaurantMenuRounded
} from '@material-ui/icons';
import { Field, Form } from 'react-final-form';

import Date from './Date';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

function ListItem(props) {
  const TypeIcon = (type) => {
    switch (type) {
      case 1:
        return <FreeBreakfastRounded />;
      case 2:
        return <FastfoodRounded />;
      case 3:
        return <RestaurantMenuRounded />;
      default:
        return 'tom';
    }
  };

  const meal = props.meal;
  return (
    <div className="d-flex justify-content-between pt-3 text-dark border-bottom">
      <div className="d-flex">
        <div className="mealicon">{TypeIcon(meal.typeId)}</div>

        <p className="pb-3 mb-0 lh-sm text-dark">
          <Date classes={'d-block small text-muted'} dateString={meal.date} />
          {meal.dish}
        </p>
      </div>
      <div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field
                type="hidden"
                name="id"
                component="input"
                defaultValue={meal.id}
              />
              <button
                type="submit"
                className="btn btn-outline-dark border-0"
                disabled={submitting}
                onClick={() => {
                  form.change('action', 'edit');
                }}>
                <EditRounded />
              </button>
              <button
                type="submit"
                className="btn btn-outline-dark border-0"
                disabled={submitting}
                onClick={() => {
                  form.change('action', 'delete');
                }}>
                <DeleteRounded />
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

function MealsList(props) {
  const meals = props.meals;
  return (
    <div>
      {meals.map((meal) => (
        <ListItem key={meal.id} meal={meal} />
      ))}
    </div>
  );
}

export default MealsList;
