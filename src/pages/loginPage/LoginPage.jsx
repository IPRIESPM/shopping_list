import React, { useState, useContext, useEffect } from 'react';
import { EnvelopeAtFill } from 'react-bootstrap-icons';
import './loginPage.css';
import { UserContext } from '../../context/userContext';
import supabase from '../../database/supabase';

function LoginPage() {
  const { user, logIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      console.log(data, error);
      setProducts(data);
    };

    getProduct();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (!data.email || !data.password) {
      setErrorLogin(true);
      setLoading(false);
      return false;
    }

    data.email = data.email.trim();
    data.password = data.password.trim();
    logIn(data);
    setLoading(false);
    setErrorLogin(false);
    return true;
  };

  return (
    <>
      {
        console.log(products)
      }
      {!user && !loading && !errorLogin && (
        <section>
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="email">
                <EnvelopeAtFill />
                <input type="email" id="email" name="email" placeholder="usuario@usuario" />
              </label>
              <label htmlFor="password">
                <EnvelopeAtFill />
                <input type="password" id="password" name="password" placeholder="contraseña" />
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

      {errorLogin && (
        <section>
          <h1>Ha ocurrido un error</h1>
        </section>
      )}

      {user && !errorLogin && (
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
