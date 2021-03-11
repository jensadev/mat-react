// import 'moment/locale/sv';
import './MealForm.scss';
import 'react-datepicker/dist/react-datepicker.css';

import { format } from 'date-fns';
import sv from 'date-fns/locale/sv'; // the locale you want
// // import Downshift from 'downshift';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('sv', sv); // register it with the name you want
// import { formatISO } from 'date-fns';
// import MealsDataService from '../services/meals.service';
import { Field, Form } from 'react-final-form';

import UserDataService from '../services/user.service';
import DownshiftInput from './DownshiftInput';
// import fruit from './fruit';

function MealForm(props) {
  const [dishes, setDishes] = useState([]);
  const [today] = useState(new Date());
  useEffect(() => {
    UserDataService.getAllDishes(props.userId).then(
      (response) => {
        setDishes(response.data);
        // console.log(dishes);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setDishes(_content);
      }
    );
  }, [props.userId]);

  const DatePickerAdapter = ({ input: { onChange, value }, ...rest }) => (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date)}
      {...rest}
    />
  );

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(1000);
    window.alert(JSON.stringify(values, 0, 2));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.type) {
      errors.type = 'Required';
    } else if (isNaN(values.type)) {
      errors.type = 'Must be a number';
    }
    if (values.date == null || !values.date) {
      errors.date = 'Required';
    }
    if (!values.dish) {
      errors.dish = 'Required';
    }
    return errors;
  };

  const Error = ({ name }) => (
    <Field
      name={name}
      subscribe={{ touched: true, error: true }}
      render={({ meta: { touched, error } }) =>
        touched && error ? (
          <div className="invalid-feedback">{error}</div>
        ) : null
      }
    />
  );

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, invalid, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="row gy-2 gx-3 align-items-center justify-content-md-between h6">
              <div className="col-sm-3 col-lg-2 col-xl-auto text-nowrap text-capitalize-first">
                {values.date && format(values.date, 'eeee', { locale: sv })} den
                {/* {values.date &&
                  values.date.toDateString() == today.toDateString() &&
                  'idag, '}
                den */}
              </div>

              <div className="col-sm-9 col-lg-2 col-xl-2">
                <label htmlFor="date" className="form-label visually-hidden">
                  datum
                </label>
                <Field
                  className="form-control text-dark w-100"
                  defaultValue={today}
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
              <div className="col-sm-9 col-lg-6 col-xl-4">
                <label htmlFor="dish" className="form-label visually-hidden">
                  rätt
                </label>
                <Field
                  className="form-control text-dark w-100"
                  name="dish"
                  items={dishes}
                  component={DownshiftInput}
                  placeholder="Skriv för att söka eller lägga till en rätt..."
                />
                <Error name="dish" />
              </div>
              <div className="col-sm-3 col-lg-2 col-xl-auto">till </div>
              <div className="col-sm-9 col-lg-2 col-xl-auto">
                <label htmlFor="type" className="form-label visually-hidden">
                  typ av mål
                </label>
                <Field
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
              <div className="col-lg-2 col-xl-auto"> </div>
              <div className="buttons col-sm col-lg-6 col-xl-1">
                <button
                  type="submit"
                  className="btn btn-dark text-nowrap overflow-hidden w-100"
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
                  {!submitting && (
                    <span style={{ fontWeight: 500 }}>Skapa</span>
                  )}
                </button>
                {/* <button
                className="btn btn-dark w-100 text-nowrap overflow-hidden"
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}>
                Reset
              </button> */}
              </div>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default MealForm;
