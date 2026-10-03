import React, { useMemo, useState } from 'react';

export default function ProductCard({ product, detail = false, onAddToCart }) {
  const initialOptions = useMemo(
    () => Object.fromEntries((product?.optionGroups || []).map((group) => [group.name, group.values[0]])),
    [product],
  );
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  if (!detail) {
    return (
      <article className="product-card card h-100 border-0 shadow-sm">
        <a href={`#/product/${encodeURIComponent(product.sku)}`} className="product-image-link">
          <div className="product-image-stage">
            <img src={product.thumbnail} alt={product.name} className="card-img-top product-image" />
          </div>
        </a>
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
            <span className="category-pill">{product.category}</span>
            <span className="sku-label">{product.sku}</span>
          </div>
          <a href={`#/product/${encodeURIComponent(product.sku)}`} className="product-title-link">
            <h2 className="h5 card-title mb-2">{product.name}</h2>
          </a>
          <p className="text-secondary small flex-grow-1">{product.shortDescription}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <strong className="product-price">${product.price.toFixed(2)}</strong>
            <a className="btn btn-outline-primary btn-sm" href={`#/product/${encodeURIComponent(product.sku)}`}>View details</a>
          </div>
        </div>
      </article>
    );
  }

  function resetOrderForm() {
    setSelectedOptions(initialOptions);
    setQuantity(1);
  }

  function submitOrder(event) {
    event.preventDefault();
    onAddToCart(product, quantity, selectedOptions);
  }

  return (
    <article className="detail-card card border-0 shadow-sm overflow-hidden">
      <div className="row g-0">
        <div className="col-lg-6 detail-image-column">
          <div className="detail-image-stage h-100">
            <img src={product.image} alt={product.name} className="detail-product-image" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card-body p-4 p-xl-5">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="category-pill">{product.category}</span>
              <span className="brand-pill">{product.brand}</span>
            </div>
            <h1 className="display-6 fw-bold mb-2">{product.name}</h1>
            <p className="text-secondary small mb-3">SKU {product.sku}</p>
            <div className="product-price product-price-large mb-3">${product.price.toFixed(2)}</div>
            <p className="lead detail-lead">{product.longDescription}</p>

            <form onSubmit={submitOrder} className="mt-4" noValidate>
              <div className="row g-3">
                {product.optionGroups.map((group) => {
                  const optionId = `option-${group.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                  return (
                  <div className="col-sm-6" key={group.name}>
                    <label className="form-label fw-semibold" htmlFor={optionId}>{group.name}</label>
                    <select
                      id={optionId}
                      className="form-select"
                      value={selectedOptions[group.name]}
                      onChange={(event) => setSelectedOptions((current) => ({ ...current, [group.name]: event.target.value }))}
                    >
                      {group.values.map((value) => <option value={value} key={value}>{value}</option>)}
                    </select>
                  </div>
                  );
                })}
                <div className="col-sm-6">
                  <label className="form-label fw-semibold" htmlFor="product-quantity">Quantity</label>
                  <input
                    id="product-quantity"
                    className="form-control"
                    type="number"
                    min="1"
                    max="99"
                    required
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Math.min(99, Number(event.target.value) || 1)))}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <button className="btn btn-primary btn-lg flex-grow-1" type="submit">Add to cart</button>
                <button className="btn btn-outline-secondary btn-lg" type="button" onClick={resetOrderForm}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
}
