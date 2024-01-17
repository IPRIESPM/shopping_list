import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Basket, JournalText } from 'react-bootstrap-icons';
import './navComponent.css';
import { UserContext } from '../../context/userContext';

function NavComponent() {
  // Nos traemos los estados del contexto
  const { user } = useContext(UserContext);

  // Si el usuario no está logueado, no mostramos el menú.
  return (
    <nav className={user && 'active'}>
      {user && (
        <>
          <Link to="/products">
            <JournalText />
            Productos
          </Link>
          <Link to="/shopping_list">
            <Basket />
            Listas de la compra
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavComponent;
