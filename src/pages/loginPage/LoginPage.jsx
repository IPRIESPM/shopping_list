/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState, useContext, useEffect,
} from 'react';
import { EnvelopeAtFill, PersonFillLock } from 'react-bootstrap-icons';
import './loginPage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import ErrorComponent from '../../components/errorComponent/ErrorComponent';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

function LoginPage() {
  // Preparamos los estados
  const { user, logIn, registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const registerParam = useParams();

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
    if (user && !loading && !errorLogin && !register) {
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
    let result = false;
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

    if (!register) {
      result = await logIn(data);
    } else {
      result = await registerUser(data);
    }

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
    if (registerParam.register === 'register') {
      setRegister(true);
      document.title = 'Registrarse - Hungry';
    } else {
      document.title = 'Iniciar sesión - Hungry';
    }

    return () => {
      document.title = 'Hungry';
    };
  }, []);

  return (
    <section className="loginPage">
      {!register && <h1>Iniciar sesión</h1>}
      {register && <h1>Registrarse</h1>}

      {!user && !loading && (
        <form onSubmit={handleSubmit} name={register ? 'register' : 'login'}>
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
          <input type="submit" value={register ? 'Registrarse' : 'Iniciar Sesión'} />

          {!register && (
            <Link to="/login/register" onClick={() => setRegister(true)}>Registrarse</Link>
          )}

          {register && (
            <Link to="/login" onClick={() => setRegister(false)}>Iniciar sesión</Link>
          )}
        </form>
      )}

      {(loading && !register) && (
        <LoadingComponent message="Iniciando sesión" />
      )}

      {(loading && register) && (
        <LoadingComponent message="Te estamos registrando, espera un segundo" />
      )}

      {(errorLogin && !register) && (
        <ErrorComponent message="Error al iniciar sesión" />
      )}

      {(errorLogin && register) && (
        <ErrorComponent message="Error al registrarse" />
      )}

      {user && !errorLogin && (
        <section className="login-success">
          <p>Te has registrado en nuestra app</p>
          <Link to="/products">Ver productos</Link>
        </section>
      )}
      {!register && (
        <ul className="test-data">
          Datos de prueba:
          <p>Editor:</p>
          <li>Usuario: isaacjulianpavon.alu@iespacomolla.es</li>
          <li>Contraseña: testtest</li>

          <p>Usuario:</p>
          <li>Usuario: altaskur@gmail.com</li>
          <li>Contraseña: testtest</li>
        </ul>
      )}

    </section>
  );
}

export default LoginPage;
