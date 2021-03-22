// import './index.css';

import { CloseRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import Bus from '../utils/bus';

function Flash() {
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState('');
  let [type, setType] = useState('');

  useEffect(() => {
    Bus.addListener('flash', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  useEffect(() => {
    if (document.querySelector('.close') !== null) {
      document
        .querySelector('.close')
        .addEventListener('click', () => setVisibility(false));
    }
  });

  return (
    visibility && (
      <div
        className={`alert alert-${type} fade show`}
        role="alert"
        style={{ paddingLeft: '1.5rem' }}>
        {message}
        <button
          type="button"
          className={`btn btn-outline--${type} close`}
          aria-label="Close">
          <CloseRounded />
        </button>
      </div>
    )
  );
}

export default Flash;
