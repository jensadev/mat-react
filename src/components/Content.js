import React, { Component } from 'react';

import Fisk from '../images/fisk.svg';

class Content extends Component {
  render() {
    return (
      <main className="d-flex flex-column container mt-3">
        <div className="row">
          <div className="order-md-1 col-md-7">
            <figure className="figure w-100">
              <img src={Fisk} alt="fisk" className="figure-img img-fluid" />
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
          <div className="col-md-5 d-flex flex-column justify-content-center">
            <h1 className="display-4">Mat mat mat</h1>
            <p className="lead">Äta bör en annars dör hen...</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Content;
