/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useEffect, useState } from 'react';
import {
  getUserDB, loginUserDB, logoutUserDB, registerUserDB,
} from '../controller/user';
import supabaseConnection from '../config/supabase';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabaseConnection.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
  }, []);

  const registerUser = async (userData) => {
    const result = await registerUserDB(userData);

    if (!result) {
      return false;
    }
    return result;
  };

  /*
    Función asíncrona para iniciar sesión.
    recibe un objeto con los datos del usuario
    y los pasa a la función signInWithPassword
    del modulo auth de supabase.

    Si es correcto, devuelve el usuario, con el
    token y la información del mismo.
  */
  const logIn = async (userData) => {
    const result = await loginUserDB(userData);

    if (!result) {
      return false;
    }
    return result;
  };

  /*
    Función asíncrona para cerrar sesión en
    supabase, simplemente llama a la función
    signOut del modulo auth de supabase.

    De momento no guardamos el token en local
    ni lo usamos para nada, pero se queda preparado
    para futuras versiones.
  */
  const logOut = async () => {
    const result = await logoutUserDB();

    if (!result) {
      return false;
    }
    return true;
  };

  /*
    Función asíncrona para obtener los datos
    del usuario, si existe.
    Si existe, devuelve el usuario, con el
    token y la información del mismo, es la
    que usaremos para comprobar si el usuario
    y darle acceso a la aplicación.
  */

  const getUser = async () => {
    const result = await getUserDB();

    if (!result) {
      return false;
    }
    return result;
  };

  /*
    Creamos un objeto con los datos que vamos
    a pasar al contexto, en este caso las relacionadas con el usuario
    y las funciones de logIn y logOut.
  */
  const values = {
    user,
    logOut,
    logIn,
    registerUser,
    getUser,
  };

  /*
    Devolvemos el contexto con los valores
    que hemos creado.
  */

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
