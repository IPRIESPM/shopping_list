import React from 'react';
import { Link } from 'react-router-dom';

import './homePage.css';

function HomePage() {
  /*
    En este caso, he usado iconos de la librería react-bootstrap-icons
    y los enlaces los he hecho con el componente Link de react-router-dom
  */

  return (
    <article>
      <h1>Hungry</h1>
      <p>
        Tu asistente inteligente para
        las compras del supermercado
      </p>

      <Link to="/products" className="button">
        Productos
      </Link>

    </article>
  );
}

export default HomePage;
