import React from 'react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const optionText = Object.entries(item.selectedOptions || {})
    .map(([name, value]) => `${name}: ${value}`)
    .join(' · ');
  const lineTotal = item.price * item.quantity;

  return (
    <div className="cart-item py-4 border-bottom">
      <div className="row align-items-center g-3">
        <div className="col-4 col-sm-2">
          <div className="cart-image-stage"><img src={item.image} alt="" className="img-fluid" /></div>
        </div>
        <div className="col-8 col-sm-4">
          <a className="fw-bold text-decoration-none cart-product-link" href={`#/product/${encodeURIComponent(item.sku)}`}>{item.name}</a>
          <div className="small text-secondary mt-1">{item.sku}</div>
          {optionText && <div className="small text-secondary mt-1">{optionText}</div>}
          <button className="btn btn-link text-danger p-0 mt-2 small" type="button" onClick={() => onRemove(item.key)}>Remove</button>
        </div>
        <div className="col-5 col-sm-2">
          <label className="form-label small fw-semibold" htmlFor={`qty-${item.key}`}>Quantity</label>
          <input
            id={`qty-${item.key}`}
            className="form-control"
            type="number"
            min="1"
            max="99"
            value={item.quantity}
            onChange={(event) => onUpdateQuantity(item.key, event.target.value)}
          />
        </div>
        <div className="col-3 col-sm-2 text-sm-end text-secondary">${item.price.toFixed(2)}</div>
        <div className="col-4 col-sm-2 text-end fw-bold">${lineTotal.toFixed(2)}</div>
      </div>
    </div>
  );
}
