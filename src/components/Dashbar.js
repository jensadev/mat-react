import { Link } from 'react-router-dom';

function Dashbar() {
  return (
    <div className="nav-scroller bg-transparent box-shadow">
      <nav className="nav nav-underline" aria-label="Secondary navigation">
        <Link className="nav-link active" aria-current="page" to="#">
          Dashboard
        </Link>
        <Link className="nav-link" to="#">
          Friends
          <span className="badge bg-light text-dark rounded-pill align-text-bottom">
            27
          </span>
        </Link>
        <Link className="nav-link" to="#">
          Explore
        </Link>
        <Link className="nav-link" to="#">
          Suggestions
        </Link>
        <Link className="nav-link" to="#">
          Link
        </Link>
        <Link className="nav-link" to="#">
          Link
        </Link>
        <Link className="nav-link" to="#">
          Link
        </Link>
        <Link className="nav-link" to="#">
          Link
        </Link>
        <Link className="nav-link" to="#">
          Link
        </Link>
      </nav>
    </div>
  );
}

export default Dashbar;
