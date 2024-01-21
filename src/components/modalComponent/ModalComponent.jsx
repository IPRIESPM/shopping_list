/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import './modalComponent.css';
import { ModalContext } from '../../context/modalContext';
import ProductModal from './productModal/ProductModal';

function ModalComponent({ modalTitle }) {
  // Nostraemos el contexto del modal.
  const { modalStatus, changeModal } = useContext(ModalContext);
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
        <ProductModal closeModal={closeModal} />
      </div>
    </section>
  );
}

export default ModalComponent;
