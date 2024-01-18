/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateInputs } from '../../utils/utils';
import './productFormComponent.css';
import { ProductsContext } from '../../context/productsProvider';
import ErrorComponent from '../errorComponent/ErrorComponent';

function ProductFormComponent({ product, exitEditMode, exitCreateMode }) {
  const defaultProduct = {
    img_url: '',
    name: '',
    weight: 0,
    price: 0,
  };
  const { updateSelectedProduct, createNewProduct } = useContext(ProductsContext);
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
  const [error, setError] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const navigate = useNavigate();

  const updateValue = (event) => {
    const { name, value } = event.target;
    event.target.setCustomValidity('');
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    } else {
      setSelectedProduct(defaultProduct);
      setCreateMode(true);
    }

    return () => {
      setSelectedProduct(defaultProduct);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    const isValid = validateInputs(event.target);

    if (isValid) {
      let result;

      if (createMode) {
        result = await createNewProduct(selectedProduct);
      } else {
        result = await updateSelectedProduct(selectedProduct);
      }

      if (result) {
        if (createMode) {
          exitCreateMode();
          navigate(`/products/${result[0].id}`);
        } else {
          exitEditMode();
        }
      } else {
        setError(true);
      }
    }
  };

  return (
    <section className="product-form">
      {error && <ErrorComponent message={createMode ? 'Error al crear el producto' : 'Error al modificar el producto'} />}
      <form onSubmit={handleSubmit} className="product-form">
        <label htmlFor="image">Url de la imagen: </label>
        <input type="url" name="img_url" id="image" value={selectedProduct.image} onChange={updateValue} />

        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" id="name" value={selectedProduct.name} onChange={updateValue} required />

        <label htmlFor="price">Precio €</label>
        <input type="text" name="price" id="price" value={selectedProduct.price} onChange={updateValue} />

        <label htmlFor="weight">Peso u.</label>
        <input type="number" name="weight" id="weight" value={selectedProduct.weight} onChange={updateValue} />

        <input type="submit" value={createMode ? 'Crear' : 'Modificar'} />
      </form>
    </section>
  );
}

export default ProductFormComponent;
