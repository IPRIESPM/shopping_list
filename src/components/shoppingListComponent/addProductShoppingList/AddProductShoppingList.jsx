/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../../../context/productsContext';
import ProductComponent from '../../products/productComponent/ProductComponent';
import ButtonComponent from '../../buttonComponent/ButtonComponent';
import { ShoppingListContext } from '../../../context/shoppingListContext';
import './addProductShoppingList.css';

function AddProductShoppingList({ closeModal }) {
  const { products, getProducts } = useContext(ProductsContext);
  const {
    shoppingListSelected,
    addProductShoppingList,
    updateProductShoppingList,
    deleteProductShoppingList,
  } = useContext(ShoppingListContext);

  const productExist = (id) => {
    const product = shoppingListSelected.products.find((pro) => pro.product.id === id);
    return product !== undefined;
  };

  const handleAddProduct = (product) => {
    if (productExist(product.id)) {
      updateProductShoppingList(product);
    } else {
      addProductShoppingList(product);
    }
  };

  const handleDelete = (product) => {
    deleteProductShoppingList(product.product, true);
  };

  useEffect(() => {
    document.title = 'Modificar lista - Hungry';
    if (products.length === 0) getProducts();
    return () => {
      document.title = 'Hungry';
    };
  }, []);

  return (
    <section className="add-product-shopping-list">
      <h1>
        {' '}
        Modificando la lista
        {' '}
        {shoppingListSelected.name}
      </h1>
      <section className="body">

        <section className="product-list">
          <p className="title">Crear o añadir cantidad</p>
          <hr />
          {
            products.map((product) => (
              <button
                type="button"
                key={`${product.id}-product`}
                className={productExist(product.id) ? 'disabled' : ''}
                onClick={() => handleAddProduct(product)}
              >
                <ProductComponent product={product} />
              </button>
            ))
          }
        </section>

        <section className="product-list">
          <p className="title">Eliminar producto o cantidad</p>
          <hr />
          {shoppingListSelected.products.length === 0 && (
            <p className="info">No hay productos en la lista</p>
          )}
          <section className="as">
            {
              shoppingListSelected.products.map((product) => (
                <button type="button" key={`${product.product.id}-list`} onClick={() => handleDelete(product)}>
                  <ProductComponent product={product.product} amount={product.amount} />
                </button>
              ))
            }
          </section>
        </section>
      </section>
      <ButtonComponent type="button" cancel text="Cerrar" action={closeModal} size="large" />
    </section>

  );
}

export default AddProductShoppingList;
