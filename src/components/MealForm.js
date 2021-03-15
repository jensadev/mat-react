import './MealForm.scss';
import 'react-datepicker/dist/react-datepicker.css';

import { useAuth0 } from '@auth0/auth0-react';
import { format } from 'date-fns';
import sv from 'date-fns/locale/sv';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('sv', sv);

import { Field, Form } from 'react-final-form';

import DownshiftInput from './DownshiftInput';

function MealForm(props) {
  const [today] = useState(new Date());
  const apiOrigin = 'http://localhost:8080/api';
  const [dishes, setDishes] = useState([]);
  // const [state, setState] = useState({
  //   showResult: false,
  //   apiMessage: '',
  //   error: null
  // });

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();

        const response = await fetch(`${apiOrigin}/users/dishes`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseData = await response.json();

        // console.table(responseData);
        if (responseData) {
          setDishes(responseData);
        }
        // setState({
        //   ...state,
        //   showResult: responseData == false ? false : true,
        //   apiMessage: responseData
        // });
      } catch (error) {
        console.log(error);
        // setState({
        //   ...state,
        //   error: error.error
        // });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently]);

  const DatePickerAdapter = ({ input: { onChange, value }, ...rest }) => (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date)}
      {...rest}
    />
  );

  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    // await sleep(1000);
    window.alert(JSON.stringify(values, 0, 2));

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

      props.parentCallback(responseData);
      // setState({
      //   ...state,
      //   showResult: responseData == false ? false : true,
      //   apiMessage: responseData
      // });
    } catch (error) {
      console.error(error);
      // setState({
      //   ...state,
      //   error: error.error
      // });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.type_id) {
      errors.type_id = 'Required';
    } else if (isNaN(values.type_id)) {
      errors.type_id = 'Must be a number';
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
              </div>
              <div className="col-sm-9 col-lg-2 col-xl-2">
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
              <div className="col-sm-9 col-lg-6 col-xl-4">
                <label htmlFor="dish" className="form-label visually-hidden">
                  rätt
                </label>
                <Field
                  className="form-control text-dark w-100"
                  id="dish"
                  name="dish"
                  items={dishes ? dishes : []}
                  component={DownshiftInput}
                  placeholder="Skriv för att söka eller lägga till en rätt..."
                />
                <Error name="dish" />
              </div>
              <div className="col-sm-3 col-lg-2 col-xl-auto">till </div>
              <div className="col-sm-9 col-lg-2 col-xl-auto">
                <label htmlFor="type_id" className="form-label visually-hidden">
                  typ av mål
                </label>
                <Field
                  id="type_id"
                  name="type_id"
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
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
  );
}

export default MealForm;
