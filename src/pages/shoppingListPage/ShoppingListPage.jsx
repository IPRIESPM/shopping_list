import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './shoppingListPage.css';

function ShoppingListPage() {
  const defaultShoppingList = [];
  const [ShoppingLists, setShoppingList] = useState([defaultShoppingList]);

  useEffect(() => {

  }, []);

  return (
    <>
      <p>Debes iniciar sesión para ver la lista de la compra</p>

      <section className="shopping-list-page">
        <nav>
          <h2>Listado de la compra</h2>
        </nav>
        <ul>
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
        </ul>
      </section>

    </>
  );
}

export default ShoppingListPage;
