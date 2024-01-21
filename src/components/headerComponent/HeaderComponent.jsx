import React, { useContext, useEffect } from 'react';
import './headerComponent.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function HeaderComponent() {
  const { user, logOut, checkUserLoggedLocal } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      await checkUserLoggedLocal();
    })();
  }, []);
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
