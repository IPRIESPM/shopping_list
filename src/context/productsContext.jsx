/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { useState, createContext } from 'react';

import {
  createProductDB,
  deleteProductDB,
  getProductsDb,
  getProductsFilteredNumericBD,
  getProductsFilteredTextBD,
  updateProductDB,
} from '../controller/product';

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterContext, setFilter] = useState('name');
  const [filterAscending, setFilterAscending] = useState(true);
  const [orderNumericContext, setOrderNumeric] = useState(false);
  const [searchContext, setSearch] = useState('');
  const [orderContext, setOrder] = useState('name');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para traernos los productos, sin filtros.
  const getProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductsDb();
      setError(null);
      setProduct(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Función para traernos los productos, con filtros.
  const getProductsFilter = async (filter, order, search, orderNumeric) => {
    setLoading(true);
    try {
      let data;

      if (orderNumeric) {
        const searchFloat = parseFloat(search, 10);
        if (Number.isNaN(searchFloat) || search === '') {
          data = await getProductsFilteredNumericBD(
            filter,
            filterAscending,
            order,
            0,
          );
        } else {
          data = await getProductsFilteredNumericBD(
            filter,
            filterAscending,
            order,
            searchFloat,
          );
        }
      } else {
        data = await getProductsFilteredTextBD(
          filter,
          filterAscending,
          order,
          search,
        );
      }

      setError(null);
      setProduct(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  // Función para cambiar el orden de la lista.
  // además de cambiar el orden de la lista, llama a la función getProductsFilter.
  const changeFilterListOrder = () => {
    setFilterAscending((prevFilterAscending) => !prevFilterAscending);
    getProductsFilter(filterContext, orderContext, searchContext, orderNumericContext);
  };

  // Función para cambiar el orden de la lista.
  const changeListOrder = (event) => {
    setOrder(event.target.value);
  };

  // Función para cambiar el filtro de la lista y resetear el buscador.
  // De esta manera evitamos que busque tipos de datos no compatibles.
  const changeFilterList = (event) => {
    setFilter(event.target.value);
    setSearch('');

    setOrderNumeric(event.target.value !== 'name');
  };

  // Función para cambiar el texto del buscador.
  const changeListSearch = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim();
    setSearch(trimmedValue);
  };

  // Función para cambiar el producto seleccionado.
  // Se utiliza para ver, editar y eliminar.
  const changeSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  // Función para seleccionar un producto por su id.
  const selectProductById = (id) => {
    const product = products.find((item) => item.id === id);
    setSelectedProduct(product);
    return product;
  };

  // Función para calcular el precio medio de los productos.
  const calcPriceMedium = () => {
    const avgProductsOfPrice = products.reduce(
      (acc, product) => acc + product.price,
      0,
    );
    return Math.round(avgProductsOfPrice / Math.max(1, products.length));
  };

  // Función para actualizar un producto.
  const updateProduct = async (product) => {
    // Buscamos el producto en el array de productos.
    // Si lo encontramos, lo actualizamos en la base de datos.
    const index = products.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      setLoading(true);
      const result = await updateProductDB(product);
      if (!result) {
        setLoading(false);
        setError(true);
        return false;
      }

      const newProducts = [...products];
      newProducts[index] = product;
      setSelectedProduct(product);
      setProduct(newProducts);
      setLoading(false);
      setError(false);
      return true;
    }
    return false;
  };

  // Función para crear un producto, en la base de datos.
  const createProduct = async (product) => {
    setLoading(true);
    const result = await createProductDB(product);
    if (!result) {
      setLoading(false);
      setError(true);
      return false;
    }

    const newProducts = [result[0], ...products];
    setSelectedProduct(result[0]);
    setProduct(newProducts);
    setLoading(false);
    setError(false);
    return result;
  };

  // Función para eliminar un producto, en la base de datos.
  const deleteProduct = () => {
    setLoading(true);
    const result = deleteProductDB(selectedProduct.id);
    if (!result) {
      setError(true);
      return false;
    }

    getProducts();
    changeSelectedProduct(null);
    setLoading(false);
    setError(false);
    return true;
  };

  const values = {
    products,
    selectedProduct,
    filterContext,
    filterAscending,
    orderNumericContext,
    searchContext,
    orderContext,
    error,
    loading,
    changeSelectedProduct,
    changeFilterListOrder,
    changeListOrder,
    changeFilterList,
    changeListSearch,
    getProducts,
    getProductsFilter,
    updateProduct,
    createProduct,
    calcPriceMedium,
    selectProductById,
    setError,
    deleteProduct,
  };

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };
