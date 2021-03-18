import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
      <main className="h-100 d-flex flex-column container mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h1 className="display-4">Fluid jumbotron</h1>
              <p className="lead">
                This is a modified jumbotron that occupies the entire horizontal
                space of its parent.
              </p>
            </div>
            <div className="col-md-8">
              <img src="/images/fisk.svg" alt="fisk" />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Content;
