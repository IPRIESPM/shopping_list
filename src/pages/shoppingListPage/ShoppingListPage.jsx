import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabaseConexion } from '../../config/supabase';
import { UserContext } from '../../context/userContext';
import './shoppingListPage.css';

function ShoppingListPage() {
  const [ShoppingLists, setShoppingList] = useState([]);
  const { user } = useContext(UserContext);

  const getShoppingList = async () => {
    const { data, error } = await supabaseConexion
      .from('shopping_list')
      .select('*');

    if (error) {
      return null;
    }
    setShoppingList(data);
    return data;
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getShoppingList();
  }, []);

  return (
    <>
      {!user && <p>Debes iniciar sesión para ver la lista de la compra</p>}

      {user && (
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
      )}
    </>
  );
}

export default ShoppingListPage;
