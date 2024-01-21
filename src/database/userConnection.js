import supabase from './supabase';

const login = async (email) => {
  // Función asíncrona para iniciar sesión con el usuario.
  await supabase.auth.signInWithOtp({
    email,
    options: {
      // La URL se especifica en el servidor, pero es posible cambiarla.
      emailRedirectTo: 'http://localhost:5173/inicio',
    },
  });
};

const getUser = async () => {
  // Función asíncrona para obtener el usuario.
  const user = await supabase.auth.user();
  return user;
};

export { login, getUser };
