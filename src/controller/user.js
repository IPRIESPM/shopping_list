import supabaseConnection from '../config/supabase';

/* Conjunto de funciones que se encargan de hacer las consultas a la base de datos
  y retornar los datos que se necesitan.
*/

const loginUserDB = async (userData) => {
  const { email, password } = userData;
  let response;
  try {
    const { data, error } = await supabaseConnection.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      response = false;
    } else {
      response = data;
    }

    return response;
  } catch (error) {
    return false;
  }
};

const getUserDB = async () => {
  try {
    let response;
    const { data, error } = await supabaseConnection.auth.getUser();
    if (error) {
      response = false;
    } else {
      response = data.user;
    }
    return response;
  } catch (error) {
    return false;
  }
};

const logoutUserDB = async () => {
  try {
    let response;
    const { error } = await supabaseConnection.auth.signOut();

    if (error) {
      response = false;
    } else {
      response = true;
    }

    return response;
  } catch (error) {
    return false;
  }
};

const registerUserDB = async (userData) => {
  let result = false;
  const { email, password } = userData;
  try {
    const { data, error } = await supabaseConnection.auth.signUp({
      email,
      password,
    });

    if (error) { result = false; } else { result = data; }

    return result;
  } catch (error) {
    return false;
  }
};

export {
  loginUserDB,
  logoutUserDB,
  registerUserDB,
  getUserDB,
};
