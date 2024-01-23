/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateInputs } from '../../../utils/utils';
import './productFormComponent.css';
import { ProductsContext } from '../../../context/productsContext';
import ErrorComponent from '../../errorComponent/ErrorComponent';
import LoadingComponent from '../../loadingComponent/LoadingComponent';

function ProductFormComponent({ product, exitEditMode, exitCreateMode }) {
  // Establecemos el producto vacio por defecto.
  const defaultProduct = {
    img_url: '',
    name: '',
    weight: 0,
    price: 0,
  };

  // Traemos el contexto de los productos.
  const {
    updateProduct, createProduct, loading, error,
  } = useContext(ProductsContext);
  // Establecemos los estados para el producto y el modo de creación.
  const [formProduct, setFormProduct] = useState(defaultProduct);
  const [createMode, setCreateMode] = useState(false);

  // Traemos la función para navegar, entre páginas.
  const navigate = useNavigate();

  // Función para actualizar el valor de los inputs.
  const updateValue = (event) => {
    const { name, value } = event.target;
    // Reseteamos el mensaje de error, en el momento que se modifique el input.
    event.target.setCustomValidity('');
    // Actualizamos el estado del producto.
    setFormProduct({ ...formProduct, [name]: value });
  };

  useEffect(() => {
    // Si recibimos un producto, lo establecemos cómo producto.
    if (product) {
      setFormProduct(product);
    } else {
      // Si no recibimos un producto, establecemos el producto por defecto y el modo de creación.
      setFormProduct(defaultProduct);
      setCreateMode(true);
    }

    return () => {
      // Cuando se desmonte el componente, establecemos el producto por defecto.
      setFormProduct(defaultProduct);
    };
  }, []);

  // Función para enviar el formulario.
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validamos los inputs.
    const isValid = validateInputs(event.target);
    event.target.reportValidity();

    // Si los inputs son válidos, enviamos la petición.
    if (isValid) {
      // Si estamos en modo de creación, creamos el producto.
      // Si no, actualizamos el producto.
      let result;
      if (createMode) {
        result = await createProduct(formProduct);
      } else {
        result = await updateProduct(formProduct);
      }

      // Si la petición es correcta, salimos del modo de creación o edición.
      // Si estamos en modo de creación, navegamos a la página del producto.
      if (result) {
        if (createMode) {
          exitCreateMode();
          navigate(`/products/${result[0].id}`);
        } else {
          exitEditMode();
        }
      }
    }
  };

  return (
    <section className="product-form">
      {error && <ErrorComponent message={createMode ? 'Error al crear el producto' : 'Error al modificar el producto'} />}

      { loading && <LoadingComponent message={createMode ? 'Creando producto' : 'Modificando producto'} />}
      <form onSubmit={handleSubmit} className="product-form">
        <section>
          <fieldset>
            <label htmlFor="image">Url de la imagen: </label>
            <input type="url" name="img_url" id="image" value={formProduct.img_url} onChange={updateValue} />
          </fieldset>

          <fieldset>
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" id="name" value={formProduct.name} onChange={updateValue} autoFocus />
          </fieldset>
          <fieldset>
            <label htmlFor="price">Precio €</label>
            <input type="text" name="price" id="price" value={formProduct.price} onChange={updateValue} />
          </fieldset>
          <fieldset>
            <label htmlFor="weight">Peso gr</label>
            <input type="number" name="weight" id="weight" value={formProduct.weight} onChange={updateValue} />
          </fieldset>
        </section>
        <p>
          <input type="submit" value={createMode ? 'Crear' : 'Modificar'} />
        </p>
      </form>
    </section>
  );
}

export default ProductFormComponent;
