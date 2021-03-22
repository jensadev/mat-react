import { useAuth0 } from '@auth0/auth0-react';
import {
  // DeleteOutlineRounded,
  DeleteRounded,
  EditRounded,
  FastfoodRounded,
  FreeBreakfastRounded,
  RestaurantMenuRounded
} from '@material-ui/icons';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';

// import { Redirect } from 'react-router-dom';
import Date from '../Date';

function Listitem(props) {
  const [meal] = useState({
    id: props.meal.id,
    date: props.meal.date,
    typeId: props.meal.typeId,
    dish: props.meal.Dish.name
  });

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

  const { getAccessTokenSilently } = useAuth0();
  const onSubmit = async (values) => {
    const apiOrigin = 'http://localhost:8080/api';
    if (values.action == 'delete') {
      try {
        const token = await getAccessTokenSilently();

        const response = await fetch(`${apiOrigin}/meals/${values.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        const responseData = await response.json();
        console.log(responseData);
        window.flash(responseData.message, 'success');
      } catch (error) {
        console.error(error);
        window.flash('Någonting gick fel: ' + error, 'danger');
      }
    } else if (values.action == 'edit') {
      meal.edit = true;
      props.onMealChange(meal);
    }
  };
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
                className="btn btn-outline-danger border-0"
                disabled={submitting}
                onClick={() => {
                  form.change('action', 'edit');
                }}>
                <EditRounded />
              </button>
              <button
                type="submit"
                className="btn btn-outline-danger border-0"
                disabled={submitting}
                onClick={() => {
                  window.confirm('Är du säker på att du vill ta bort måltiden?')
                    ? form.change('action', 'delete')
                    : null;
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

export default Listitem;
