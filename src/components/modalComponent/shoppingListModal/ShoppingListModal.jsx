/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { ShoppingListContext } from '../../../context/shoppingListContext';
import ButtonComponent from '../../buttonComponent/ButtonComponent';
import './shoppingListModal.css';

function ShoppingListModal({ closeModal }) {
  const { createShoppingList } = useContext(ShoppingListContext);

  const handleCLose = () => {
    closeModal();
  };

  const resetInput = (event) => {
    event.target.setCustomValidity('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name } = event.target;

    if (name.value === '') {
      name.setCustomValidity('El nombre no puede estar vacío');
      name.reportValidity();
      return;
    }

    createShoppingList(event.target.name.value);
    closeModal();
  };
  return (
    <>
      <header className="modal-header">
        <h2 className="modal-title">
          Crear nueva lista
        </h2>
      </header>
      <article className="modal-body shopping-list-modal">
        <form onSubmit={handleSubmit}>
          {/*  <label htmlFor="name">
            Nombre */}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            onChange={resetInput}
            autoFocus
          />
          {/*    </label> */}
          <fieldset>
            <ButtonComponent
              type="submit"
              cancel={false}
              text="Crear"
              size="large"
            />

            <ButtonComponent
              type="button"
              cancel
              text="Cerrar"
              size="large"
              action={handleCLose}
            />
          </fieldset>
        </form>
      </article>
    </>
  );
}

export default ShoppingListModal;
