import React, { useMemo } from 'react';
import CartItem from '../components/CartItem.jsx';

export default function CartView({ items, onUpdateQuantity, onRemove }) {
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  if (!items.length) {
    return (
      <section className="container py-5">
        <div className="empty-cart text-center shadow-sm mx-auto">
          <div className="empty-cart-icon" aria-hidden="true">⌁</div>
          <h1 className="h2 fw-bold">Your cart is ready for equipment</h1>
          <p className="text-secondary">Add products from the catalog and they will appear here with options, quantities, and line totals.</p>
          <a href="#/shop" className="btn btn-primary btn-lg">Browse products</a>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <span className="eyebrow text-primary">Shopping cart</span>
          <h1 className="display-5 fw-bold mb-0">Review your order</h1>
        </div>
        <a href="#/shop" className="btn btn-outline-primary">Continue shopping</a>
      </div>

      <div className="row g-4 align-items-start">
        <div className="col-lg-8">
          <div className="cart-panel shadow-sm">
            <div className="d-none d-sm-flex row small text-secondary fw-semibold px-0 pb-2 border-bottom">
              <div className="col-2">Item</div><div className="col-4">Details</div><div className="col-2">Qty</div><div className="col-2 text-end">Price</div><div className="col-2 text-end">Total</div>
            </div>
            {items.map((item) => (
              <CartItem key={item.key} item={item} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <aside className="order-summary shadow-sm sticky-lg-top" style={{ top: '130px' }}>
            <h2 className="h4 fw-bold">Order summary</h2>
            <div className="summary-row"><span>Items</span><strong>{itemCount}</strong></div>
            <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <div className="summary-row"><span>Shipping</span><strong>{subtotal >= 250 ? 'Free' : 'Calculated later'}</strong></div>
            <hr />
            <div className="summary-row summary-total"><span>Estimated total</span><strong>${subtotal.toFixed(2)}</strong></div>
            <button className="btn btn-primary btn-lg w-100 mt-3" type="button" onClick={() => window.alert('Checkout is outside the scope of this client-side demo.')}>Proceed to checkout</button>
            <p className="small text-secondary mt-3 mb-0">This assignment demo does not use a payment gateway, database, or back-end checkout service.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
