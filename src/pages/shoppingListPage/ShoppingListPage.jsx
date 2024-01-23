import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Basket, PlusCircle } from 'react-bootstrap-icons';
import { ShoppingListContext } from '../../context/shoppingListContext';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import ErrorComponent from '../../components/errorComponent/ErrorComponent';
import { ModalContext } from '../../context/modalContext';
import ModalComponent from '../../components/modalComponent/ModalComponent';
import './shoppingListPage.css';

function ShoppingListPage() {
  // Página para ver las listas de la compra.
  const {
    getShoppingLists, shoppingLists, loadingShoppingLists, errorShoppingLists,
  } = useContext(ShoppingListContext);

  const { modalStatus, changeModal } = useContext(ModalContext);

  const handleButton = () => {
    changeModal();
  };

  useEffect(() => {
    document.title = 'Listas de la compra - Hungry';
    getShoppingLists();
    return () => {
      document.title = 'Hungry';
    };
  }, []);

  return (
    <section className="shopping-list-page">
      <nav>
        <h2>Listado de la compra</h2>
        <button type="button" onClick={handleButton}>
          Nueva Lista
          <PlusCircle />
        </button>
      </nav>

      {modalStatus && <ModalComponent modalTitle="Crear nueva lista" modalType="shoppingList" />}
      {loadingShoppingLists && <LoadingComponent message="Cargando listas" />}

      {errorShoppingLists && <ErrorComponent message="Error al cargar las listas" />}

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
