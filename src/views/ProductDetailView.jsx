import React from 'react';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductDetailView({ product, onAddToCart }) {
  if (!product) {
    return (
      <section className="container py-5 text-center">
        <h1 className="display-5 fw-bold">Product not found</h1>
        <p className="text-secondary">The requested product is not in the current catalog.</p>
        <a href="#/shop" className="btn btn-primary">Back to shop</a>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><a href="#/">Home</a></li>
          <li className="breadcrumb-item"><a href="#/shop">Shop</a></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <ProductCard product={product} detail onAddToCart={onAddToCart} />

      <div className="row g-4 mt-4">
        <div className="col-lg-7">
          <div className="info-panel h-100">
            <h2 className="h4 mb-3">Product highlights</h2>
            <ul className="feature-list mb-0">
              {product.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="info-panel h-100">
            <h2 className="h4 mb-3">Technical specifications</h2>
            <dl className="spec-list mb-0">
              {Object.entries(product.specs).map(([name, value]) => (
                <div className="spec-row" key={name}><dt>{name}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
