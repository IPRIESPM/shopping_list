/* eslint-disable react/prop-types */
import React from 'react';
import './errorComponent.css';

function ErrorComponent({ message }) {
  return (
    <section className="error">
      <p className="error">{message}</p>
    </section>
  );
}

export default ErrorComponent;
