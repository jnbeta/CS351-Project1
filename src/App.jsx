import React, { useEffect, useMemo, useState } from 'react';
import products from './data/products.json';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import HomeView from './views/HomeView.jsx';
import ShopView from './views/ShopView.jsx';
import ProductDetailView from './views/ProductDetailView.jsx';
import AccountView from './views/AccountView.jsx';
import CreateAccountView from './views/CreateAccountView.jsx';
import CartView from './views/CartView.jsx';

function getRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.replace(/^#/, '');
  if (path.startsWith('/product/')) {
    return { view: 'product', sku: decodeURIComponent(path.split('/')[2] || '') };
  }
  if (path === '/shop') return { view: 'shop' };
  if (path === '/account') return { view: 'account' };
  if (path === '/create-account') return { view: 'create-account' };
  if (path === '/cart') return { view: 'cart' };
  return { view: 'home' };
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem('meiko-cart')) || [];
  } catch {
    return [];
  }
}

function readUser() {
  try {
    return JSON.parse(localStorage.getItem('meiko-user')) || null;
  } catch {
    return null;
  }
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [cartItems, setCartItems] = useState(readCart);
  const [user, setUser] = useState(readUser);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('meiko-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user) localStorage.setItem('meiko-user', JSON.stringify(user));
    else localStorage.removeItem('meiko-user');
  }, [user]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  function addToCart(product, quantity, selectedOptions) {
    const key = `${product.sku}|${Object.entries(selectedOptions)
      .map(([name, value]) => `${name}:${value}`)
      .join('|')}`;

    setCartItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key
            ? { ...item, quantity: Math.min(item.quantity + quantity, 99) }
            : item,
        );
      }
      return [
        ...current,
        {
          key,
          sku: product.sku,
          name: product.name,
          image: product.thumbnail,
          price: product.price,
          selectedOptions,
          quantity,
        },
      ];
    });
    setToast(`${product.name} added to cart.`);
  }

  function updateCartQuantity(key, quantity) {
    const safeQuantity = Math.max(1, Math.min(Number(quantity) || 1, 99));
    setCartItems((current) =>
      current.map((item) => (item.key === key ? { ...item, quantity: safeQuantity } : item)),
    );
  }

  function removeCartItem(key) {
    setCartItems((current) => current.filter((item) => item.key !== key));
  }

  function handleLogin(credentials) {
    const displayName = credentials.login.includes('@')
      ? credentials.login.split('@')[0]
      : credentials.login;
    setUser({ displayName, login: credentials.login });
    setToast(`Welcome, ${displayName}.`);
    window.location.hash = '#/';
  }

  function handleCreateAccount(account) {
    setUser({ displayName: account.login, login: account.email });
    setToast('Account created successfully.');
    window.location.hash = '#/';
  }

  function handleLogout() {
    setUser(null);
    setToast('You have been signed out.');
  }

  let content;
  if (route.view === 'shop') {
    content = <ShopView products={products} />;
  } else if (route.view === 'product') {
    const product = products.find((item) => item.sku === route.sku);
    content = <ProductDetailView product={product} onAddToCart={addToCart} />;
  } else if (route.view === 'account') {
    content = <AccountView user={user} onLogin={handleLogin} onLogout={handleLogout} />;
  } else if (route.view === 'create-account') {
    content = <CreateAccountView onCreateAccount={handleCreateAccount} />;
  } else if (route.view === 'cart') {
    content = (
      <CartView
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeCartItem}
      />
    );
  } else {
    content = <HomeView products={products} />;
  }

  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <Navigation cartCount={cartCount} user={user} />
      {toast && (
        <div className="toast-shell" role="status" aria-live="polite">
          <div className="alert alert-success shadow-sm mb-0">{toast}</div>
        </div>
      )}
      <main className="flex-grow-1">{content}</main>
      <Footer />
    </div>
  );
}
