import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="nav-scroller bg-transparent box-shadow">
      <nav className="nav nav-underline">
        <Link className="nav-link active" to="#">
          Dashboard
        </Link>
        <Link className="nav-link" to="#">
          Friends
          <span className="badge badge-pill bg-light align-text-bottom">
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

export default Dashboard;
