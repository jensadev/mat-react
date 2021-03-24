import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
      <main className="d-flex flex-column container mt-3">
        <div className="row">
          <div className="col-md-5 d-flex flex-column justify-content-center">
            <h1 className="display-4">Fluid jumbotron</h1>
            <p className="lead">
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </div>
          <div className="col-md-7">
            <figure className="figure w-100">
              <img
                src="/images/fisk.svg"
                alt="fisk"
                className="figure-img img-fluid"
              />
              <figcaption className="figure-caption text-end">
                <a
                  href="https://iconscout.com/illustrations/cooking-food"
                  target="_blank"
                  rel="noreferrer">
                  Cooking food Illustration
                </a>{' '}
                by{' '}
                <a
                  href="https://iconscout.com/contributors/tribhuvansuthar"
                  target="_blank"
                  rel="noreferrer">
                  Tribhuvan Suthar
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </main>
    );
  }
}

export default Content;
