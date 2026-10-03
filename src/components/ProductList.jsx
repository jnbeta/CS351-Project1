import React from 'react';
import ProductCard from './ProductCard.jsx';

export default function ProductList({ products, page = 1, pageSize = 10 }) {
  if (!products.length) {
    return (
      <div className="empty-panel text-center py-5">
        <h2 className="h4">No products found</h2>
        <p className="text-secondary mb-0">Try another category or search term.</p>
      </div>
    );
  }

  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  return (
    <div className="row g-4">
      {visibleProducts.map((product) => (
        <div className="col-sm-6 col-xl-4" key={product.sku}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
