import supabaseConnection from '../config/supabase';

const loginUserDB = async (userData) => {
  try {
    const { user, error } = await supabaseConnection.auth.signIn({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      return false;
    }

    return user;
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
