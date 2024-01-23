import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingListContext } from '../../../context/shoppingListContext';
import LoadingComponent from '../../../components/loadingComponent/LoadingComponent';
import ErrorComponent from '../../../components/errorComponent/ErrorComponent';
import './shoppingListDetailsPage.css';
import ProductListComponent from '../../../components/products/productListComponent/ProductListComponent';

function ShoppingListDetailsPage() {
  const { id } = useParams();
  const { navigate } = useNavigate();
  const {
    getShoppingListByID,
    shoppingListSelected,
    loadingShoppingLists,
    errorShoppingLists,
    getProductsByShoppingListID,
  } = useContext(ShoppingListContext);

  const handleButton = async () => {
    const result = await getProductsByShoppingListID(shoppingListSelected.id);
    console.log(result);
  };

  useEffect(() => {
    if (!id) navigate('/shopping-lists');
    getShoppingListByID(id);
  }, []);

  return (
    <section className="shopping-list-details-page">
      { shoppingListSelected && (
        <h1>
          {' '}
          Ficha de
          {' '}
          {shoppingListSelected.name}
          {' '}
        </h1>
      )}
      {loadingShoppingLists && <LoadingComponent message="Cargando lista" />}
      {errorShoppingLists && <ErrorComponent message="Error al cargar las lista" />}
      {((!loadingShoppingLists && !errorShoppingLists) && shoppingListSelected) && (
        <ProductListComponent products={shoppingListSelected.products} />
      )}

      <button type="button" onClick={handleButton}>test</button>
    </section>
  );
}

export default ShoppingListDetailsPage;
