import './MealsList.scss';

// import ScheduleIcon from '@material-ui/icons/ScheduleRounded';
import {
  FastfoodRounded,
  FreeBreakfastRounded,
  RestaurantMenuRounded
} from '@material-ui/icons';

import Date from './Date';

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
    <div className="d-flex pt-3 text-dark border-bottom">
      <div className="mealicon">{TypeIcon(meal.typeId)}</div>
      <p className="pb-3 mb-0 lh-sm text-dark">
        <Date classes={'d-block small'} dateString={meal.date} />
        {meal.dish}
      </p>
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
