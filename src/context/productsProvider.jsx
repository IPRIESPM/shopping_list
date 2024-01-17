/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, {
  useEffect, useState, createContext,
} from 'react';

import { getProducts, getProductsNumeric } from '../config/supabase';

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  // Preparamos los estados
  const [products, setProduct] = useState([]);
  const [filter, setFilter] = useState('name');
  const [filterAscending, setFilterAscending] = useState(true);
  const [orderNumeric, setOrderNumeric] = useState(false);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('name');
  const [error, setError] = useState(null);

  // Es un toggle para cambiar el orden de los productos
  // de ascendente a descendente y viceversa.
  const changeFilterAscending = () => {
    setFilterAscending(!filterAscending);
  };

  // Esta función se encarga de
  // cambiar el orden de los productos.
  const selectOrder = (event) => {
    setOrder(event.target.value);
  };

  /*
    Esta función se encarga de establecer
    el filtro de búsqueda y el tipo de filtro.

    Si el filtro es numérico, cambia el estado
    de orderNumeric a true, si no, a false.
  */
  const selectFilter = (event) => {
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

  const selectSearch = (event) => {
    setSearch(event.target.value);
  };

  /*
    Esta función se encarga de obtener los productos,
    si el filtro es numérico, llama a la función que filtra
    por números, si no, llama a la función que filtra por texto.

    Esta función estamos reutilizando para filtrar, ordenar y llamar
    a los productos por defecto.
  */

  const obtainProducts = async () => {
    let data;
    if (orderNumeric) {
      let searchFloat = parseFloat(search, 10);

      if (Number.isNaN(searchFloat) || search === '') {
        searchFloat = 0;
      }

      data = await getProductsNumeric(filter, filterAscending, order, searchFloat);
    } else {
      data = await getProducts(filter, filterAscending, order, search);
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
  const precioMedio = () => {
    const avgProductsOfPrice = products.reduce(
      (acc, product) => acc + product.price,
      0,
    );
    return Math.round(avgProductsOfPrice / Math.max(1, products.length));
  };

  /*
    Esta función se encarga de obtener los productos
    por defecto, es decir, sin filtros ni ordenación.
  */
  useEffect(() => {
    obtainProducts();
  }, []);

  /*
     Aquí está la magia, cada vez que cambia el filtro,
      el orden, el orden ascendente, o la búsqueda,
      llamamos a la función que obtiene los productos.

      De esta forma, cada vez que cambie alguno de estos
      valores, se ejecutará la función y obtendremos los
      productos filtrados y ordenados.
  */

  useEffect(() => {
    obtainProducts();
  }, [order, filterAscending, filter, search]);

  // Creamos un objeto con los valores que queremos compartir
  const values = {
    products,
    filter,
    filterAscending,
    orderNumeric,
    search,
    order,
    error,
    precioMedio,
    changeFilterAscending,
    selectOrder,
    selectFilter,
    selectSearch,
  };

  // Retornamos el contexto con los valores
  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };
