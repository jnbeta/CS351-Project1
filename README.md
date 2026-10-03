# Meiko Labs Storefront

A modern React single-page storefront for laboratory equipment. The project is intentionally client-side only and demonstrates reusable React components, JSX, Bootstrap 5, CSS, ES6+ JavaScript, React state, event handling, `.map()`, conditional rendering, responsive design, and client-side form validation.

## Run the project

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm run build
npm run preview
```

## Architecture

```text
index.html
└── React SPA
    ├── HomeView
    ├── ShopView
    │   └── ProductList
    │       └── ProductCard (rendered with .map())
    ├── ProductDetailView
    │   └── ProductCard (detail mode + order form)
    ├── AccountView
    ├── CreateAccountView
    └── CartView
        └── CartItem (rendered with .map())
```

## Project structure

```text
meiko-labs-storefront/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── images/                # Local SVG product illustrations
└── src/
    ├── App.jsx                # SPA route state, cart/user state, conditional rendering
    ├── main.jsx
    ├── styles.css
    ├── data/
    │   └── products.json      # 31 product records
    ├── components/
    │   ├── CartItem.jsx
    │   ├── Footer.jsx
    │   ├── Navigation.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductList.jsx
    │   └── SiteLogo.jsx
    ├── utils/
    │   └── validators.js
    └── views/
        ├── AccountView.jsx
        ├── CartView.jsx
        ├── CreateAccountView.jsx
        ├── HomeView.jsx
        ├── ProductDetailView.jsx
        └── ShopView.jsx
```

## Requirement mapping

- **React + JSX:** all views and reusable components are React JSX files.
- **Bootstrap 5:** imported from the npm package in `src/main.jsx`; Bootstrap grid, forms, navigation collapse, buttons, cards, pagination, spacing utilities, and responsive breakpoints are used throughout.
- **Client-side JavaScript / ES6+:** modules, array methods, object spread, template strings, event handlers, derived state, hash navigation, and localStorage are used.
- **Reusable components with props:** `ProductList`, `ProductCard`, `CartItem`, `Navigation`, `Footer`, and `SiteLogo` receive props.
- **React state (`useState`):** used for SPA route, cart, signed-in demo user, shop filters, pagination, product options/quantity, and form input/errors.
- **Event handling:** click, change, submit, and hash-change events update the UI.
- **Rendering collections using `.map()`:** required product cards, cart items, option choices, features, specification rows, pagination buttons, and categories are rendered from collections.
- **Conditional rendering:** App chooses the active view; account changes for signed-in state; cart has empty/filled states; validation errors and pagination render conditionally.
- **Client-side validation:** login and account creation are validated in `src/utils/validators.js`; required and optional fields are checked. Forms include reset controls.
- **Product data:** `src/data/products.json` contains 31 products rather than separate product HTML pages.
- **ProductList:** receives the product collection as a prop and uses `.map()` to create one `ProductCard` per product on the current page.
- **ProductCard:** displays a single product in the shop and is reused in detail mode for the individual product view and add-to-cart form.
- **Home View:** initial route `#/` with an entrance hero, lab imagery, information, and featured products.
- **Shop View:** `#/shop`; includes search, category filter, sort, `ProductList`, and pagination capped at 10 products per page.
- **Individual Product View:** `#/product/<sku>`; shows product information, options, quantity, technical specifications, and add-to-cart form.
- **Account View:** `#/account`; login form and navigation to Create Account.
- **Create Account View:** `#/create-account`; required username/password/email plus optional street/city/state/ZIP/phone fields with JavaScript validation.
- **Navigation:** appears on every view and links to Home, Shop, Account, and Cart; the Meiko Labs brand links to Home.
- **Cart View:** `#/cart`; renders `CartItem` components, selected options, editable quantities, line totals, subtotal, and total item count. Duplicate product/options combinations increment quantity instead of creating redundant rows.
- **No backend/database:** cart and demo account state are stored in browser `localStorage` only.
- **Responsive/mobile-first:** Bootstrap breakpoints collapse the navigation and reflow product, detail, form, and cart layouts. Additional CSS media queries adjust the hero and product detail presentation for small screens.

## Bootstrap design notes

The app uses Bootstrap's mobile-first grid (`container`, `row`, `col-*`), responsive navbar (`navbar-expand-lg`), spacing utilities, display utilities, card/form/button components, and responsive alignment classes. On larger screens, content uses multi-column product and detail layouts; below Bootstrap breakpoints these columns naturally stack, the navbar converts to a toggler menu, and cart/detail controls become easier to use on narrow screens.

## Design source

No third-party design template was used. The visual system, layout, logo mark, CSS, and product SVG illustrations were created specifically for this project. Bootstrap provides the underlying component/grid framework, with custom CSS in `src/styles.css` supplying Meiko Labs branding and presentation.
