// import 'moment/locale/sv';
import './MealForm.scss';
import 'react-datepicker/dist/react-datepicker.css';

// // import { format } from 'date-fns';
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
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };
  const validate = (values) => {
    const errors = {};
    if (!values.type) {
      errors.type = 'Required';
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
        touched && error ? <span>{error}</span> : null
      }
    />
  );
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            {/* <div>
              <label htmlFor="firstName">First Name</label>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
              />
              <Error name="firstName" />
            </div> */}
            <div>
              <p>Till</p>
            </div>
            <div>
              <label htmlFor="type" className="form-label visually-hidden">
                måltidstyp
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
            <div>
              <p>
                {values.date &&
                  values.date.toDateString() == today.toDateString() &&
                  'idag, '}
                den
              </p>
            </div>
            <div>
              <label htmlFor="date" className="form-label visually-hidden">
                datum
              </label>
              <Field
                className="form-control text-dark w-100"
                defaultValue={today}
                name="date"
                locale={sv}
                dateFormat="PPP"
                component={DatePickerAdapter}
              />
              <Error name="date" />
            </div>
            <div>
              <p>
                {values.date && values.date > today
                  ? 'ska jag äta'
                  : 'har jag ätit'}
              </p>
            </div>
            <div>
              <label htmlFor="dish" className="form-label visually-hidden">
                måltid
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
            <div className="buttons">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-dark w-100 text-nowrap overflow-hidden">
                Skapa
              </button>
              {/* <button
                className="btn btn-dark w-100 text-nowrap overflow-hidden"
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}>
                Reset
              </button> */}
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default MealForm;

{
  /* <form onSubmit={handleSubmit(onSubmit)}>
<div className=" row ">
  <div className="col-sm-2">
    <p>Till</p>
  </div>
  <div className="col-sm-4">
    <select
      ref={register({ required: true })}
      defaultValue="3"
      name="type"
      className="form-select text-dark w-100"
      aria-label="Måltidstyp">
      <option value="1">Frukost</option>
      <option value="2">Lunch</option>
      <option value="3">Middag</option>
    </select>
    {errors.type && (
      <div className="invalid-feedback">
        <p>Fel</p>
      </div>
    )}
  </div>
  <div className="col-sm-2">
    <p>den</p>
  </div>
  <div className="col-sm-3">
    <label htmlFor="mealDate" className="form-label visually-hidden">
      Välj ett datum
    </label>
    <Controller
      // ref={register({ required: true })}
      control={control}
      name="date"
      defaultValue={new Date()}
      render={(props) => (
        <ReactDatePicker
          autoComplete="off"
          className="form-control text-dark w-100 mb-3"
          locale={sv}
          dateFormat="PPP"
          onChange={(e) => props.onChange(e)}
          selected={props.value}
          closeOnScroll={true}
        />
      )}
    />
    {errors.date && (
      <div className="invalid-feedback">
        <p>Datum</p>
      </div>
    )}
  </div>
</div>
<div className=" row ">
  <div className="col-sm-2">
    <p>har jag ätit</p>
  </div>
  <div className="col-sm-7">
    <Controller
      control={control}
      defaultValue=""
      name="dish"
      // eslint-disable-next-line no-unused-vars
      render={({ ref, ...rest }) => <Dishsearch {...rest} />}
    />
    {errors.type && (
      <div className="invalid-feedback">
        <p>rätt</p>
      </div>
    )}
  </div>
  <div className="col-sm-2">
    <button
      className="btn btn-dark w-100 text-nowrap overflow-hidden mb-3"
      type="submit">
      Skapa
    </button>
  </div>
</div>
</form> */
}
