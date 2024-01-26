/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../../../context/productsContext';
import ProductComponent from '../../products/productComponent/ProductComponent';
import ButtonComponent from '../../buttonComponent/ButtonComponent';

function AddProductShoppingList({ closeModal }) {
  const { products, getProducts } = useContext(ProductsContext);

  useEffect(() => {
    document.title = 'Añadir producto a la lista - Hungry';
    if (products.length === 0) getProducts();

    return () => {
      document.title = 'Hungry';
    };
  }, []);

  return (
    <div>
      <h1>
        {' '}
        Añadir producto

      </h1>
      <section className="product-list">
        {
            products.map((product) => (
              <div key={product.id}>
                <ProductComponent product={product} />
              </div>
            ))
        }
      </section>
      <ButtonComponent type="button" cancel text="Cerrar" action={closeModal} size="large" />
    </div>

  );
}

export default AddProductShoppingList;
