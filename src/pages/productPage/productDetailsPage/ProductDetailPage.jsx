/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, PencilFill, Trash2 } from 'react-bootstrap-icons';
import { ProductsContext } from '../../../context/productsContext';
import { UserContext } from '../../../context/userContext';
import ProductComponent from '../../../components/productComponent/ProductComponent';
import './productDetailPage.css';
import ProductFormComponent from '../../../components/productFormComponent/ProductFormComponent';

function ProductDetailPage() {
  const { id } = useParams();
  const { selectedProduct, selectProductById } = useContext(ProductsContext);
  const { user } = useContext(UserContext);
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
      selectProductById(null);
    };
  }, [id]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (id !== 'new') selectProductById(id);
  }, [id]);

  return (
    <section className="product-detail-page">
      {user && selectedProduct && <h1>{`Ficha de ${selectedProduct.name}`}</h1>}
      {user && createMode && <h1> Nueva ficha de producto</h1>}
      {user && selectedProduct && (
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
              <button type="button">
                <Trash2 />
              </button>
            )}

            <button type="button" onClick={handleEdit}>
              {!editMode ? <Pencil /> : <PencilFill />}
            </button>
          </section>
        </section>
      )}

      {user && createMode && (
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
