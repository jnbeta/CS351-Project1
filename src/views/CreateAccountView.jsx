import React, { useState } from 'react';
import { validateCreateAccountForm } from '../utils/validators.js';

const emptyForm = {
  login: '', password: '', email: '', street: '', city: '', state: '', zip: '', phone: '',
};

export default function CreateAccountView({ onCreateAccount }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateCreateAccountForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onCreateAccount(form);
  }

  function reset() {
    setForm(emptyForm);
    setErrors({});
  }

  const input = (name, label, options = {}) => (
    <div className={options.wrapper || 'col-12'}>
      <label className="form-label fw-semibold" htmlFor={`create-${name}`}>{label}{options.required && <span className="text-danger"> *</span>}</label>
      <input
        id={`create-${name}`}
        name={name}
        type={options.type || 'text'}
        autoComplete={options.autoComplete}
        className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
        value={form[name]}
        onChange={updateField}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-9">
          <div className="auth-card shadow-sm">
            <div className="row g-5">
              <div className="col-lg-4">
                <span className="eyebrow text-primary">Create account</span>
                <h1 className="h2 fw-bold mt-2">Join Meiko Labs</h1>
                <p className="text-secondary">Required fields are marked with an asterisk. Address and phone fields are optional but validated when provided.</p>
                <div className="required-note">Password must contain at least 8 characters, including upper- and lowercase letters and a number.</div>
              </div>
              <div className="col-lg-8">
                <form onSubmit={submit} noValidate>
                  <div className="row g-3">
                    {input('login', 'Username', { required: true, wrapper: 'col-md-6', autoComplete: 'username' })}
                    {input('email', 'Email', { required: true, wrapper: 'col-md-6', type: 'email', autoComplete: 'email' })}
                    {input('password', 'Password', { required: true, wrapper: 'col-12', type: 'password', autoComplete: 'new-password' })}
                    {input('street', 'Street address', { wrapper: 'col-12', autoComplete: 'street-address' })}
                    {input('city', 'City', { wrapper: 'col-md-5', autoComplete: 'address-level2' })}
                    {input('state', 'State / province', { wrapper: 'col-md-3', autoComplete: 'address-level1' })}
                    {input('zip', 'ZIP / postal code', { wrapper: 'col-md-4', autoComplete: 'postal-code' })}
                    {input('phone', 'Phone', { wrapper: 'col-md-6', type: 'tel', autoComplete: 'tel' })}
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <button className="btn btn-primary btn-lg" type="submit">Create account</button>
                    <button className="btn btn-outline-secondary btn-lg" type="button" onClick={reset}>Reset form</button>
                    <a className="btn btn-link btn-lg" href="#/account">Back to login</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
