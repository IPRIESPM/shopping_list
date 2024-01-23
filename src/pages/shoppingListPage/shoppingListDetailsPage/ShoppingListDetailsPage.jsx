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
    getShoppingListByID, shoppingListSelected, loadingShoppingLists, errorShoppingLists,
  } = useContext(ShoppingListContext);
  useEffect(() => {
    if (!id) navigate('/shopping-lists');
    getShoppingListByID(id);
    console.log('ShoppingListDetailsPage', getShoppingListByID(id));
  }, []);
  return (
    <section className="shopping-list-details-page">
      <h1>
        Ficha de
        {' '}
        {shoppingListSelected.name}
      </h1>
      {loadingShoppingLists && <LoadingComponent message="Cargando lista" />}
      {errorShoppingLists && <ErrorComponent message="Error al cargar las lista" />}
      {((!loadingShoppingLists && !errorShoppingLists) && shoppingListSelected) && (
        <ProductListComponent products={shoppingListSelected.products} />
      )}
    </section>
  );
}

export default ShoppingListDetailsPage;
