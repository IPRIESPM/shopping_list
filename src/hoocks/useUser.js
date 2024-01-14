/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { useEffect, useState } from 'react';
import { login, getUser } from '../database/userConnection';

const useUser = () => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const clearUser = () => {
    setUser([]);
  };

  const logUser = async (email) => {
    login(email);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setError(false);
        const supabaseUser = await getUser();
        setUser(supabaseUser);
      } catch (supabaseError) {
        setError('true');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return {
    user, loading, error, clearUser, logUser,
  };
};

export default useUser;
