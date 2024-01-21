import React, { useContext } from 'react';
import './headerComponent.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function HeaderComponent() {
  const { user, logOut } = useContext(UserContext);
  return (
    <header>
      <Link to="/"><h1>Hungry</h1></Link>
      {!user && (
      <Link to="/login">
        <button type="button" onClick={logOut}>Iniciar sesión</button>
      </Link>
      )}

      {user && (
        <button type="button">Cerrar sesión</button>
      )}
    </header>
  );
}

export default HeaderComponent;
