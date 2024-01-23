/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';
import { getShoppingListByIDB, getShoppingListsDb, getProductsByShoppingListId } from '../controller/shoppingLists';

const ShoppingListContext = createContext();

function ShoppingListProvider({ children }) {
  const defaultShoppingLists = [];
  const [shoppingLists, setShoppingLists] = useState(defaultShoppingLists);
  const [shoppingListSelected, setShoppingListSelected] = useState();
  const [loadingShoppingLists, setLoadingShoppingLists] = useState(false);
  const [errorShoppingLists, setErrorShoppingLists] = useState(false);

  const getShoppingLists = async () => {
    setLoadingShoppingLists(true);
    setErrorShoppingLists(false);
    const response = await getShoppingListsDb();

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

  const getShoppingListByID = async (id) => {
    setLoadingShoppingLists(true);
    setErrorShoppingLists(false);
    const result = await getShoppingListByIDB(id);
    if (!result) {
      setErrorShoppingLists(true);
      setLoadingShoppingLists(false);
      return false;
    }

    setLoadingShoppingLists(false);
    setShoppingListSelected(result);
    return result;
  };

  const getProductsByShoppingListID = async (id) => {
    setLoadingShoppingLists(true);
    setErrorShoppingLists(false);
    const result = await getProductsByShoppingListId(id);
    if (!result) {
      setErrorShoppingLists(true);
      setLoadingShoppingLists(false);
      return false;
    }

    setLoadingShoppingLists(false);

    // setShoppingListSelected({ ...shoppingListSelected, products: result });
    return shoppingListSelected;
  };

  const values = {
    shoppingLists,
    shoppingListSelected,
    loadingShoppingLists,
    errorShoppingLists,
    getShoppingLists,
    setShoppingListSelected,
    getShoppingListByID,
    getProductsByShoppingListID,
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
