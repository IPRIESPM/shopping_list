import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ShoppingListDetailsPage() {
  const { id } = useParams();
  const { navigate } = useNavigate();

  useEffect(() => {
    if (!id) navigate('/shopping-lists');
  }, []);
  return (
    <section className="shopping-list-details-page">
      <h1>Sección en construcción</h1>
      <p>Esta sección está en construcción. Vuelve en unos días.</p>
    </section>
  );
}

export default ShoppingListDetailsPage;
