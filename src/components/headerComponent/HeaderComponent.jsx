import React from 'react';
import './headerComponent.css';
import { Link } from 'react-router-dom';

function HeaderComponent() {
  return (
    <header>
      <Link to="/"><h1>Hungry</h1></Link>
    </header>
  );
}

export default HeaderComponent;
