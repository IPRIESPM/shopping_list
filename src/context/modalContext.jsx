/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
  // Un contexto para mostrar un modal.

  const [modalStatus, setActive] = useState(null);

  // Función switch para cambiar el estado del modal.
  const changeModal = () => {
    setActive(!modalStatus);
  };

  const values = {
    modalStatus,
    changeModal,
  };

  /*
    Devolvemos el contexto con los valores
    que hemos creado.
  */

  return (
    <ModalContext.Provider value={values}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
