import './Login.css';

function Login() {
  return (
    <div className="text-center h-100 d-flex align-items-center">
      <form className="form-signin">
        <h1 className="h3 mb-3 title">Please sign in</h1>
        <label htmlFor="inputEmail" className="visually-hidden">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
        />
        <label htmlFor="inputPassword" className="visually-hidden">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-light" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
