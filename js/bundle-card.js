
const BundleCard = (() => {
  const CART_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>';
  const CHECK_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function formatPrice(value) {
    return `$${value.toLocaleString("en-US")}`;
  }

  function cartControlMarkup(bundle) {
    const qty = Build.getBundleQty(bundle.id);
    if (qty <= 0) {
      return `
        <button type="button" class="btn btn-primary add-to-build-btn" data-action="add-bundle-to-build">
          ${CART_ICON} Add bundle to build
        </button>
      `;
    }
    return `
      <div class="cart-control-row">
        <div class="stepper" data-action="stepper" role="group" aria-label="Quantity for ${bundle.name}">
          <button type="button" data-step="-1" aria-label="Decrease quantity">&minus;</button>
          <input type="text" inputmode="numeric" value="${qty}" readonly aria-live="polite">
          <button type="button" data-step="1" aria-label="Increase quantity">+</button>
        </div>
        <span class="in-build-label">${CHECK_ICON} In build</span>
      </div>
    `;
  }

  function render(bundle) {
    const items = getBundleProducts(bundle);
    const listTotal = getBundleListTotal(bundle);
    const savings = getBundleSavings(bundle);
    const pct = getBundleSavingsPercent(bundle);

    return `
      <article class="bundle-card fade-up" data-bundle-id="${bundle.id}">
        <div class="bundle-card__media">
          <span class="badge badge-volt bundle-card__savings-badge">Save ${pct}%</span>
          <button type="button" class="bundle-card__image-btn" data-action="bundle-quickview" aria-label="View bundle — ${bundle.name}">
            <div class="bundle-card__image-grid">
              ${bundle.image ? `<img class="bundle-card__img bundle-card__img--single" src="${bundle.image}" alt="${bundle.name}" loading="lazy">` : items.slice(0, 4).map((p) => p.image ? `<img class="bundle-card__img" src="${p.image}" alt="${p.name}" loading="lazy">` : `<span class="bundle-card__img-fallback">${ProductIcons.getIllustration(p)}</span>`).join("")}
            </div>
          </button>
        </div>
        <div class="bundle-card__body">
          <span class="badge badge-signal">${bundle.badge}</span>
          <h3 class="bundle-card__title">
            <button type="button" data-action="bundle-quickview">${bundle.name}</button>
          </h3>
          <p class="bundle-card__tagline">${bundle.tagline}</p>
          <ul class="bundle-card__items">
            ${items.map((p) => `<li>${p.name}</li>`).join("")}
          </ul>
          <div class="bundle-card__price-row">
            <span class="bundle-card__list-price">${formatPrice(listTotal)}</span>
            <span class="bundle-card__bundle-price">${formatPrice(bundle.bundlePrice)}</span>
            <span class="bundle-card__savings-amount">Save ${formatPrice(savings)}</span>
          </div>
          <div class="bundle-card__cart-control">
            ${cartControlMarkup(bundle)}
          </div>
        </div>
      </article>
    `;
  }

  function refreshCartControl(card, bundle) {
    const host = card.querySelector(".bundle-card__cart-control");
    if (host) host.innerHTML = cartControlMarkup(bundle);
  }

  function pulseBuildIndicator() {
    const badge = document.getElementById("build-count");
    if (!badge) return;
    badge.classList.remove("is-pulsing");
    void badge.offsetWidth;
    badge.classList.add("is-pulsing");
  }

  function bindGrid(container) {
    container.addEventListener("click", (e) => {
      const card = e.target.closest(".bundle-card");
      if (!card) return;
      const bundle = getBundleById(card.dataset.bundleId);
      if (!bundle) return;

      const addBtn = e.target.closest('[data-action="add-bundle-to-build"]');
      if (addBtn) {
        Build.addBundle(bundle.id, 1);
        pulseBuildIndicator();
        addBtn.classList.add("is-success");
        addBtn.innerHTML = `${CHECK_ICON} Added`;
        addBtn.disabled = true;
        setTimeout(() => refreshCartControl(card, bundle), 650);
        return;
      }

      const stepBtn = e.target.closest("[data-step]");
      if (stepBtn) {
        const delta = Number(stepBtn.dataset.step);
        const nextQty = Build.getBundleQty(bundle.id) + delta;
        Build.updateBundleQty(bundle.id, nextQty);
        if (nextQty <= 0) {
          refreshCartControl(card, bundle);
        } else {
          card.querySelector(".stepper input").value = nextQty;
        }
        return;
      }

      const quickviewTrigger = e.target.closest('[data-action="bundle-quickview"]');
      if (quickviewTrigger && typeof BundleQuickView !== "undefined") {
        BundleQuickView.open(bundle.id);
      }
    });
  }

  return { render, bindGrid, refreshCartControl, formatPrice };
})();
