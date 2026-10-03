# Meiko Labs — References, Templates, and How the Front-End Works

## Design/template disclosure

**No third-party website, Bootstrap theme, CSS template, React storefront template, or copied design was used for Meiko Labs.** The layout, visual styling, logo treatment, product-card presentation, hero section, custom CSS, and SVG product illustrations were created specifically for this project.

Bootstrap is used as a **front-end framework**, not as a prebuilt site template. The React/Vite project structure is also a development setup rather than a visual template. The official documentation below was used as reference for framework syntax, responsive classes, React patterns, and browser APIs.

---

## 1. Bootstrap 5

**Official documentation:**
- Getting started: https://getbootstrap.com/docs/5.3/getting-started/introduction/
- Grid system: https://getbootstrap.com/docs/5.3/layout/grid/
- Breakpoints: https://getbootstrap.com/docs/5.3/layout/breakpoints/
- Navbar: https://getbootstrap.com/docs/5.3/components/navbar/
- Collapse: https://getbootstrap.com/docs/5.3/components/collapse/
- Cards: https://getbootstrap.com/docs/5.3/components/card/
- Forms: https://getbootstrap.com/docs/5.3/forms/overview/
- Form validation styles: https://getbootstrap.com/docs/5.3/forms/validation/
- Buttons: https://getbootstrap.com/docs/5.3/components/buttons/
- Pagination: https://getbootstrap.com/docs/5.3/components/pagination/
- Spacing utilities: https://getbootstrap.com/docs/5.3/utilities/spacing/
- Flex utilities: https://getbootstrap.com/docs/5.3/utilities/flex/
- Display utilities: https://getbootstrap.com/docs/5.3/utilities/display/

### How Bootstrap is included

In `src/main.jsx`, Bootstrap is loaded from the installed npm package:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

The first import provides Bootstrap's CSS classes. The second provides Bootstrap's client-side JavaScript behavior, including the Collapse plugin used by the mobile navigation menu. Because `bootstrap.bundle.min.js` is used, the Bootstrap JavaScript bundle is available to elements that use `data-bs-*` attributes.

### How the responsive grid works in this project

Bootstrap uses a mobile-first 12-column grid. Classes apply from the named breakpoint upward.

For example, `ProductList.jsx` uses:

```jsx
<div className="row g-4">
  <div className="col-sm-6 col-xl-4">
```

This means:
- On extra-small screens, a product takes the full row by default.
- At the `sm` breakpoint and larger, each product uses 6 of 12 columns, so two products fit per row.
- At the `xl` breakpoint and larger, each product uses 4 of 12 columns, so three products fit per row.
- `g-4` adds Bootstrap gutter spacing between grid items.

The product detail view uses `col-lg-6` for both image and information columns. Below the `lg` breakpoint they stack vertically; at `lg` and above they appear side-by-side.

### How the responsive navbar works

`Navigation.jsx` uses these Bootstrap classes and data attributes:

```jsx
<nav className="navbar navbar-expand-lg navbar-dark ...">
<button
  className="navbar-toggler"
  data-bs-toggle="collapse"
  data-bs-target="#mainNav"
>
<div className="collapse navbar-collapse" id="mainNav">
```

`navbar-expand-lg` means the full navigation is shown on large screens and collapses on smaller screens. The button's `data-bs-toggle="collapse"` and `data-bs-target="#mainNav"` tell Bootstrap's Collapse JavaScript to open or close the element whose ID is `mainNav`.

### Cards, buttons, forms, and validation styling

Product cards use Bootstrap's card structure, including classes such as `card`, `card-body`, `card-title`, `card-img-top`, `h-100`, and `shadow-sm`. Meiko Labs then adds custom classes such as `product-card` and `product-image-stage` in `src/styles.css` to create the branded appearance.

Buttons use standard Bootstrap variants such as:

```text
btn btn-primary
btn btn-outline-primary
btn btn-outline-secondary
btn-lg
btn-sm
```

Forms use classes including `form-label`, `form-control`, and `form-select`. React performs the actual validation logic in JavaScript. When a field has an error, the component adds Bootstrap's `is-invalid` class and renders an `invalid-feedback` element. Bootstrap supplies the visual invalid-state styling, while the project's JavaScript decides whether the field is valid.

### Pagination

`ShopView.jsx` uses Bootstrap pagination presentation classes:

```text
pagination
page-item
page-link
active
disabled
```

React state controls the current page. Bootstrap styles the controls; React performs the page calculations and click handling.

### Bootstrap utilities

Classes such as `d-flex`, `d-grid`, `gap-2`, `align-items-center`, `justify-content-between`, `py-5`, `mb-4`, `text-secondary`, `fw-bold`, and `shadow-sm` are Bootstrap utility classes. These reduce the amount of custom CSS needed for common spacing, layout, typography, and visual effects.

---

## 2. Custom CSS

**Reference documentation:**
- MDN CSS overview: https://developer.mozilla.org/en-US/docs/Web/CSS
- CSS custom properties (variables): https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties
- Media queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using
- Flexbox: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout
- CSS Grid: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- Gradients: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient
- Transitions: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions

### How the custom CSS works

All project-specific styling is in `src/styles.css`. It is loaded **after** Bootstrap in `src/main.jsx`, so Meiko Labs styles can extend or override Bootstrap where needed.

The `:root` section defines reusable CSS variables:

```css
:root {
  --meiko-navy: #0c2433;
  --meiko-blue: #0e6f8f;
  --meiko-mint: #dff7f4;
  --bs-primary: #0e6f8f;
  --bs-primary-rgb: 14, 111, 143;
}
```

The `--meiko-*` variables keep the brand colors consistent. The `--bs-primary` variables also customize Bootstrap's primary color so Bootstrap components blend with the Meiko Labs brand.

Custom classes such as `.hero-section`, `.product-card`, `.detail-card`, `.auth-card`, and `.order-summary` add the storefront's visual identity. CSS gradients create the hero background, transitions provide the product-card hover movement, and border radius/shadows create the modern panel/card styling.

Responsive CSS media queries are also used:

```css
@media (max-width: 991.98px) { ... }
@media (max-width: 575.98px) { ... }
```

These complement Bootstrap's responsive classes by changing Meiko-specific details such as hero height, logo tagline visibility, detail-image spacing, and cart presentation at smaller screen sizes.

---

## 3. React

**Official documentation:**
- React documentation: https://react.dev/
- Components and props: https://react.dev/learn/passing-props-to-a-component
- `useState`: https://react.dev/reference/react/useState
- Responding to events: https://react.dev/learn/responding-to-events
- Rendering lists / `.map()`: https://react.dev/learn/rendering-lists
- Conditional rendering: https://react.dev/learn/conditional-rendering
- Sharing state between components: https://react.dev/learn/sharing-state-between-components

### How React is used

The SPA is made from reusable components such as `ProductList`, `ProductCard`, `CartItem`, `Navigation`, `Footer`, and `SiteLogo`. Data is passed into components with props.

React `useState` stores interactive client-side data such as:
- current route/view,
- shopping cart,
- current user,
- product quantity/options,
- search/category/sort filters,
- pagination,
- form values and validation errors.

Event handlers such as `onClick`, `onChange`, and `onSubmit` update state. React then re-renders the affected UI automatically.

The assignment-required `.map()` pattern is used to turn arrays into React elements. For example, `ProductList.jsx` maps product data into one `ProductCard` for each visible product:

```jsx
{visibleProducts.map((product) => (
  <ProductCard product={product} />
))}
```

React conditional rendering is used for situations such as empty vs. filled carts, signed-in vs. signed-out accounts, validation errors, pagination visibility, and different application views.

---

## 4. JavaScript / Browser APIs

**Reference documentation:**
- JavaScript guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- `Array.prototype.map()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- `Array.prototype.filter()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- Web Storage / `localStorage`: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- ES modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

### How JavaScript is used

Client-side JavaScript handles product filtering, sorting, pagination, cart calculations, form validation, event handling, and browser storage. The application does not require a database or backend server.

`localStorage` keeps the demo shopping cart and account/session data in the user's browser so the data can remain after a page refresh. This is only client-side storage and is not intended to represent production authentication or checkout security.

---

## 5. Vite

**Official documentation:**
- Vite guide: https://vite.dev/guide/
- Vite React plugin: https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react

### How Vite is used

Vite is the development/build tool. `index.html` contains the root element used by React, and Vite loads `src/main.jsx` as the JavaScript entry point. During development, `npm run dev` starts the local development server. `npm run build` creates optimized production files.

Vite is not the visual design source for the storefront. It provides the development environment and build process for the React application.

---

## Summary for project submission

Meiko Labs does **not** use a downloaded storefront theme or design template. Bootstrap 5 provides the mobile-first layout system, responsive navbar behavior, form/card/button styles, pagination styles, and utility classes. React provides the reusable component/state/event model. Custom CSS in `src/styles.css` supplies the original Meiko Labs visual design. Official Bootstrap, React, Vite, and MDN documentation were used as technical references and are linked above.
