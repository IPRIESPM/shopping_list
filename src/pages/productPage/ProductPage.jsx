import React, { useContext, useEffect } from 'react';
import './productPage.css';
import { JournalText } from 'react-bootstrap-icons';
import FilterComponent from '../../components/filerComponent/FilterComponent';
import { ProductsContext } from '../../context/productsContext';
import ErrorComponent from '../../components/errorComponent/ErrorComponent';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import ProductListComponent from '../../components/products/productListComponent/ProductListComponent';

function ProductPage() {
  // Preparamos los estados
  const {
    error, getProducts, loading,
  } = useContext(ProductsContext);

  // al desmontar el componente, cambiamos el título de la página.
  useEffect(() => {
    document.title = 'Productos - Hungry';
    getProducts();
    return () => {
      document.title = 'Hungry';
    };
  }, []);

  return (
    <section className="product-page">
      <h1>
        <JournalText />
        {' '}
        Listado de productos
        {' '}
        <JournalText />
      </h1>

      <FilterComponent />

      {loading && (
        <LoadingComponent message="Cargando productos" />
      )}
      {error && (
        <ErrorComponent message="Error cargando los productos" />
      )}
      {!error && (
        <ProductListComponent />
      )}
    </section>
  );
}

export default ProductPage;
