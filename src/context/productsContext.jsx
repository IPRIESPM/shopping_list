/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, {
  useState, createContext,
} from 'react';
import { getProductsFilteredNumericBD, getProductsFilteredTextBD } from '../controller/product';

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  // Preparamos los estados
  const [products, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState('name');
  const [filterAscending, setFilterAscending] = useState(true);
  const [orderNumeric, setOrderNumeric] = useState(false);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('name');
  const [error, setError] = useState(null);

  // Es un toggle para cambiar el orden de los productos
  // de ascendente a descendente y viceversa.
  const changeFilterListOrder = () => {
    setFilterAscending(!filterAscending);
  };

  // Esta función se encarga de
  // cambiar el orden de los productos.
  const changeListOrder = (event) => {
    setOrder(event.target.value);
  };

  /*
    Esta función se encarga de establecer
    el filtro de búsqueda y el tipo de filtro.

    Si el filtro es numérico, cambia el estado
    de orderNumeric a true, si no, a false.
  */
  const changeFilterList = (event) => {
    setFilter(event.target.value);
    setSearch('');

    if (event.target.value !== 'name') {
      setOrderNumeric(true);
    } else {
      setOrderNumeric(false);
    }
  };

  // Esta función se encarga de establecer el valor
  // del campo de búsqueda.

  const changeListSearch = (event) => {
    setSearch(event.target.value);
  };

  /*
    Esta función se encarga de obtener los productos,
    si el filtro es numérico, llama a la función que filtra
    por números, si no, llama a la función que filtra por texto.

    Esta función estamos reutilizando para filtrar, ordenar y llamar
    a los productos por defecto.
  */

  const getProducts = async () => {
    let data;
    if (orderNumeric) {
      let searchFloat = parseFloat(search, 10);

      if (Number.isNaN(searchFloat) || search === '') {
        searchFloat = 0;
      }

      data = await getProductsFilteredNumericBD(filter, filterAscending, order, searchFloat);
    } else {
      data = await getProductsFilteredTextBD(filter, filterAscending, order, search);
    }

    if (!data) {
      setError(true);
    } else {
      setError(null);
      setProduct(data);
    }
  };

  /*
    Esta función se encarga de calcular el precio medio
    de los productos seleccionados esta vez usando los datos en local.

    Reducimos carga de la base de datos ya que es un cálculo
    perfecto para hacer en el cliente.
  */
  const calcPriceMedium = () => {
    const avgProductsOfPrice = products.reduce(
      (acc, product) => acc + product.price,
      0,
    );
    return Math.round(avgProductsOfPrice / Math.max(1, products.length));
  };

  // Creamos un objeto con los valores que queremos compartir
  const values = {
    products,
    selectedProduct,
    filter,
    filterAscending,
    orderNumeric,
    search,
    order,
    error,
    changeFilterAscending,
    selectOrder,
    selectFilter,
    selectSearch,
    getProducts,
    calcPriceMedium,
  };

  // Retornamos el contexto con los valores
  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };
