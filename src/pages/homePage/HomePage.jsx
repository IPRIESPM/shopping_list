import React from 'react';
import { Link } from 'react-router-dom';
import { PersonHeart } from 'react-bootstrap-icons';
import './homePage.css';

function HomePage() {
  return (
    <article>
      <h1>Hungry</h1>
      <p>
        Tu asistente inteligente para
        las compras del supermercado
      </p>
      <Link to="/login" className="button">
        <PersonHeart />
        Iniciar sesión
      </Link>
    </article>
  );
}

export default HomePage;
