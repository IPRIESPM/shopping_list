/* eslint-disable react/prop-types */
import React from 'react';
import './productListComponent.css';

function ProductListComponent({ products, precioMedio }) {
  /*
    Aquí simplemente mostramos los productos
    y el precio medio.
  */
  return (
    <section className="products-list">
      {products.length === 0 && <p>No hay productos</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <b>{product.name}</b>
            {` -  ${product.weight}u. - ${product.price}€`}
          </li>
        ))}
      </ul>
      <hr />
      <section className="total">
        <p>
          Total de productos:
          {' '}
          <b>{products.length}</b>
        </p>
        <p>
          Precio medio:
          <b>
            {precioMedio()}
            €
          </b>
        </p>
      </section>
    </section>
  );
}

export default ProductListComponent;
