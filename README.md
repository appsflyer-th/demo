# Demo Hub

Static demo website with 2 flows:
- **Finance** (FruitBank)
- **E-commerce** (FreshGrove)

## Project Structure

```
/
├── index.html
├── .nojekyll
├── assets/
│   ├── css/
│   │   ├── finance-shared.css
│   │   ├── finance-home.css
│   │   └── finance-account-detail.css
│   ├── js/
│   │   ├── gtm-bootstrap.js
│   │   ├── finance-data.js
│   │   ├── finance-home.js
│   │   └── finance-account-detail.js
│   └── image/
├── finance/
│   ├── index.html
│   ├── account-apple/
│   │   └── index.html
│   ├── account-banana/
│   │   └── index.html
│   └── account-peach/
│       └── index.html
└── ecommerce/
    ├── index.html
    ├── product/
    │   └── index.html
    └── cart/
        └── index.html
```

## Finance Notes

### 1) Home (`finance/index.html`)
- Top promo slider (3 slides)
- Account cards: Apple / Banana / Peach
- `Apply Now` behavior:
  - **Desktop**: opens QR popup per product
  - **Mobile**: opens OneLink directly
- `Read More` goes to account detail pages
- Download section includes QR + trust stats

### 2) Account Detail (`finance/account-*/`)
- Product-specific hero, features, and stats
- CTA behavior:
  - **Desktop**: shows product QR in CTA section
  - **Mobile**: shows `Apply via App` button
- Footer is global and shared across all finance pages

### 3) Shared Config
`assets/js/finance-data.js` contains:
- `window.FruitBankAccounts` (content per account)
- `window.FruitBankAppConfig`:
  - `downloadLink`
  - `accountLinks` (apple/banana/peach)
  - `accountQr` (apple/banana/peach)
  - `defaultQr`

## Footer (Finance)
- Global footer style in `assets/css/finance-shared.css`
- Single markup pattern used in all `finance/**/index.html`
- Current copy: `© 2026 FruitBank Demo`

## Deployment (GitHub Pages)
1. Push repository with current folder structure
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch**
4. Choose `main` and `/ (root)`

## Current Scope
- This project is static HTML/CSS/JS
- AppsFlyer runtime code was removed
- OneLink usage is static links configured in code

## GTM Setup
- GTM loader is centralized in `assets/js/gtm-bootstrap.js`
- All pages include the same external GTM bootstrap script + `noscript` iframe fallback
- Active container ID: `GTM-54P6PTRS`
