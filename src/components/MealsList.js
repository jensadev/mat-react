import './MealsList.scss';

import Date from './Date';

function ListItem(props) {
  // const TypeIcon = (type) => {
  //   switch (type) {
  //     case 1:
  //       return AlarmIcon();
  //     case 2:
  //       return WatchIcon();
  //     case 3:
  //       return ClockIcon();
  //     default:
  //       return 'tom';
  //   }
  // };

  const meal = props.meal;
  return (
    <div className="d-flex pt-3 text-dark border-bottom">
      <div className="mealicon">
        <span className="material-icons-outlined">schedule</span>
      </div>
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
