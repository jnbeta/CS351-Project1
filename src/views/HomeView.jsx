import React from 'react';
import ProductCard from '../components/ProductCard.jsx';

export default function HomeView({ products }) {
  const featured = [products[0], products[6], products[11]].filter(Boolean);

  return (
    <>
      <section className="hero-section">
        <div className="container py-5 py-lg-6">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="eyebrow">Professional laboratory essentials</span>
              <h1 className="display-3 fw-bold mt-3 mb-3">Equip better experiments.</h1>
              <p className="lead hero-copy mb-4">
                Meiko Labs supplies dependable glassware, precision instruments, safety gear, and bench essentials built for teaching, quality control, and research.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#/shop" className="btn btn-light btn-lg px-4">Shop equipment</a>
                <a href="#/account" className="btn btn-outline-light btn-lg px-4">Your account</a>
              </div>
              <div className="hero-stats row g-3 mt-4">
                <div className="col-4"><strong>30+</strong><span>Curated items</span></div>
                <div className="col-4"><strong>5★</strong><span>Bench-ready picks</span></div>
                <div className="col-4"><strong>Mobile</strong><span>Ready catalog</span></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-visual shadow-lg">
                <div className="hero-grid-lines" aria-hidden="true" />
                <img src="./images/hero-lab.svg" alt="Illustration of laboratory glassware and instruments" className="img-fluid" />
                <div className="hero-floating-card">
                  <span className="small text-uppercase">Featured category</span>
                  <strong>Precision glassware</strong>
                  <a href="#/shop" className="small">Browse collection →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="value-card h-100">
              <div className="value-icon">01</div>
              <h2 className="h5">Lab-focused catalog</h2>
              <p className="mb-0 text-secondary">Products are organized for practical chemistry, biology, measurement, and general bench work.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="value-card h-100">
              <div className="value-icon">02</div>
              <h2 className="h5">Clear specifications</h2>
              <p className="mb-0 text-secondary">Each detail view includes technical specs, options, pricing, and an easy add-to-cart workflow.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="value-card h-100">
              <div className="value-icon">03</div>
              <h2 className="h5">Mobile-ready shopping</h2>
              <p className="mb-0 text-secondary">Bootstrap 5 layouts adapt navigation, cards, forms, and cart controls to smaller screens.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <span className="eyebrow text-primary">Bench favorites</span>
            <h2 className="display-6 fw-bold mb-0">Featured equipment</h2>
          </div>
          <a href="#/shop" className="btn btn-outline-primary">View all products</a>
        </div>
        <div className="row g-4">
          {featured.map((product) => (
            <div className="col-md-4" key={product.sku}><ProductCard product={product} /></div>
          ))}
        </div>
      </section>
    </>
  );
}
