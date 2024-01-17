import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PersonHeart } from 'react-bootstrap-icons';
import './homePage.css';
import { UserContext } from '../../context/userContext';

function HomePage() {
  /*
    En la página principal, mostramos un mensaje de bienvenida
    y un botón para iniciar sesión, en caso de que el usuario
    ya esté logueado, mostramos un botón para ir a la lista
    de productos.

    En este caso, he usado iconos de la librería react-bootstrap-icons
    y los enlaces los he hecho con el componente Link de react-router-dom
  */

  // Obtenemos el usuario del contexto, para saber si está logueado o no.
  const { user } = useContext(UserContext);

  return (
    <article>
      <h1>Hungry</h1>
      <p>
        Tu asistente inteligente para
        las compras del supermercado
      </p>
      {
        user
        && (
        <Link to="/products" className="button">
          Productos
        </Link>
        )
      }
      {
        !user
        && (
        <Link to="/login" className="button">
          <PersonHeart />
          Iniciar Sesión
        </Link>
        )
      }
    </article>
  );
}

export default HomePage;
