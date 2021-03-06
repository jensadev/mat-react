import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="container py-3 w-100 mt-auto d-flex justify-content-between">
      <p>
        &copy; 2017–2021 Company, Inc. &middot; <Link to="#">Privacy</Link>{' '}
        &middot; <Link to="#">Terms</Link>
      </p>
      <p>
        <Link to="#">Back to top</Link>
      </p>
    </footer>
  );
}

export default Footer;
