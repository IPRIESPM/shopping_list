/* eslint-disable react/prop-types */
import React from 'react';
import './productComponent.css';

function ProductComponent({ product, goToProductPage }) {
  let updatedImage = product.image;
  let updatedName = product.name;
  if (!updatedImage) {
    updatedImage = '/src/assets/react.svg';
    updatedName = 'No image';
  }

  return (
    <button type="button" className="product" onClick={goToProductPage(product.id)}>
      <img src={updatedImage} alt={updatedName} />
      <p>
        {product.name}
      </p>
      <p>
        {product.price}
        €
      </p>
      <p>
        {product.weight}
        u.
      </p>
    </button>
  );
}
export default ProductComponent;
