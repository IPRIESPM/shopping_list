/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, PencilFill, Trash2 } from 'react-bootstrap-icons';
import { ProductsContext } from '../../../context/productsContext';
import ProductComponent from '../../../components/products/productComponent/ProductComponent';
import './productDetailPage.css';
import ProductFormComponent from '../../../components/products/productFormComponent/ProductFormComponent';
import { ModalContext } from '../../../context/modalContext';
import ModalComponent from '../../../components/modalComponent/ModalComponent';

function ProductDetailPage() {
  /*
    Obtenemos el id del producto de la url, y lo usamos para obtener el producto
    de la base de datos.
    Preparamos los estados para el modo de edición y el modo de creación.
    Si el id es 'new', cambiamos el título de la página y activamos el modo de creación.
    Si el id no es 'new', buscamos el producto en la base de datos.
    Si no lo encontramos, redirigimos a la página de productos.
    Si lo encontramos, cambiamos el título de la página.
  */
  const { id } = useParams();
  const { selectedProduct, selectProductById, changeSelectedProduct } = useContext(ProductsContext);
  const { changeModal, modalStatus } = useContext(ModalContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const exitEditMode = () => {
    setEditMode(false);
  };

  const exitCreateMode = () => {
    setCreateMode(false);
  };

  useEffect(() => {
    if (id === 'new') {
      document.title = 'Nuevo producto - Hungry';
      setCreateMode(true);
    } else {
      const product = selectProductById(id);
      if (!product) {
        navigate('/products');
      } else {
        document.title = `Ficha de ${product.name} - Hungry`;
      }
    }
    return () => {
      document.title = 'Hungry';
      changeSelectedProduct(null);
    };
  }, [id]);

  return (
    <section className="product-detail-page">
      {modalStatus && <ModalComponent />}
      { selectedProduct && <h1>{`Ficha de ${selectedProduct.name}`}</h1>}
      { createMode && <h1> Nueva ficha de producto</h1>}
      { selectedProduct && (
        <section className="product-detail">
          {!editMode && <ProductComponent product={selectedProduct} />}
          {editMode && (
            <ProductFormComponent
              product={selectedProduct}
              exitEditMode={exitEditMode}
            />
          )}
          <section className="options">
            {!editMode && (
              <button type="button" onClick={changeModal}>
                <Trash2 />
              </button>
            )}

            <button type="button" onClick={handleEdit}>
              {!editMode ? <Pencil /> : <PencilFill />}
            </button>
          </section>
        </section>
      )}

      { createMode && (
        <ProductFormComponent
          product={null}
          exitEditMode={exitEditMode}
          exitCreateMode={exitCreateMode}
        />
      )}
    </section>
  );
}

export default ProductDetailPage;
