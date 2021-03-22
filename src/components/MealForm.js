import './MealForm.scss';
import 'react-datepicker/dist/react-datepicker.css';

import { useAuth0 } from '@auth0/auth0-react';
import { format } from 'date-fns';
import sv from 'date-fns/locale/sv';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('sv', sv);
import { Field, Form } from 'react-final-form';

import DownshiftInput from './DownshiftInput';
function MealForm(props) {
  const [today] = useState(new Date());
  const apiOrigin = 'http://localhost:8080/api';
  const { getAccessTokenSilently } = useAuth0();

  const DatePickerAdapter = ({ input: { onChange, value }, ...rest }) => (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date)}
      {...rest}
    />
  );

  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/meals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });

      const responseData = await response.json();
      window.flash(JSON.stringify(responseData.meal, 0, 2), 'success');
      props.parentCallback(responseData);
    } catch (error) {
      console.error(error);
      window.flash('Någonting gick fel: ' + error, 'danger');
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.type) {
      errors.type = 'Fältet för måltidstyp får inte vara tomt.';
    } else if (isNaN(values.type)) {
      errors.type = 'Värdet är felaktigt.';
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
    <div className="p-3 bg-white rounded box-shadow text-dark">
      <Form
        initialValues={{ date: today, type: 3 }}
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, invalid, submitting, values }) => (
          <form
            onSubmit={async (event) => {
              await handleSubmit(event);
              // console.log('Error not in resolved promise', error);
              // if (error) {
              //   return error;
              // }
              form.reset();
            }}>
            <div className="row gy-2 gx-3 align-items-center justify-content-md-between h6">
              <div className="col-sm-3 col-lg-2 col-xl-auto text-nowrap text-capitalize-first">
                {values.date && format(values.date, 'eeee', { locale: sv })} den
              </div>
              <div className="col-sm-9 col-lg-2 col-xl-2 position-relative">
                <label htmlFor="date" className="form-label visually-hidden">
                  datum
                </label>
                <Field
                  className="form-control text-dark w-100"
                  defaultValue={today}
                  id="date"
                  name="date"
                  locale={sv}
                  dateFormat="do LLLL"
                  component={DatePickerAdapter}
                />
                <Error name="date" />
              </div>
              <div className="col-sm-3 col-lg-2 col-xl-auto text-nowrap">
                {values.date && values.date > today
                  ? 'ska jag äta'
                  : 'har jag ätit'}
              </div>
              <div className="col-sm-9 col-lg-6 col-xl-4 position-relative">
                <label htmlFor="dish" className="form-label visually-hidden">
                  rätt
                </label>
                <Field
                  className="form-control text-dark w-100"
                  id="dish"
                  name="dish"
                  // items={dishes ? dishes : []}
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
                  id="type"
                  name="type"
                  component="select"
                  defaultValue="3"
                  className="form-select text-dark w-100">
                  <option value="1">Frukost</option>
                  <option value="2">Lunch</option>
                  <option value="3">Middag</option>
                </Field>
                <Error name="type" />
              </div>
              <div className="col-lg-2 col-xl-auto"></div>
              <div className="buttons col-sm col-lg-6 col-xl-1">
                <button
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
                  {!submitting && <span>Skapa</span>}
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
}

export default MealForm;
