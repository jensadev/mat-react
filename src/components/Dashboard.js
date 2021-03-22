import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="my-3 p-3 bg-white rounded box-shadow text-dark">
      <h6 className="border-bottom border-gray pb-2 mb-0">Förslag</h6>
      <div className="media text-muted pt-3">
        <img
          data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1"
          alt=""
          className="mr-2 rounded"
        />
        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <div className="d-flex justify-content-between align-items-center w-100">
            <strong className="text-gray-dark">Full Name</strong>
            <Link to="#">Follow</Link>
          </div>
          <span className="d-block">@username</span>
        </div>
      </div>
      <div className="media text-muted pt-3">
        <img
          data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1"
          alt=""
          className="mr-2 rounded"
        />
        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <div className="d-flex justify-content-between align-items-center w-100">
            <strong className="text-gray-dark">Full Name</strong>
            <Link to="#">Follow</Link>
          </div>
          <span className="d-block">@username</span>
        </div>
      </div>
      <div className="media text-muted pt-3">
        <img
          data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1"
          alt=""
          className="mr-2 rounded"
        />
        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <div className="d-flex justify-content-between align-items-center w-100">
            <strong className="text-gray-dark">Full Name</strong>
            <Link to="#">Follow</Link>
          </div>
          <span className="d-block">@username</span>
        </div>
      </div>
      <small className="d-block text-right mt-3">
        <Link to="#">All suggestions</Link>
      </small>
    </div>
  );
}

export default Dashboard;
