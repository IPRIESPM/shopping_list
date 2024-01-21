/* eslint-disable react/prop-types */
import React from 'react';
import './loadingComponent.css';

function loadingComponent({ message }) {
  // Mostramos un mensaje y un spinner de carga.
  return (
    <section className="loading">
      <p className="message">{message}</p>
      <div className="loading" />
    </section>
  );
}

export default loadingComponent;
