/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './loginPage.css';

function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };
  return (
    <section>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" />
        <button type="submit">Iniciar sesión</button>
      </form>
    </section>
  );
}

export default LoginPage;
