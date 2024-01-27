import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CarFrontFill, PencilSquare, Trash,
} from 'react-bootstrap-icons';
import { ShoppingListContext } from '../../../context/shoppingListContext';
import { ModalContext } from '../../../context/modalContext';
import LoadingComponent from '../../../components/loadingComponent/LoadingComponent';
import ErrorComponent from '../../../components/errorComponent/ErrorComponent';
import ShoppingListProductsComponent from '../../../components/shoppingListComponent/shoppingListProducts/ShoppingListProductsComponent';
import ButtonComponent from '../../../components/buttonComponent/ButtonComponent';
import ModalComponent from '../../../components/modalComponent/ModalComponent';
import './shoppingListDetailsPage.css';

function ShoppingListDetailsPage() {
  //  Página para ver los detalles de una lista de la compra.

  // Obtenemos el id de la lista de la compra de la url.
  const { id } = useParams();
  // Nos traemos el estado del modal y la función para cambiarlo.
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
    errorMessage,
  } = useContext(ShoppingListContext);

  // Obtenemos el peso de la lista de la compra.
  const shoppingListWeight = getShoppingListWeight();
  // Comprobamos si necesitamos coche para transportar la lista de la compra.
  // Si el peso es mayor de 10kg, necesitamos coche.
  const needCar = isCarNeeded(shoppingListWeight);

  // Nos traemos el estado del modal y la función para cambiarlo.
  const { modalStatus, changeModal } = useContext(ModalContext);

  // Función encargada de eliminar la lista de la compra.
  const handleDelete = async () => {
    // Eliminamos la lista de la compra.
    const response = await deleteShoppingList(id);
    // Si no se ha podido eliminar, devolvemos false.
    // Si se ha podido eliminar, redirigimos a la página de listas de la compra.
    if (response) navigate('/shopping_list');
  };

  // Función para cambiar el estado del modal.
  const handleAdd = () => {
    changeModal();
  };

  // Cuando se monte el componente,
  // cambiamos el título de la página y traemos la lista de la compra.
  // Además, si no hay id, redirigimos a la página de listas de la compra.
  useEffect(() => {
    if (!id) navigate('/shopping_list');
    (async () => {
      await getShoppingListByID(id);
    })();
  }, []);

  return (
    <section className="shopping-list-details-page">
      {modalStatus && <ModalComponent modalTitle="Añadir producto" modalType="productList" />}
      { shoppingListSelected && (
        <header>
          <ButtonComponent
            type="button"
            cancel
            icon={<Trash />}
            size="small"
            action={handleDelete}
          />
          <h1>
            {' '}
            Ficha de
            {' '}
            {shoppingListSelected.name}
            {' '}
          </h1>
          {' '}
          <ButtonComponent
            type="button"
            cancel={false}
            icon={<PencilSquare />}
            action={handleAdd}
            size="small"
          />

        </header>
      )}

      {loadingShoppingLists && <LoadingComponent message="Cargando lista" />}
      {errorShoppingLists && <ErrorComponent message={errorMessage} />}
      {((!loadingShoppingLists && !errorShoppingLists)
        && (shoppingListSelected.products.length > 0)) && (
        <ShoppingListProductsComponent products={shoppingListSelected.products} />
      )}
      {((!loadingShoppingLists && !errorShoppingLists)
        && (shoppingListSelected.products.length > 0)) && (
        <section className="total">
          <hr />
          <p>
            ¿Necesitas
            {' '}
            <CarFrontFill />
            {' '}
            ?
            {' '}
            <b>
              {needCar ? 'Si' : 'No'}
            </b>
          </p>
          <p>
            Peso total:
            <b>
              {getShoppingListWeight() / 1000}
              kg
            </b>
          </p>
          <p>
            Precio total:
            <b>
              {getShoppingListPrice()}
              €
            </b>
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
