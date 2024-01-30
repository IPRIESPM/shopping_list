import React, { useContext } from 'react';
import {
  Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import HomePage from '../../pages/homePage/HomePage';
import LoginPage from '../../pages/loginPage/LoginPage';
import ProductPage from '../../pages/productPage/ProductPage';
import ProductDetailPage from '../../pages/productPage/productDetailsPage/ProductDetailPage';
import ShoppingListPage from '../../pages/shoppingListPage/ShoppingListPage';
import ShoppingListDetailsPage from '../../pages/shoppingListPage/shoppingListDetailsPage/ShoppingListDetailsPage';
import { UserContext } from '../../context/userContext';

function RouterComponent() {
  const { user } = useContext(UserContext);

  // Verifica si el usuario está autenticado
  const isAuthenticated = !!user; // Asumiendo que tu userContext tiene información de autenticación

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Outlet />}>
        <Route index element={<LoginPage />} />
        <Route path=":register" element={<LoginPage />} />
      </Route>
      <Route
        path="/products"
        element={
          isAuthenticated ? (
            <Outlet />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route index element={<ProductPage />} />
        <Route path=":id" element={<ProductDetailPage />} />
      </Route>
      <Route
        path="/shopping_list"
        element={isAuthenticated ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )}
      >
        <Route index element={<ShoppingListPage />} />
        <Route path=":id" element={<ShoppingListDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default RouterComponent;
