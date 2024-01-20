/* eslint-disable react/prop-types */
import React from 'react';
import './loadingComponent.css';

function loadingComponent({ message }) {
  return (
    <section className="loading">
      <p className="loading">{message}</p>
    </section>
  );
}

export default loadingComponent;
