/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';

import AuthService from '../services/auth';

function Login(props) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);

  // const onChangeEmail = (e) => {
  //   const email = e.target.value;
  //   setEmail(email);
  // };

  // const onChangePassword = (e) => {
  //   const password = e.target.value;
  //   setPassword(password);
  // };

  // const handleSignIn = (e) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   const user = {
  //     email: email,
  //     password: password
  //   };
  //   AuthService.login(user).then(
  //     (res) => {
  //       console.log(res);
  //       setLoading(false);
  //       props.history.push('/');
  //       window.location.reload();
  //     },
  //     (error) => {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   );
  // };

  const onSubmit = async (values) => {
    const user = {
      email: values.email,
      password: values.password
    };
    AuthService.login(user).then(
      (res) => {
        if (res === true) {
          window.flash(`Loggar in`, 'success');
          props.history.push('/');
          window.location.reload();
        } else {
          window.flash(`Någonting gick fel. ${res.body}`, 'danger');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const isValidEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value) ? undefined : 'Invalid Email';
  };

  const required = (value) => (value ? undefined : 'Required');
  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

  return (
    <div className="d-flex flex-column align-items-center w-100 h-100 text-center">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting }) => (
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3">Välkommen</h1>
            <Field
              name="email"
              validate={composeValidators(required, isValidEmail)}>
              {({ input, meta }) => (
                <div className="mb-3">
                  <label htmlFor="email" className="visually-hidden">
                    E-post
                  </label>
                  <input
                    className="form-control text-dark"
                    {...input}
                    type="text"
                    placeholder="E-post"
                  />
                  {meta.error && meta.touched && (
                    <div
                      className="invalid-feedback"
                      style={{ display: 'block' }}>
                      {meta.error}
                    </div>
                  )}
                </div>
              )}
            </Field>
            <Field name="password" validate={required}>
              {({ input, meta }) => (
                <div className="mb-3">
                  <label htmlFor="password" className="visually-hidden">
                    Lösenord
                  </label>
                  <input
                    className="form-control text-dark"
                    {...input}
                    type="password"
                    placeholder="Lösenord"
                  />
                  {meta.error && meta.touched && (
                    <div
                      className="invalid-feedback"
                      style={{ display: 'block' }}>
                      {meta.error}
                    </div>
                  )}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button
                className="btn btn-primary w-100 "
                type="submit"
                disabled={submitting}>
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
                {!submitting && <span>Logga in</span>}
              </button>
            </div>
          </form>
        )}
      />
      <p className="mt-3 mb-3">
        <Link to={'/signup'}>Registrera dig</Link>
      </p>
    </div>
  );
}
/* 

    <div className="d-flex flex-column align-items-center w-100 h-100 text-center">
      <form className="form-signin" onSubmit={handleSignIn}>
        <h1 className="h3 mb-3">Välkommen</h1>
        <div className="mb-3">
          <label htmlFor="email" className="visually-hidden">
            E-post
          </label>
          <input
            type="email"
            id="email"
            className="form-control text-dark"
            placeholder="E-post"
            name="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="visually-hidden">
            Lösenord
          </label>
          <input
            type="password"
            id="password"
            className="form-control text-dark"
            placeholder="Lösenord"
            name="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <button className="w-100 btn btn-light text-primary" disabled={loading}>
          {loading && (
            <div className="d-flex align-items-center justify-content-center">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"></span>{' '}
              Laddar...
            </div>
          )}
          {!loading && <span>Logga in</span>}
        </button>
        <p className="mt-3 mb-3">
          <Link to={'/signup'}>Registrera dig</Link>
        </p>
      </form>
    </div> */

export default Login;
