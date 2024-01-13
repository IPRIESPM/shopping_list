import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/products" element={<Outlet><ProductComponent /></Outlet>}>
        <Route path="/" element={<ProductListComponent />} />
        <Route path="/:id" element={<ProductDetailComponent />} />
      </Route>
      <Route path="/shopping_list" element={<Outlet><ShoppingListComponent /></Outlet>}>
        <Route path="/" element={<ShoppingListListComponent />} />
        <Route path="/:id" element={<ShoppingListDetailComponent />} />
      </Route>
    </Routes>
  );
}

export default Router;
