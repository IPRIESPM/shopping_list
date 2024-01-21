import supabaseConnection from '../config/supabase';

const saveSessionInLocalStorage = (data) => {
  const { access_token: accessToken, expires_in: expiresIn } = data;
  const expirationTime = new Date().getTime() + expiresIn * 1000;
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('expirationTime', expirationTime);
};

const deleteSessionInLocalStorage = () => {
  console.log('eliminando sesión');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('expirationTime');
};

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
    saveSessionInLocalStorage(data.session);
    return data;
  } catch (error) {
    return false;
  }
};

const getUserDB = async () => {
  console.log('getUserDB');
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
    deleteSessionInLocalStorage();
    return true;
  } catch (error) {
    return false;
  }
};

const checkSessionExist = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const expirationTime = sessionStorage.getItem('expirationTime');
  const isSessionValid = accessToken && expirationTime && new Date().getTime() < expirationTime;

  if (isSessionValid) {
    return true;
  }
  deleteSessionInLocalStorage();
  return false;
};

const checkUserIsLogged = async () => {
  const isSessionValid = checkSessionExist();

  if (!isSessionValid) {
    return false;
  }

  const currentUser = await getUserDB();

  if (!currentUser) {
    return false;
  }

  return currentUser;
};

export {
  loginUserDB,
  getUserDB,
  logoutUserDB,
  checkUserIsLogged,
  checkSessionExist,
};
