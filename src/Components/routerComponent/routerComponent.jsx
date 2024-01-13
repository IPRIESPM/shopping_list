import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from '../../pages/homePage/HomePage';
import LoginPage from '../../pages/loginPage/LoginPage';
import ProductPage from '../../pages/productPage/ProductPage';
import ProductDetailPage from '../../pages/productPage/productDetailsPage/ProductDetailPage';
import ShoppingListPage from '../../pages/shoppingListPage/ShoppingListPage';
import ShoppingListDetailsPage from '../../pages/shoppingListPage/shoppingListDetailsPage/shoppingListDetailsPage';

function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<Outlet><ProductPage /></Outlet>}>
        <Route path="/:id" element={<ProductDetailPage />} />
      </Route>
      <Route path="/shopping_list" element={<Outlet><ShoppingListPage /></Outlet>}>
        <Route path="/:id" element={<ShoppingListDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default RouterComponent;
