import React, { useEffect, useContext } from 'react';
import './shoppingListPage.css';
import { ShoppingListProvider } from '../../context/shoppingListContext';

function ShoppingListPage() {
  // Página para ver las listas de la compra.

  const { getShoppingLists } = useContext(ShoppingListProvider);

  useEffect(() => {
    document.title = 'Listas de la compra - Hungry';
    getShoppingLists();
    return () => {
      document.title = 'Hungry';
    };
  }, []);

  return (
    <section className="shopping-list-page">
      <nav>
        <h2>Listado de la compra</h2>
      </nav>
      {/* <ul>
        {ShoppingLists.map((ShoppingList) => (
          <li key={ShoppingList.id}>
            <Link to={`/shopping_list/${ShoppingList.id}`}>
              <b>
                {ShoppingList.name}
              </b>
              <p>{ShoppingList.description}</p>
            </Link>
          </li>
        ))}
      </ul> */}
    </section>
  );
}

export default ShoppingListPage;
