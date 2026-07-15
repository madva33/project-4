# LOADOUT

A gaming-gear storefront concept: monitors, laptops, desktop PCs and
accessories, plus ready-made setup bundles priced at a genuine discount
against buying the same pieces separately. Plain HTML, CSS and
JavaScript — no framework, no build step.

## Stack

Vanilla HTML/CSS/JS. "Your build" (the cart-equivalent) persists in
`localStorage`, so the whole thing runs from static files with no backend.

## Running it

```bash
cd loadout
python3 -m http.server 8080
# then open http://localhost:8080/index.html
```

Any other static server works the same way (`npx serve`, VS Code's Live
Server, etc).

## Project structure

```
loadout/
├── index.html            Home — hero, category tiles, featured bundles
├── shop.html              Full catalog — category/bundle filter, search, sort
├── build.html              "Your build" — cart-equivalent, running total
├── favicon.svg
├── css/
│   ├── variables.css      Design tokens — colors, type, spacing, shadows
│   ├── base.css           Reset + global element defaults
│   ├── layout.css         Header, footer — shared page chrome
│   ├── components.css     Buttons, badges, toast, modal, stepper
│   ├── home.css            Hero, category tiles, how-it-works, CTA band
│   ├── shop.css             Filter bar, product/bundle cards, quick views
│   └── build.css             Build page line items + order summary
└── js/
    ├── data.js             Product + bundle catalog (stand-in for an API)
    ├── icons.js            Programmatic SVG illustrations + stat stamps
    ├── storage.js          localStorage JSON helper
    ├── toast.js            Toast notification queue
    ├── modal.js             Accessible dialog shell (focus trap, Esc to close)
    ├── build.js              "Your build" state — products AND bundles
    ├── product-card.js       Product card markup + interactions
    ├── bundle-card.js         Bundle card markup + interactions
    ├── quickview.js            Product quick-view modal
    ├── bundle-quickview.js      Bundle quick-view modal (full breakdown)
    ├── header.js                 Build indicator, mobile nav — every page
    ├── home.js                    Home page: featured bundles, category tiles
    ├── shop.js                     Shop page: filter, search, sort
    └── build-page.js                Build page: rows, totals, checkout
```

## Notable decisions

**Two card types, not one.** Bundles carry more information than a
single product (what's included, list price vs. bundle price, percent
saved), so they get their own wider card and their own grid rather than
being squeezed into the same dense layout as an individual product.

**The stat stamp.** Every product illustration is stamped with its one
defining performance number — refresh rate for a monitor, DPI for a
mouse, wattage for a PC. It's the site's one recurring visual device,
grounded in the fact that PC gaming culture actually cares about these
exact numbers.

**Bundle savings are computed, never hardcoded.** `getBundleSavings()`
in `data.js` sums the component products' live prices and compares
that to the bundle's flat price — change a component's price and every
savings figure across the site updates with it. There's no separate
"original price" field to accidentally let drift out of sync.

**A bundle is one line in the build, not exploded into its parts.**
Adding a bundle adds a single line item at the bundle price with its
components listed as sub-text, so the discount stays visible as one
legible line instead of scattering across several rows.

**No login required.** The build persists per-browser via
`localStorage`, the same way the cart works before checkout on most
real storefronts — nobody should have to make an account to price out
a setup.

## Accessibility

- Every interactive control is reachable by keyboard; both quick-view
  modals trap focus and return it to the trigger element on close.
- Text color pairs are checked against WCAG AA (4.5:1) — see the
  comments in `variables.css` if adjusting the palette.
- `prefers-reduced-motion` disables transitions and the skeleton
  shimmer for anyone who's asked their OS for reduced motion.
