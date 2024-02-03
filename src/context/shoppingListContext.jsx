/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState, useContext } from 'react';
import {
  getShoppingListByIDB,
  getShoppingListsDb,
  getProductsByShoppingListIdBD,
  createShoppingListDB,
  deleteShoppingListDB,
  addProductToShoppingListDB,
  updateProductAmountDB,
  deleteProductFromShoppingListDB,
} from '../controller/shoppingLists';
import { UserContext } from './userContext';

const ShoppingListContext = createContext();

function ShoppingListProvider({ children }) {
  const { user } = useContext(UserContext);
  const defaultShoppingLists = [];
  const defaultShoppingListSelected = {
    products: [],
  };
  const [shoppingLists, setShoppingLists] = useState(defaultShoppingLists);
  const [shoppingListSelected, setShoppingListSelected] = useState(
    defaultShoppingListSelected,
  );
  const [loadingShoppingLists, setLoadingShoppingLists] = useState(false);
  const [errorShoppingLists, setErrorShoppingLists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Funcion para obtener las listas de la compra de la base de datos.
  const getShoppingLists = async () => {
    setLoadingShoppingLists(true);
    setErrorShoppingLists(false);
    const response = await getShoppingListsDb(user.id);

    if (!response) {
      setShoppingLists(defaultShoppingLists);
      setErrorShoppingLists(true);
      setLoadingShoppingLists(false);
      return defaultShoppingLists;
    }

    setLoadingShoppingLists(false);
    setShoppingLists(response);
    return response;
  };

  // Funciones para Obtener los productos de una lista de la compra de la base de datos.
  const getProductsByShoppingListID = async (id) => {
    setLoadingShoppingLists(true);
    setErrorShoppingLists(false);
    const result = await getProductsByShoppingListIdBD(id);
    if (!result) {
      setErrorShoppingLists(true);
      setLoadingShoppingLists(false);
      return false;
    }

    setLoadingShoppingLists(false);

    setShoppingListSelected({ ...shoppingListSelected, products: result });
    return result;
  };

  // Funcion para obtener una lista de la compra de la base de datos.
  const getShoppingListByID = async (id) => {
    setLoadingShoppingLists(true);
    setErrorShoppingLists(false);
    const listData = await getShoppingListByIDB(id);
    if (!listData) {
      setErrorShoppingLists(true);
      setLoadingShoppingLists(false);
      return false;
    }

    const productsResult = await getProductsByShoppingListID(id);
    if (!productsResult) {
      setErrorShoppingLists(true);
      setLoadingShoppingLists(false);
      return false;
    }

    const listDataWithProducts = { ...listData, products: productsResult };
    setLoadingShoppingLists(false);
    setShoppingListSelected(listDataWithProducts);
    return listDataWithProducts;
  };

  // Funcion para obtener el peso de una lista de la compra.
  const getShoppingListWeight = () => {
    let weight = 0;
    if (!shoppingListSelected || !shoppingListSelected.products) return weight;

    shoppingListSelected.products.forEach((product) => {
      weight += product.amount * product.product.weight;
    });

    return weight;
  };

  // Funcion para obtener el precio de una lista de la compra.
  const getShoppingListPrice = () => {
    let price = 0;
    if (!shoppingListSelected || !shoppingListSelected.products) return price;

    shoppingListSelected.products.forEach((product) => {
      price += product.amount * product.product.price;
    });

    return Math.round(price * 100) / 100;
  };

  // Funcion para comprobar si necesitamos coche para transportar la lista de la compra.
  const isCarNeeded = (weight) => {
    const weightLimit = 10000;

    if (weight >= weightLimit) return true;

    return false;
  };

  // Funcion para crear una lista de la compra.
  const createShoppingList = async (name) => {
    setLoadingShoppingLists(true);
    const response = await createShoppingListDB(name, user.id);

    if (!response) {
      setErrorShoppingLists(true);
      setErrorMessage('Error al crear la lista');
      setLoadingShoppingLists(false);
      return false;
    }

    setShoppingLists([...shoppingLists, response[0]]);
    setLoadingShoppingLists(false);
    return response;
  };

  // Funcion para borrar una lista de la compra.
  const deleteShoppingList = async (id) => {
    setLoadingShoppingLists(true);
    const response = await deleteShoppingListDB(id);

    if (!response) {
      setLoadingShoppingLists(false);
      setErrorShoppingLists(true);
      setErrorMessage('Error al borrar la lista');
      return false;
    }
    setLoadingShoppingLists(false);
    return response;
  };

  // Funcion para comprobar si un producto ya existe en la lista de la compra.
  const productExist = (id) => {
    const product = shoppingListSelected.products.find(
      (pro) => pro.product.id === id,
    );
    return product;
  };

  // Función para añadir un producto a la lista de la compra.
  const addProductShoppingList = async (product) => {
    const exist = productExist(product.id);
    if (!exist) {
      const newProduct = {
        ...product,
        amount: 1,
      };
      setLoadingShoppingLists(true);
      const result = await addProductToShoppingListDB(
        shoppingListSelected.id,
        newProduct,
      );
      if (result) {
        await getProductsByShoppingListID(shoppingListSelected.id);
        setLoadingShoppingLists(false);
      } else {
        setLoadingShoppingLists(false);
        setErrorShoppingLists(true);
        setErrorMessage('Error al añadir el producto');
      }
      setLoadingShoppingLists(false);
    }
  };

  // Función para actualizar un producto de la lista de la compra.
  const updateProductShoppingList = async (product) => {
    const exist = productExist(product.id);
    if (exist) {
      const newProduct = {
        ...product,
        amount: exist.amount + 1,
      };
      setLoadingShoppingLists(true);
      const result = await updateProductAmountDB(
        shoppingListSelected.id,
        newProduct,
      );
      if (result) {
        await getProductsByShoppingListID(shoppingListSelected.id);
        setLoadingShoppingLists(false);
      } else {
        setLoadingShoppingLists(false);
        setErrorShoppingLists(true);
        setErrorMessage('Error al añadir el producto');
      }
      setLoadingShoppingLists(false);
    }
  };
  // Función para borrar un producto de la lista de la compra.
  const deleteProductShoppingList = async (product) => {
    const exist = productExist(product.id);
    if (exist) {
      const newProduct = {
        ...product,
        amount: exist.amount - 1,
      };

      // comprobamos si el producto tiene 0 unidades
      // si es así, lo borramos de la lista, si no lo actualizamos

      if (newProduct.amount <= 0) {
        setLoadingShoppingLists(true);
        const result = await deleteProductFromShoppingListDB(
          shoppingListSelected.id,
          newProduct.id,
        );
        if (result) {
          await getProductsByShoppingListID(shoppingListSelected.id);
          setLoadingShoppingLists(false);
        } else {
          setLoadingShoppingLists(false);
          setErrorShoppingLists(true);
          setErrorMessage('Error al borrar el producto');
        }
        setLoadingShoppingLists(false);
      } else {
        setLoadingShoppingLists(true);
        const result = await updateProductAmountDB(
          shoppingListSelected.id,
          newProduct,
        );
        if (result) {
          await getProductsByShoppingListID(shoppingListSelected.id);
          setLoadingShoppingLists(false);
        } else {
          setLoadingShoppingLists(false);
          setErrorShoppingLists(true);
          setErrorMessage('Error al borrar el producto');
        }
        setLoadingShoppingLists(false);
      }
    }
  };

  const values = {
    shoppingLists,
    shoppingListSelected,
    loadingShoppingLists,
    errorShoppingLists,
    errorMessage,
    addProductShoppingList,
    updateProductShoppingList,
    deleteProductShoppingList,
    createShoppingList,
    deleteShoppingList,
    getShoppingLists,
    setShoppingListSelected,
    getShoppingListByID,
    getProductsByShoppingListID,
    getShoppingListWeight,
    getShoppingListPrice,
    isCarNeeded,
  };

  /*
    Devolvemos el contexto con los valores
    que hemos creado.
  */

  return (
    <ShoppingListContext.Provider value={values}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export { ShoppingListContext, ShoppingListProvider };
