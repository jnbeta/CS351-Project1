import React from 'react';
import SiteLogo from './SiteLogo.jsx';

export default function Navigation({ cartCount, user }) {
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark meiko-nav shadow-sm" aria-label="Primary navigation">
        <div className="container">
          <a className="navbar-brand py-2" href="#/" aria-label="Meiko Labs home">
            <SiteLogo />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
              <li className="nav-item"><a className="nav-link" href="#/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#/shop">Shop</a></li>
              <li className="nav-item">
                <a className="nav-link" href="#/account">{user ? `Hi, ${user.displayName}` : 'Account'}</a>
              </li>
              <li className="nav-item ms-lg-2">
                <a className="btn btn-light cart-button" href="#/cart">
                  Cart <span className="badge rounded-pill text-bg-primary ms-1">{cartCount}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="shipping-strip text-center small py-2">
        Free ground shipping on orders over $250 <span className="mx-2">•</span> Educational and research purchasing welcome
      </div>
    </header>
  );
}
