/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Field, Form } from 'react-final-form';
// import { Link } from 'react-router-dom';

// import AuthService from '../services/auth';

function Login() {
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
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  const required = (value) => (value ? undefined : 'Required');
  // const composeValidators = (...validators) => (value) =>
  //   validators.reduce(
  //     (error, validator) => error || validator(value),
  //     undefined
  //   );

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Required';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        if (!values.confirm) {
          errors.confirm = 'Required';
        } else if (values.confirm !== values.password) {
          errors.confirm = 'Must match';
        }
        return errors;
      }}
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="username">
            {({ input, meta }) => (
              <div>
                <label>E-post</label>
                <input {...input} type="text" placeholder="E-post" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="password">
            {({ input, meta }) => (
              <div>
                <label>Lösenord</label>
                <input {...input} type="password" placeholder="Lösenord" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="confirm">
            {({ input, meta }) => (
              <div>
                <label>Upprepa lösenord</label>
                <input
                  {...input}
                  type="password"
                  placeholder="Upprepa lösenord"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Registrera dig
            </button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
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
