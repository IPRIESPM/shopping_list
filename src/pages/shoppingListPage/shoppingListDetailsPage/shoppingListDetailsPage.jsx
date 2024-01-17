import React, { useContext, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';

function ShoppingListDetailsPage() {
  const { user } = useContext(UserContext);

  useEffect(
    () => {
      if (!user) {
        redirect('/');
      }
    },
    [],
  );
  return (
    <div>
      <h1>Sección en construcción</h1>
      <p>Esta sección está en construcción. Vuelve en unos días.</p>
    </div>
  );
}

export default ShoppingListDetailsPage;
