import './SignIn.scss';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../services/auth-service';
import Footer from './Footer';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    setLoading(true);
    AuthService.signIn(email, password).then(
      () => {
        setLoading(false);
        props.history.push('/');
        window.location.reload();
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
    //   () => {
    //     props.history.push('/profile');
    //     window.location.reload();
    //   },
    //   (error) => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setLoading(false);
    //     setMessage(resMessage);
    //   }
  };

  return (
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
            <span className="d-flex align-items-center justify-content-center">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"></span>{' '}
              Laddar...
            </span>
          )}
          {!loading && <span>Logga in</span>}
        </button>
        <p className="mt-3 mb-3">
          <Link to={'/signup'}>Registrera dig</Link>
        </p>
      </form>
      <Footer />
    </div>
  );
}

export default SignIn;
