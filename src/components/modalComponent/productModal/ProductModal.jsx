import React from 'react';

function ProductModal({ closeModal }) {
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
        <button type="button" className="modal-btn" onClick={acceptModal}>Aceptar</button>
        <button type="button" className="modal-btn cancel" onClick={closeModal}>Cancelar</button>
      </footer>
    </>
  );
}

export default ProductModal;
