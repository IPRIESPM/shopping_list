import React, { useContext } from 'react';
import './modalComponent.css';
import { ModalContext } from '../../context/modalContext';
import { ProductsContext } from '../../context/productsContext';

function ModalComponent() {
  const { modalStatus, changeModal } = useContext(ModalContext);
  const { selectedProduct, deleteProduct } = useContext(ProductsContext);
  const closeModal = () => {
    changeModal();
  };

  const handleDelete = () => {
    if (deleteProduct()) {
      closeModal();
    }
  };
  return (
    <section className={`modal ${modalStatus}`}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            Eliminar
            {' '}
            {selectedProduct.name}
            {' '}
          </h2>
        </div>
        <div className="modal-body">
          <p className="modal-text">
            {`¿Estás seguro que deseas eliminar ${selectedProduct.name}?`}
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" className="modal-btn" onClick={handleDelete}>Aceptar</button>
          <button type="button" className="modal-btn cancel" onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </section>
  );
}

export default ModalComponent;
