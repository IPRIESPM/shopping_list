import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingListContext } from '../../../context/shoppingListContext';
import LoadingComponent from '../../../components/loadingComponent/LoadingComponent';
import ErrorComponent from '../../../components/errorComponent/ErrorComponent';
import './shoppingListDetailsPage.css';
import ShoppingListProductsComponent from '../../../components/shoppingListComponent/shoppingListProducts/ShoppingListProductsComponent';

function ShoppingListDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getShoppingListByID,
    shoppingListSelected,
    loadingShoppingLists,
    errorShoppingLists,
    getShoppingListWeight,
    isCarNeeded,
    getShoppingListPrice,
    deleteShoppingList,
  } = useContext(ShoppingListContext);

  const shoppingListWeight = getShoppingListWeight();
  const needCar = isCarNeeded(shoppingListWeight);

  const handleDelete = async () => {
    const response = await deleteShoppingList(id);
    if (!response) return false;
    navigate('/shopping_list');
    return true;
  };

  useEffect(() => {
    if (!id) navigate('/shopping_list');
    (async () => {
      await getShoppingListByID(id);
    })();
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
          <button type="button" onClick={handleDelete}>Eliminar lista</button>
        </h1>
      )}
      {loadingShoppingLists && <LoadingComponent message="Cargando lista" />}
      {errorShoppingLists && <ErrorComponent message="Error al cargar las lista" />}
      {((!loadingShoppingLists && !errorShoppingLists)
        && (shoppingListSelected.products.length > 0)) && (
        <ShoppingListProductsComponent products={shoppingListSelected.products} />
      )}
      {((!loadingShoppingLists && !errorShoppingLists)
        && (shoppingListSelected.products.length > 0)) && (
        <section className="shopping-list-details-aside">
          <hr />
          <p>
            Peso total:
            {' '}
            {getShoppingListWeight() / 1000}
            {' '}
            kg
          </p>
          <p>
            ¿Necesitamos coche?
            {' '}
            {needCar ? 'Si' : 'No'}
          </p>
          <p>
            Precio total:
            {' '}
            {getShoppingListPrice()}
            {' '}
            €
          </p>
        </section>
      )}

      {((!loadingShoppingLists && !errorShoppingLists)
        && (shoppingListSelected.products.length === 0)) && (
        <ErrorComponent message="No hay productos en la lista" />
      )}
    </section>
  );
}

export default ShoppingListDetailsPage;
