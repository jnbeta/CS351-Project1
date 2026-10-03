import React, { useState } from 'react';
import { validateLoginForm } from '../utils/validators.js';

export default function AccountView({ user, onLogin, onLogout }) {
  const [form, setForm] = useState({ login: '', password: '' });
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateLoginForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onLogin(form);
  }

  function reset() {
    setForm({ login: '', password: '' });
    setErrors({});
  }

  if (user) {
    return (
      <section className="container py-5">
        <div className="auth-card mx-auto shadow-sm">
          <span className="eyebrow text-primary">Account</span>
          <h1 className="h2 fw-bold mt-2">Welcome, {user.displayName}</h1>
          <p className="text-secondary">You are signed in as {user.login}. This demo stores the session only in your browser.</p>
          <div className="d-flex gap-2 flex-wrap">
            <a className="btn btn-primary" href="#/shop">Continue shopping</a>
            <button className="btn btn-outline-danger" type="button" onClick={onLogout}>Sign out</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6">
          <span className="eyebrow text-primary">Customer account</span>
          <h1 className="display-5 fw-bold mt-2">Sign in to Meiko Labs</h1>
          <p className="lead text-secondary">Save your session locally and move through the storefront as a returning customer.</p>
          <div className="auth-benefit"><strong>Simple demo authentication</strong><span>No server or database is required for this project.</span></div>
          <div className="auth-benefit"><strong>Client-side validation</strong><span>Required values are checked before the form is accepted.</span></div>
        </div>
        <div className="col-lg-6">
          <div className="auth-card shadow-sm">
            <h2 className="h3 fw-bold mb-4">Login</h2>
            <form onSubmit={submit} noValidate>
              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="login">Email or username</label>
                <input id="login" name="login" className={`form-control ${errors.login ? 'is-invalid' : ''}`} value={form.login} onChange={updateField} autoComplete="username" />
                {errors.login && <div className="invalid-feedback">{errors.login}</div>}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={form.password} onChange={updateField} autoComplete="current-password" />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="d-grid gap-2 d-sm-flex">
                <button className="btn btn-primary flex-grow-1" type="submit">Sign in</button>
                <button className="btn btn-outline-secondary" type="button" onClick={reset}>Reset</button>
              </div>
            </form>
            <hr className="my-4" />
            <p className="mb-0">New customer? <a href="#/create-account">Create an account</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
