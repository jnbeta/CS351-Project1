import React from 'react';
import SiteLogo from './SiteLogo.jsx';

export default function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container py-5">
        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <SiteLogo compact />
            <p className="mt-3 mb-0 footer-copy">
              Reliable laboratory glassware, instruments, safety supplies, and bench essentials for education, quality, and research environments.
            </p>
          </div>
          <div className="col-6 col-lg-3">
            <h2 className="h6 text-uppercase">Store</h2>
            <a href="#/shop" className="footer-link">All products</a>
            <a href="#/cart" className="footer-link">Shopping cart</a>
            <a href="#/account" className="footer-link">Account</a>
          </div>
          <div className="col-6 col-lg-4">
            <h2 className="h6 text-uppercase">Customer care</h2>
            <p className="footer-copy mb-1">Mon-Fri, 8:00-17:00 PT</p>
            <p className="footer-copy mb-1">support@meikolabs.example</p>
            <p className="footer-copy mb-0">1-800-MEIKO-LAB</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom py-3 text-center small">© 2026 Meiko Labs. Demo storefront for educational use.</div>
    </footer>
  );
}
