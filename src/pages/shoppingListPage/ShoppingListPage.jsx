import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Basket, PlusCircle } from 'react-bootstrap-icons';
import { ShoppingListContext } from '../../context/shoppingListContext';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import ErrorComponent from '../../components/errorComponent/ErrorComponent';
import { ModalContext } from '../../context/modalContext';
import ModalComponent from '../../components/modalComponent/ModalComponent';
import ButtonComponent from '../../components/buttonComponent/ButtonComponent';
import './shoppingListPage.css';

function ShoppingListPage() {
  // Página para ver las listas de la compra.
  const {
    getShoppingLists, shoppingLists, loadingShoppingLists, errorShoppingLists, errorMessage,
  } = useContext(ShoppingListContext);

  // Nos traemos el estado del modal y la función para cambiarlo.
  const { modalStatus, changeModal } = useContext(ModalContext);

  // Función para cambiar el estado del modal.
  const handleButton = () => {
    changeModal();
  };

  // Cuando se monte el componente,
  // cambiamos el título de la página y traemos las listas de la compra.
  useEffect(() => {
    document.title = 'Listas de la compra - Hungry';
    getShoppingLists();
    return () => {
      document.title = 'Hungry';
    };
  }, []);

  return (
    <section className="shopping-list-page">
      <header>
        <h2>Listado de la compra</h2>
      </header>
      <nav>
        <ButtonComponent
          type="button"
          cancel={false}
          icon={<PlusCircle />}
          size="large"
          action={handleButton}
        />
      </nav>

      {modalStatus && <ModalComponent modalTitle="Crear nueva lista" modalType="shoppingList" />}
      {loadingShoppingLists && <LoadingComponent message="Cargando listas" />}

      {errorShoppingLists && <ErrorComponent message={errorMessage} />}

      {((!loadingShoppingLists && !errorShoppingLists) && shoppingLists) && (
        <ul>
          {shoppingLists.map((ShoppingList) => (
            <li key={ShoppingList.id}>
              <Link to={`/shopping_list/${ShoppingList.id}`}>
                <Basket />
                <b>
                  {ShoppingList.name}
                </b>
                <p>{ShoppingList.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

    </section>
  );
}

export default ShoppingListPage;
