import React from 'react';
import { Link } from 'react-router-dom';
import { Basket, JournalText } from 'react-bootstrap-icons';
import './navComponent.css';

function NavComponent() {
  return (
    // Un componente que muestra un menú de navegación.
    // con dos enlaces a las rutas de productos y listas de la compra.
    <nav className="active">
      <Link to="/products">
        <JournalText />
        Productos
      </Link>
      <Link to="/shopping_list">
        <Basket />
        Listas de la compra
      </Link>
    </nav>
  );
}

export default NavComponent;
