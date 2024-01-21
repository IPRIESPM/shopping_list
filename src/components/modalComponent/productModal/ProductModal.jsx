/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../../context/productsContext';

function ProductModal({ closeModal }) {
  const { selectedProduct, deleteProduct } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleCLose = () => {
    const result = deleteProduct();
    if (result) {
      closeModal();
      navigate('/products');
    }
  };
  return (
    <>
      <header className="modal-header">
        <h2 className="modal-title">
          Eliminar
          {' '}
          {selectedProduct.name}
          {' '}
        </h2>
      </header>
      <article className="modal-body">
        <p className="modal-text">
          {`¿Estás seguro que deseas eliminar ${selectedProduct.name}?`}
        </p>
      </article>
      <footer className="modal-footer">
        <button type="button" className="modal-btn" onClick={handleCLose}>Aceptar</button>
        <button type="button" className="modal-btn cancel" onClick={closeModal}>Cancelar</button>
      </footer>
    </>
  );
}

export default ProductModal;
