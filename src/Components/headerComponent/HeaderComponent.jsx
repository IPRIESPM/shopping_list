import React from 'react';
import { Link } from 'react-router-dom';
import './headerComponent.css';
import { PersonHeart } from 'react-bootstrap-icons';

function HeaderComponent() {
  return (
    <header>
      <Link to="/">
        <h1>Hungry</h1>
      </Link>
      <Link to="/login" className="button">
        <PersonHeart />
        Iniciar sesión
      </Link>
    </header>
  );
}

export default HeaderComponent;
