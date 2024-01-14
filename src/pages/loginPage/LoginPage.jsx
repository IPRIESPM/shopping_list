import React, { useState, useContext } from 'react';
import { EnvelopeAtFill } from 'react-bootstrap-icons';
import './loginPage.css';
import { UserContext } from '../../context/userContext';

function LoginPage() {
  const { user, logIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (!data.email) {
      setError(true);
      setLoading(false);
      return false;
    }

    data.email = data.email.trim();
    logIn(data.email);
    setLoading(false);
    setError(false);
    return true;
  };

  return (
    <>
      {!user && !loading && !error && (
        <section>
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="email">
                <EnvelopeAtFill />
                <input type="email" id="email" name="email" placeholder="usuario@usuario" />
              </label>
            </fieldset>
            <input type="submit" value="Acceder" />
          </form>
        </section>
      )}

      {loading && (
        <section>
          <h1>Cargando...</h1>
        </section>
      )}

      {error && (
        <section>
          <h1>Ha ocurrido un error</h1>
        </section>
      )}

      {user && !error && (
        <section>
          <h1>
            Bienvenido
            {user}
          </h1>
        </section>
      )}
    </>
  );
}

export default LoginPage;
