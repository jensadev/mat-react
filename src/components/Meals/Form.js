import './Form.scss';
import 'react-datepicker/dist/react-datepicker.css';

import { useAuth0 } from '@auth0/auth0-react';
import { format } from 'date-fns';
import sv from 'date-fns/locale/sv';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('sv', sv);
import { Field, Form } from 'react-final-form';

import DownshiftInput from './DownshiftInput';

function Mform(props) {
  // const apiOrigin = 'http://localhost:8080/api';
  const { getAccessTokenSilently } = useAuth0();
  const DatePickerAdapter = ({ input: { onChange, value }, ...rest }) => (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date)}
      {...rest}
    />
  );

  const onSubmit = async (values) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${process.env.REACT_APP_API_URL}/meals`, {
        method: props.meal.id ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });

      const responseData = await response.json();
      if (responseData.meal) {
        window.flash(`Måltiden skapad, ${responseData.meal.id}`, 'success');
      } else if (responseData.updatedMeal) {
        window.flash(
          `Måltiden uppdaterad, ${responseData.updatedMeal.id}`,
          'success'
        );
      }
      props.onMealUpdateOrCreate(responseData.meal || responseData.updatedMeal);
    } catch (error) {
      console.error(error);
      window.flash('Någonting gick fel: ' + error, 'danger');
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.typeId) {
      errors.typeId = 'Fältet för måltidstyp får inte vara tomt.';
    } else if (isNaN(values.typeId)) {
      errors.typeId = 'Värdet är felaktigt.';
    }
    if (values.date == null || !values.date) {
      errors.date = 'Fältet för datum får inte vara tomt.';
    }
    if (!values.dish) {
      errors.dish = 'Fältet för rätt får inte vara tomt.';
    } else if (String(values.dish).length < 4) {
      errors.dish = 'Värdet måste vara minst fyra tecken.';
    }
    return errors;
  };

  const Error = ({ name }) => (
    <Field
      name={name}
      subscribe={{ touched: true, error: true }}
      render={({ meta: { touched, error } }) =>
        touched && error ? (
          <div className="invalid-tooltip" style={{ display: 'block' }}>
            {error}
          </div>
        ) : null
      }
    />
  );

  return (
    <div className="p-3 bg-white rounded box-shadow">
      <Form
        initialValues={props.meal}
        onSubmit={onSubmit}
        validate={validate}
        render={({
          handleSubmit,
          form,
          invalid,
          submitting,
          values,
          reset
        }) => (
          <form
            onSubmit={async (event) => {
              await handleSubmit(event).then(() => reset);
              form.reset();
            }}>
            <div className="row gy-2 gx-3 align-items-center justify-content-md-between h5 fw-normal">
              <div className="col-sm-3 col-lg-2 col-xl-auto text-nowrap text-capitalize-first">
                {values.date && format(values.date, 'eeee', { locale: sv })} den
              </div>
              <div className="col-sm-9 col-lg-2 col-xl-2 position-relative">
                <label htmlFor="date" className="form-label visually-hidden">
                  datum
                </label>
                <Field
                  className="form-control w-100"
                  defaultValue={props.meal.date}
                  id="date"
                  name="date"
                  locale={sv}
                  dateFormat="do LLLL"
                  component={DatePickerAdapter}
                />
                <Error name="date" />
              </div>
              <div className="col-sm-3 col-lg-2 col-xl-auto text-nowrap">
                {values.date && values.date > props.meal.date
                  ? 'ska jag äta'
                  : 'har jag ätit'}
              </div>
              <div className="col-sm-9 col-lg-6 col-xl-3 position-relative">
                <label htmlFor="dish" className="form-label visually-hidden">
                  rätt
                </label>
                <Field
                  className="form-control w-100"
                  id="dish"
                  name="dish"
                  component={DownshiftInput}
                  placeholder="Skriv för att söka eller lägga till en rätt..."
                />
                <Error name="dish" />
              </div>
              <div className="col-sm-3 col-lg-2 col-xl-auto">till </div>
              <div className="col-sm-9 col-lg-2 col-xl-auto position-relative">
                <label htmlFor="type" className="form-label visually-hidden">
                  måltidstyp
                </label>
                <Field
                  id="typeId"
                  name="typeId"
                  component="select"
                  defaultValue="3"
                  className="form-select w-100">
                  <option value="1">Frukost</option>
                  <option value="2">Lunch</option>
                  <option value="3">Middag</option>
                </Field>
                <Error name="typeId" />
              </div>
              <div className="col-lg-2 col-xl-auto"></div>
              <div className="buttons col-sm col-lg-6 col-xl-2 d-flex">
                <button
                  style={{ marginRight: '.5rem' }}
                  type="submit"
                  className="btn btn-success text-light text-nowrap overflow-hidden w-100"
                  disabled={submitting || invalid}>
                  {submitting && (
                    <div className="d-flex align-items-center justify-content-center">
                      <span
                        style={{ height: '1.6rem', width: '1.6rem' }}
                        className="spinner-border"
                        role="status"
                        aria-hidden="true"></span>{' '}
                      <span className="visually-hidden">Laddar...</span>
                    </div>
                  )}
                  {!submitting &&
                    (props.meal.id ? (
                      <span>Redigera</span>
                    ) : (
                      <span>Skapa</span>
                    ))}
                </button>
                <button
                  className="btn btn-danger text-light text-nowrap overflow-hidden w-100"
                  style={{ marginLeft: '.5rem' }}
                  type="button"
                  onClick={form.reset && props.onMealEdit}
                  disabled={submitting}>
                  Rensa
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
}

export default Mform;
