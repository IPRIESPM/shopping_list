/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';
import { supabaseConexion } from '../config/supabase';

const UserContext = createContext();

function UserProvider({ children }) {
  /*
    Establecemos el estado inicial del usuario,
    en este caso, no he conseguido darle un nombre,
    desde el modulo auth de supabase, el usuario
    tiene una tabla llamada users y en ella tiene
    un campo llamado nickname, que es el que vamos
    a usar para identificar al usuario.

    Pero se queda preparado para futuras versiones.
  */
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState('');

  /*
    Función asíncrona para iniciar sesión.
    recibe un objeto con los datos del usuario
    y los pasa a la función signInWithPassword
    del modulo auth de supabase.

    Si es correcto, devuelve el usuario, con el
    token y la información del mismo.
  */
  const logIn = async (userData) => {
    const { email, password } = userData;

    const { data, error } = await supabaseConexion.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return false;
    }

    setUser(data);
    return data;
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
    await supabaseConexion.auth.signOut();
    setUser(null);
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
    const currentUser = await supabaseConexion.auth.user();

    if (currentUser) {
      const { data, error } = await supabaseConexion
        .from('user')
        .select('nickname')
        .eq('id', currentUser.id);
      if (error) {
        return null;
      }
      setNickname(data[0].nickname);
    }

    setUser(currentUser);
    return currentUser;
  };

  /*
    Creamos un objeto con los datos que vamos
    a pasar al contexto, en este caso las relacionadas con el usuario
    y las funciones de logIn y logOut.
  */
  const values = {
    user,
    nickname,
    logOut,
    logIn,
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
