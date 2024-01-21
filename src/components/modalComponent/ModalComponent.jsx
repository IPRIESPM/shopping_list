/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import './modalComponent.css';
import { ModalContext } from '../../context/modalContext';
import ProductModal from './productModal/ProductModal';

function ModalComponent({ modalTitle }) {
  const { modalStatus, changeModal } = useContext(ModalContext);

  const closeModal = () => {
    changeModal();
  };

  useEffect(() => {
    document.title = `${modalTitle} - Hungry`;

    return () => {
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
