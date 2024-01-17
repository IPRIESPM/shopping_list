import React, { useContext } from 'react';
import './headerComponent.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function HeaderComponent() {
  // Nos traemos los estados del contexto
  const { user, logOut } = useContext(UserContext);
  // Si el usuario esta logueado, mostramos el botón de cerrar sesión.
  // Si no, mostramos el botón de iniciar sesión.
  return (
    <header>
      <Link to="/"><h1>Hungry</h1></Link>
      {user && (
        <div>
          <p>{user.email}</p>
          <button type="button" onClick={logOut}>Cerrar Sesión</button>
        </div>
      )}
      {!user && (
      <Link to="/login" className="button"> Iniciar Sesión</Link>
      )}
    </header>
  );
}

export default HeaderComponent;
