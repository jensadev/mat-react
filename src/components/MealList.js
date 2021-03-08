// function MealListItem(props) {
//   const item = props.item;
//   return (
//     <div key={item.id}>
//       <p>{item.dish}</p>
//     </div>
//   );
// }

// {meals.map((item) => (
//   <MealListItem item={item} />
// ))}

// function MealList(props) {
//   const meals = props.meals;
//   const listItems = meals.map((meal) => <li key={meal.id}>{meal.dish}</li>);
//   return <ul>{listItems}</ul>;
// }

function ListItem(props) {
  const meal = props.meal;
  return (
    <div className="d-flex text-muted pt-3">
      <svg
        className="bd-placeholder-img flex-shrink-0 me-2 rounded"
        width="48"
        height="48"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: 48x48"
        preserveAspectRatio="xMidYMid slice"
        focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#007bff"></rect>
        <text x="50%" y="50%" fill="#007bff" dy=".3em">
          48x48
        </text>
      </svg>
      <p className="pb-3 mb-0 small lh-sm border-bottom">
        <strong className="d-block text-gray-dark">{meal.date}</strong>
        {meal.dish}
      </p>
    </div>
  );
}

function MealList(props) {
  const meals = props.meals;
  return (
    <div>
      {meals.map((meal) => (
        <ListItem key={meal.id} meal={meal} />
      ))}
    </div>
  );
}

export default MealList;
