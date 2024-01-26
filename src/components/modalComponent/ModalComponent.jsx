/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import './modalComponent.css';
import { ModalContext } from '../../context/modalContext';
import ProductModal from './productModal/ProductModal';
import ShoppingListModal from './shoppingListModal/ShoppingListModal';
import AddProductShoppingList from '../shoppingListComponent/addProductShoppingList/AddProductShoppingList';

function ModalComponent({ modalTitle, modalType = 'product' }) {
  // Nostraemos el contexto del modal.
  const { modalStatus, changeModal = 'product' } = useContext(ModalContext);
  // Función callback para cerrar el modal.
  const closeModal = () => {
    changeModal();
  };

  useEffect(() => {
    // Cambiamos el título de la página.
    document.title = `${modalTitle} - Hungry`;

    return () => {
      // Cuando se desmonte el componente cambiamos el título de la página.
      document.title = 'Hungry';
    };
  }, []);

  return (
    <section className={`modal ${modalStatus}`}>
      <div className="modal-container">

        {modalType === 'product' && (
          <ProductModal closeModal={closeModal} />
        )}

        {modalType === 'shoppingList' && (
          <ShoppingListModal closeModal={closeModal} />
        )}

        {modalType === 'productList' && (
          <AddProductShoppingList closeModal={closeModal} />
        )}
      </div>
    </section>
  );
}

export default ModalComponent;
