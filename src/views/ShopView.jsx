import React, { useMemo, useState } from 'react';
import ProductList from '../components/ProductList.jsx';

const PAGE_SIZE = 10;

export default function ShopView({ products }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((item) => item.category))).sort()],
    [products],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = products.filter((item) => {
      const inCategory = category === 'All' || item.category === category;
      const matchesText = !normalized || [item.name, item.brand, item.category, item.sku, item.shortDescription]
        .join(' ')
        .toLowerCase()
        .includes(normalized);
      return inCategory && matchesText;
    });

    if (sort === 'price-low') return [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return [...result].sort((a, b) => b.price - a.price);
    if (sort === 'name') return [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [products, query, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageProducts = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  return (
    <section className="container py-5">
      <div className="row align-items-end g-3 mb-4">
        <div className="col-lg-7">
          <span className="eyebrow text-primary">Meiko Labs catalog</span>
          <h1 className="display-5 fw-bold mb-2">Laboratory equipment</h1>
          <p className="text-secondary mb-0">Browse {products.length} glassware, instruments, safety products, and everyday bench essentials.</p>
        </div>
        <div className="col-lg-5 text-lg-end">
          <span className="result-count">Showing {pageProducts.length} of {filtered.length} products</span>
        </div>
      </div>

      <div className="filter-panel shadow-sm mb-4">
        <div className="row g-3">
          <div className="col-lg-5">
            <label htmlFor="shop-search" className="form-label fw-semibold">Search products</label>
            <input
              id="shop-search"
              className="form-control"
              type="search"
              placeholder="Try beaker, pH, safety..."
              value={query}
              onChange={(event) => changeFilter(setQuery, event.target.value)}
            />
          </div>
          <div className="col-sm-6 col-lg-4">
            <label htmlFor="shop-category" className="form-label fw-semibold">Category</label>
            <select id="shop-category" className="form-select" value={category} onChange={(event) => changeFilter(setCategory, event.target.value)}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="col-sm-6 col-lg-3">
            <label htmlFor="shop-sort" className="form-label fw-semibold">Sort</label>
            <select id="shop-sort" className="form-select" value={sort} onChange={(event) => changeFilter(setSort, event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <ProductList products={filtered} page={safePage} pageSize={PAGE_SIZE} />

      {pageCount > 1 && (
        <nav className="mt-5" aria-label="Shop pagination">
          <ul className="pagination justify-content-center flex-wrap gap-1">
            <li className={`page-item ${safePage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</button>
            </li>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
              <li className={`page-item ${number === safePage ? 'active' : ''}`} key={number}>
                <button className="page-link" onClick={() => setPage(number)}>{number}</button>
              </li>
            ))}
            <li className={`page-item ${safePage === pageCount ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </section>
  );
}
