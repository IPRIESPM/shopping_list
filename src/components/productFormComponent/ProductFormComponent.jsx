/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { getFormData } from '../../utils/utils';

function ProductFormComponent({ product }) {
  const defaultProduct = {
    image: '',
    name: '',
    weight: 0,
    price: 0,
  };
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);

  useEffect(() => {
    if (product) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = getFormData(event);
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image">Url de la imagen: </label>
      <input type="text" name="image" id="image" value={selectedProduct.image} />

      <label htmlFor="name">Nombre</label>
      <input type="text" name="name" id="name" value={selectedProduct.name} />

      <label htmlFor="weight">Peso u.</label>
      <input type="number" name="weight" id="weight" value={selectedProduct.price} />

      <label htmlFor="price">Precio €</label>
      <input type="number" name="price" id="price" value={selectedProduct.weight} />

      <input type="submit" value="Editar" />
    </form>
  );
}

export default ProductFormComponent;
