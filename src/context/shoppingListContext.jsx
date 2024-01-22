/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useState } from 'react';
import getShoppingListsDb from '../controller/shoppingLists';

const ShoppingListContext = createContext();

function ShoppingListProvider({ children }) {
  const defaultShoppingList = [];
  const [ShoppingLists, setShoppingLists] = useState([]);
  const [loadingShoppingLists, setLoadingShoppingLists] = useState(false);
  const [errorShoppingLists, setErrorShoppingLists] = useState(false);

  const getShoppingLists = async () => {
    setLoadingShoppingLists(true);
    setErrorShoppingLists(false);
    const response = await getShoppingListsDb();

    if (!response) {
      setShoppingLists(defaultShoppingList);
      setErrorShoppingLists(true);
      setLoadingShoppingLists(false);
      return defaultShoppingList;
    }

    setLoadingShoppingLists(false);
    setShoppingLists(response);
    return response;
  };

  const values = {
    ShoppingLists,
    loadingShoppingLists,
    errorShoppingLists,
    getShoppingLists,
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
