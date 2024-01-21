import React, { useContext, useEffect } from 'react';
import './headerComponent.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function HeaderComponent() {
  // Nos traemos el contexto del usuario.
  const { user, logOut, checkUserLoggedLocal } = useContext(UserContext);
  // Comprobamos si el usuario esta logueado.
  useEffect(() => {
    (async () => {
      await checkUserLoggedLocal();
    })();
  }, []);
  // Si el usuario esta logueado mostramos el botón de cerrar sesión.
  // Si no esta logueado mostramos el botón de iniciar sesión.
  return (

    <header>
      <Link to="/"><h1>Hungry</h1></Link>
      {!user && (
      <Link to="/login">
        <button type="button">Iniciar sesión</button>
      </Link>
      )}

      {user && (
        <button type="button" onClick={logOut}>Cerrar sesión</button>
      )}
    </header>
  );
}

export default HeaderComponent;
