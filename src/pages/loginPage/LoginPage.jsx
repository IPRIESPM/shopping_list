/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState, useContext, useEffect,
} from 'react';
import { EnvelopeAtFill, PersonFillLock } from 'react-bootstrap-icons';
import './loginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import ErrorComponent from '../../components/errorComponent/ErrorComponent';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

function LoginPage() {
  // Preparamos los estados
  const { user, logIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  /*
    hook de navegación de react-router-dom que nos permite
    navegar a otras páginas sin necesidad de usar un <Link>,
    lo encontre en una búsqueda rápida
    en la documentación de react-router-dom.
  */
  const navigate = useNavigate();

  /*
    Si el usuario ya está logueado, lo redirigimos a la página
    de productos, si no, lo dejamos en la página de login.
    A no ser que haya un error o esté cargando, en cuyo caso
    no hacemos nada.
  */
  useEffect(() => {
    if (user && !loading && !errorLogin) {
      navigate('/products');
    }
  }, [user]);

  /*
    Función que se ejecuta al enviar el formulario.

    Preparamos los datos del formulario y los validamos.
    Si los datos son correctos, llamamos a la función logIn
    del contexto para iniciar sesión.

    Si no, mostramos un error.
  */
  const handleSubmit = async (event) => {
    /*
      Prevenimos el comportamiento por defecto del formulario
      y reseteamos el error y el estado de carga.
    */
    event.preventDefault();
    setErrorLogin(false);
    setLoading(true);

    /*
      obtenemos los datos del formulario y los convertimos
      en un objeto para poder trabajar con ellos.
    */
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    /*
      Validamos los datos del formulario, si no son correctos
      mostramos un error y salimos de la función.
    */
    if (!data.email || !data.password) {
      setErrorLogin(true);
      setLoading(false);
      return false;
    }

    /*
      Si los datos son correctos, los limpiamos y llamamos
      a la función logIn del contexto.
    */
    data.email = data.email.trim();
    data.password = data.password.trim();
    const result = await logIn(data);
    console.log(result);

    /*
      Si el resultado es falso, mostramos un error y salimos
      de la función.
    */
    if (!result) {
      setErrorLogin(true);
      setLoading(false);
      return false;
    }

    /*
      Si el resultado es correcto, limpiamos el formulario,
      el error y el estado de carga y redirigimos al usuario
      a la página de productos.
    */
    setLoading(false);
    setErrorLogin(false);
    return true;
  };

  useEffect(() => {
    document.title = 'Iniciar sesión - Hungry';

    return () => {
      document.title = 'Hungry';
    };
  }, []);

  return (
    <section className="loginPage">
      <h1>Iniciar sesión</h1>

      {!user && !loading && (
        <form onSubmit={handleSubmit}>
          <fieldset>

            <label htmlFor="email">
              <EnvelopeAtFill />
              <input type="email" id="email" name="email" placeholder="usuario@usuario" />
            </label>

            <label htmlFor="password">
              <PersonFillLock />
              <input type="password" id="password" name="password" placeholder="contraseña" />
            </label>
          </fieldset>
          <input type="submit" value="Acceder" />
        </form>
      )}

      {loading && (
        <LoadingComponent message="Iniciando sesión" />
      )}

      {errorLogin && (
        <ErrorComponent message="Error al iniciar sesión" />
      )}

      {user && !errorLogin && (
        <section className="login-success">
          <p>Inicio correcto</p>
          <Link to="/products">Ver productos</Link>
        </section>
      )}

      <ul className="test-data">
        Datos de prueba:
        <li>Usuario: isaacjulianpavon.alu@iespacomolla.es</li>
        <li>Contraseña: test</li>
      </ul>
    </section>
  );
}

export default LoginPage;
