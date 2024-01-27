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
    errorMessage,
  } = useContext(ShoppingListContext);

  const shoppingListWeight = getShoppingListWeight();
  const needCar = isCarNeeded(shoppingListWeight);

  const { modalStatus, changeModal } = useContext(ModalContext);

  const handleDelete = async () => {
    const response = await deleteShoppingList(id);
    if (!response) return false;
    navigate('/shopping_list');
    return true;
  };

  const handleAdd = () => {
    changeModal();
  };

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
