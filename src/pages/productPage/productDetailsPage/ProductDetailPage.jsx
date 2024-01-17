/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2 } from 'react-bootstrap-icons';
import { ProductsContext } from '../../../context/productsProvider';
import { UserContext } from '../../../context/userContext';
import ProductComponent from '../../../components/productComponent/ProductComponent';
import './productDetailPage.css';
import ProductFormComponent from '../../../components/productFormComponent/ProductFormComponent';

function ProductDetailPage() {
  const { id } = useParams();
  const defaultProduct = {
    name: 'producto no encontrado',
  };
  const { products } = useContext(ProductsContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
  const [editMode, setEditMode] = useState(false);
  const findSelectedProduct = () => products.find((product) => product.id === id);
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    const product = findSelectedProduct();
    if (!product) {
      navigate('/products');
    } else {
      setSelectedProduct(findSelectedProduct());
      document.title = `Ficha de ${product.name} - Hungry`;
    }
    return () => {
      document.title = 'Hungry';
    };
  }, []);

  useEffect(() => {
    // Si el usuario no está logueado, lo redirigimos al login.
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <section className="product-detail-page">
      {user && (
      <>
        <h1>{`Ficha de ${selectedProduct.name}`}</h1>
        <section className="product-detail">
          {!editMode && <ProductComponent product={selectedProduct} />}
          {editMode && <ProductFormComponent /> }
          <section className="options">
            <button type="button"><Trash2 /></button>
            <button type="button" onClick={handleEdit}><Pencil /></button>
          </section>
        </section>
      </>
      )}
    </section>
  );
}

export default ProductDetailPage;
