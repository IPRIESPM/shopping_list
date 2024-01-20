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

  const changeFilterListOrder = () => {
    setFilterAscending((prevFilterAscending) => !prevFilterAscending);
    getProductsFilter(filterContext, orderContext, searchContext, orderNumericContext);
  };

  const changeListOrder = (event) => {
    setOrder(event.target.value);
  };

  const changeFilterList = (event) => {
    setFilter(event.target.value);
    setSearch('');

    setOrderNumeric(event.target.value !== 'name');
  };

  const changeListSearch = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim();
    setSearch(trimmedValue);
  };

  const changeSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  const selectProductById = (id) => {
    const product = products.find((item) => item.id === id);
    setSelectedProduct(product);
    return product;
  };

  const calcPriceMedium = () => {
    const avgProductsOfPrice = products.reduce(
      (acc, product) => acc + product.price,
      0,
    );
    return Math.round(avgProductsOfPrice / Math.max(1, products.length));
  };

  const updateProduct = async (product) => {
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

  const createProduct = async (product) => {
    setLoading(true);
    const result = await createProductDB(product);
    if (!result) {
      setLoading(false);
      setError(true);
      return false;
    }

    const newProducts = [...products];
    newProducts.push(result[0]);
    setSelectedProduct(result[0]);
    setProduct(newProducts);
    setLoading(false);
    setError(false);
    return result;
  };

  const deleteProduct = () => {
    setLoading(true);
    const result = deleteProductDB(selectedProduct.id);
    if (!result) {
      setError(true);
      return false;
    }

    getProducts();
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
