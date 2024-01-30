import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Basket, JournalText } from 'react-bootstrap-icons';
import { UserContext } from '../../context/userContext';
import './navComponent.css';

function NavComponent() {
  const { user } = useContext(UserContext);
  return user && (
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
