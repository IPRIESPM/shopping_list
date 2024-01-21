import supabaseConnection from '../config/supabase';

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
    const currentUser = await supabaseConnection.auth.user();

    if (!currentUser) {
      return false;
    }

    return currentUser;
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

export {
  loginUserDB,
  getUserDB,
  logoutUserDB,
};
