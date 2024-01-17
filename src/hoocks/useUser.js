/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { useEffect, useState } from 'react';
import { logInSubmitted, fetchUserDetails } from '../database/userConnection';

const useUser = () => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const clearUser = () => {
    setUser([]);
  };

  const logUser = async (data) => {
    await logInSubmitted(data);
    await fetchUserDetails();
  };

  return {
    user, loading, error, clearUser, logUser,
  };
};

export default useUser;
