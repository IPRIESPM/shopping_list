import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './shoppingListPage.css';

function ShoppingListPage() {
  // Página para ver las listas de la compra.
  // esta página no está implementada, para este ejercicio no es necesaria.
  // const defaultShoppingList = [];
  // const [ShoppingLists] = useState([defaultShoppingList]);

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
