/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import useUser from '../hoocks/useUser';

const UserContext = createContext();

function UserProvider({ children }) {
  // Llamamos al hook useFilms que nos devuelve
  // un objeto con las películas, el estado de carga
  // y un método para limpiar las películas.
  const {
    user, loading, error, clearUser, logUser,
  } = useUser();

  // Creamos un método para limpiar las películas.
  const logOut = () => {
    clearUser();
  };

  const logIn = (email) => {
    logUser(email);
  };

  // Creamos un objeto con los valores que queremos compartir
  const values = {
    user,
    loading,
    error,
    logOut,
    logIn,
  };

  // Retornamos el contexto con los valores
  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
