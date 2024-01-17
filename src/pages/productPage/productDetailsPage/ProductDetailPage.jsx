import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>
        {id}
      </p>
    </div>
  );
}

export default ProductDetailPage;
