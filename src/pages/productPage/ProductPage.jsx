import React, { useContext, useEffect } from 'react';
import './productPage.css';
import { JournalText } from 'react-bootstrap-icons';
import FilterComponent from '../../components/filerComponent/FilterComponent';
import { ProductsContext } from '../../context/productsContext';
import ProductListComponent from '../../components/productListComponent/ProductListComponent';

function ProductPage() {
  // Preparamos los estados
  const {
    products, error, calcPriceMedium, getProducts,
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

      {error && (
        <p>Ha ocurrido un error revisa los filtros</p>
      )}
      {!error && (
        <ProductListComponent products={products} calcPriceMedium={calcPriceMedium} />
      )}
    </section>
  );
}

export default ProductPage;
