/* eslint-disable react/prop-types */
import React from 'react';
import ProductComponent from '../../products/productComponent/ProductComponent';
import ErrorComponent from '../../errorComponent/ErrorComponent';

function ShoppingListProductsComponent({ products }) {
  // Componente para mostrar los productos de una lista de la compra.
  return (
    <section className="shopping-list-products-component">
      {!products && <ErrorComponent message="No hay productos en la lista" />}
      {(products && products.length) && (
        <ul>
          {products.map((product) => (
            <li key={product.product.id}>
              <ProductComponent product={product.product} amount={product.amount} />
            </li>
          ))}
        </ul>
      )}

    </section>
  );
}

export default ShoppingListProductsComponent;
