# Car Owner Tools

Free calculators for car owners (USA / worldwide): tire size, MPG, fuel cost,
car insurance, depreciation and fuel consumption — plus a blog. Static HTML/CSS/JS,
no server, no personal data collected.

## Structure

- `index.html` — homepage with tool search
- `tools/*/index.html` — the 6 calculators (working JS, SEO titles under 60 chars)
- `blog/` — blog index + 5 starter posts
- `about/`, `contact/`, `privacy-policy/`, `terms-of-service/`
- `assets/css/style.css`, `assets/js/site.js`
- `sitemap.xml`, `robots.txt`, `vercel.json`

## Test locally

```bash
cd car-tools-site && python3 -m http.server 8000
# open http://localhost:8000
```

Calculator test cases (also exposed as `window.__test` in each tool page):

- MPG: 300 mi / 10 gal = 30.0 MPG, $3.50/gal -> $0.12/mile
- Fuel cost: 250 mi, 30 MPG, $3.50/gal = $29.17 (one way); yearly (12,000 mi) = $1,400
- Insurance: Texas, age 35, 2021 car, $25,000, full coverage, clean,
  7,500-15,000 mi = $200/month ($2,404/year); DUI = $371/month
- Depreciation: $30,000, 3 years, 15% = $18,424 (lost $11,576, 39%)
- Fuel consumption: 300 mi / 10 gal = 30.0 MPG (US), 7.8 L/100km, 12.8 km/L;
  trip cost: 300 mi at 30 MPG, $3.50/gal = $35.00

## Deploy (GitHub + Vercel)

1. Create a GitHub repo (e.g. `car-tools-site`) and push this folder.
2. In Vercel: Add New Project -> Import the repo -> Deploy (no build step).
3. The site goes live on `*.vercel.app`; connect a custom domain later.
4. After launch, submit `https://www.carownertools.com/sitemap.xml` in
   Google Search Console.

## Before launch

- Replace the placeholder contact email `hello@carownertools.com` on the
  contact page with the real one.
- Pick the final domain and update the `carownertools.com` URLs in
  `index.html` (JSON-LD), `sitemap.xml` and `robots.txt`.
