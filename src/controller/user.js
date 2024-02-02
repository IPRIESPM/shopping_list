import supabaseConnection from '../config/supabase';

/* conjunto de funciones que se encargan de hacer las consultas a la base de datos
  y retornar los datos que se necesitan.
*/

const loginUserDB = async (userData) => {
  const { email, password } = userData;
  try {
    const { data, error } = await supabaseConnection.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return false;
    }

    return data;
  } catch (error) {
    return false;
  }
};

const getUserDB = async () => {
  try {
    const { data, error } = await supabaseConnection.auth.getUser();
    if (error) {
      return false;
    }
    return data.user;
  } catch (error) {
    return false;
  }
};

const logoutUserDB = async () => {
  try {
    const { error } = await supabaseConnection.auth.signOut();

    if (error) {
      return false;
    }
    return true;
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
