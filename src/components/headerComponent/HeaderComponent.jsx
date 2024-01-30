import React, { useContext } from 'react';
import './headerComponent.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function HeaderComponent() {
  // Nos traemos el contexto del usuario.
  const { user, logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const result = await logOut();
    if (result) {
      navigate('/');
    }
  };

  // Si el usuario esta logueado mostramos el botón de cerrar sesión.
  // Si no esta logueado mostramos el botón de iniciar sesión.
  return (

    <header className="header-component">
      <Link to="/"><h1>Hungry</h1></Link>
      {!user && (
      <Link to="/login">
        <button type="button">Iniciar sesión</button>
      </Link>
      )}

      {user && (
        <button type="button" onClick={handleLogOut}>Cerrar sesión</button>
      )}
    </header>
  );
}

export default HeaderComponent;
