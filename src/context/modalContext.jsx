/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modalStatus, setActive] = useState(null);

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
