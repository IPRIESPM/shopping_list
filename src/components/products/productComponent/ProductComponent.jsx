/* eslint-disable react/prop-types */
import React from 'react';
import './productComponent.css';

function ProductComponent({ product, amount }) {
  // Un componente que muestra un producto.
  // recibe un objeto producto con los atributos
  // del producto.
  let updatedImage = product.img_url;
  let updatedName = product.name;
  if (!updatedImage) {
    updatedImage = '/src/assets/react.svg';
    updatedName = 'No image';
  }
  return (
    <section className="product ">
      <img src={updatedImage} alt={updatedName} width="35.93px" height="32px" />
      <p>
        {product.name}
      </p>
      <p>
        {product.price}
        €
      </p>
      <p>
        {product.weight}
        gr
      </p>
      {amount && (
      <p>
        {amount}
        uds.
      </p>
      )}

    </section>

  );
}
export default ProductComponent;
