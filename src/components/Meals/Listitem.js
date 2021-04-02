import './Listitem.scss';

import {
  // DeleteOutlineRounded,
  BentoRounded,
  DeleteRounded,
  DinnerDiningRounded,
  EditRounded,
  FreeBreakfastRounded
} from '@material-ui/icons';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';

import MealService from '../../services/meal';
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
        return <FreeBreakfastRounded fontSize="large" />;
      case 2:
        return <BentoRounded fontSize="large" />;
      case 3:
        return <DinnerDiningRounded fontSize="large" />;
      default:
        return 'tom';
    }
  };

  const onSubmit = async (values) => {
    if (values.action == 'delete') {
      try {
        MealService.destroy(values.id).then(
          (res) => {
            window.flash(res.message, 'success');
            props.onMealDelete(values.id);
          },
          (error) => {
            console.log(error);
          }
        );
        // const user = AuthService.getCurrentUser();

        // const response = await fetch(`${apiOrigin}/meals/${values.id}`, {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${user.token}`
        //   }
        // });

        // const responseData = await response.json();
        // window.flash(responseData.message, 'success');
        // props.onMealDelete(values.id);
      } catch (error) {
        console.error(error);
        window.flash('Någonting gick fel: ' + error, 'danger');
      }
    } else if (values.action == 'edit') {
      meal.id = values.id;
      props.onMealEdit(meal);
    }
  };

  return (
    <div className="d-flex justify-content-between pt-3 text-dark border-bottom">
      <div className="d-flex">
        <div className="mealicon">{TypeIcon(meal.typeId)}</div>
        <p className="pb-3 ps-2 mb-0 lh-sm text-dark">
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
                <span className="visually-hidden">Redigera</span>
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
                <span className="visually-hidden">Ta bort</span>
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default Listitem;
