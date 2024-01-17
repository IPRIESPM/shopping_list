import supabase from './supabase';

const logInSubmitted = async (data) => {
  // Función para iniciar sesión.
  const { email, password } = data;

  supabase.auth
    .signIn({ email, password })
    .then((response) => {
      alert(JSON.stringify(response));
    })
    .catch((err) => {
      alert(err.response.text);
    });
};

const fetchUserDetails = () => {
  alert(JSON.stringify(supabase.auth.user()));
};

export { logInSubmitted, fetchUserDetails };
