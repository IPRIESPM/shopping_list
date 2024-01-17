import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from '../../pages/homePage/HomePage';
import LoginPage from '../../pages/loginPage/LoginPage';
import ProductPage from '../../pages/productPage/ProductPage';
import ProductDetailPage from '../../pages/productPage/productDetailsPage/ProductDetailPage';
import ShoppingListPage from '../../pages/shoppingListPage/ShoppingListPage';
import ShoppingListDetailsPage from '../../pages/shoppingListPage/shoppingListDetailsPage/ShoppingListDetailsPage';

function RouterComponent() {
  /*
    Para el manejo de rutas, listamos todas las rutas
    y las dejamos disponibles para futuras ampliaciones.

    En el caso de productos y listas de la compra, usamos
    el componente Outlet para poder tener una ruta padre
    y poder usarla para mostrar la lista de productos o
    la lista de la compra, y luego poder mostrar el detalle
    de cada uno de ellos.

    se queda preparado para futuras versiones.
  */

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<Outlet />}>
        <Route index element={<ProductPage />} />
        <Route path=":id" element={<ProductDetailPage />} />
      </Route>
      <Route path="/shopping_list" element={<Outlet />}>
        <Route index element={<ShoppingListPage />} />
        <Route path=":id" element={<ShoppingListDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default RouterComponent;
