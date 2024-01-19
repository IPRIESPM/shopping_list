import React, { useContext, useEffect } from 'react';
import './productPage.css';
import { JournalText } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import FilterComponent from '../../components/filerComponent/FilterComponent';
import { UserContext } from '../../context/userContext';
import { ProductsContext } from '../../context/productsContext';
import ProductListComponent from '../../components/productListComponent/ProductListComponent';

function ProductPage() {
  // Preparamos los estados
  const { user } = useContext(UserContext);
  const { products, error, precioMedio } = useContext(ProductsContext);

  // Preparamos el hook de navegación
  // para poder redirigir al usuario, en caso de que no este logueado.
  const navigate = useNavigate();

  /*
      Si el usuario no esta logueado
      no podrá acceder a la página de productos
      y será redirigido al login.
  */
  useEffect(() => {
    // Si el usuario no está logueado, lo redirigimos al login.
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  // al desmontar el componente, cambiamos el título de la página.
  useEffect(() => {
    document.title = 'Productos - Hungry';

    return () => {
      document.title = 'Hungry';
    };
  }, []);

  return (
    <section className="product-page">
      <h1>
        {`${<JournalText />} Listado de productos ${<JournalText />}`}
      </h1>
      {!user && <p>Debes iniciar sesión para ver los productos</p>}

      {user && (
        <FilterComponent />
      )}
      {error && (
        <p>Ha ocurrido un error revisa los filtros</p>
      )}
      {user && !error && (
        <ProductListComponent products={products} precioMedio={precioMedio} />
      )}
    </section>
  );
}

export default ProductPage;
