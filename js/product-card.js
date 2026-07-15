

const ProductCard = (() => {
  const CART_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>';
  const CHECK_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function formatPrice(value) {
    return `$${value.toLocaleString("en-US")}`;
  }


  function specLine(product) {
    const entries = Object.entries(product.specs);
    const picks = [entries[0], entries[2]].filter(Boolean).map(([, value]) => value);
    return picks.join(" · ");
  }

  function cartControlMarkup(product) {
    const qty = Build.getProductQty(product.id);
    if (qty <= 0) {
      return `
        <button type="button" class="btn btn-primary btn-block add-to-build-btn" data-action="add-to-build">
          ${CART_ICON} Add to build
        </button>
      `;
    }
    return `
      <div class="cart-control-row">
        <div class="stepper" data-action="stepper" role="group" aria-label="Quantity for ${product.name}">
          <button type="button" data-step="-1" aria-label="Decrease quantity">&minus;</button>
          <input type="text" inputmode="numeric" value="${qty}" readonly aria-live="polite">
          <button type="button" data-step="1" aria-label="Increase quantity">+</button>
        </div>
        <span class="in-build-label">${CHECK_ICON} In build</span>
      </div>
    `;
  }

  function render(product) {
    return `
      <article class="product-card fade-up" data-product-id="${product.id}">
        <div class="product-card__media">
          <span class="stat-stamp">${product.statLabel}</span>
          <button type="button" class="product-card__image-btn" data-action="quickview" aria-label="Quick view — ${product.name}">
            ${product.image ? `<img class="product-card__img" src="${product.image}" alt="${product.name}" loading="lazy">` : `<span class="product-card__illustration">${ProductIcons.getIllustration(product)}</span>`}
          </button>
        </div>
        <div class="product-card__body">
          <div class="product-card__meta-row">
            <span class="badge">${getCategoryLabel(product.category)}</span>
            <span class="product-card__price">${formatPrice(product.price)}</span>
          </div>
          <h3 class="product-card__title">
            <button type="button" data-action="quickview">${product.name}</button>
          </h3>
          <p class="product-card__spec">${specLine(product)}</p>
          <div class="product-card__cart-control">
            ${cartControlMarkup(product)}
          </div>
        </div>
      </article>
    `;
  }

  function refreshCartControl(card, product) {
    const host = card.querySelector(".product-card__cart-control");
    if (host) host.innerHTML = cartControlMarkup(product);
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
      const card = e.target.closest(".product-card");
      if (!card) return;
      const product = getProductById(card.dataset.productId);
      if (!product) return;

      const addBtn = e.target.closest('[data-action="add-to-build"]');
      if (addBtn) {
        Build.addProduct(product.id, 1);
        pulseBuildIndicator();
        addBtn.classList.add("is-success");
        addBtn.innerHTML = `${CHECK_ICON} Added`;
        addBtn.disabled = true;
        setTimeout(() => refreshCartControl(card, product), 650);
        return;
      }

      const stepBtn = e.target.closest("[data-step]");
      if (stepBtn) {
        const delta = Number(stepBtn.dataset.step);
        const nextQty = Build.getProductQty(product.id) + delta;
        Build.updateProductQty(product.id, nextQty);
        if (nextQty <= 0) {
          refreshCartControl(card, product);
        } else {
          card.querySelector(".stepper input").value = nextQty;
        }
        return;
      }

      const quickviewTrigger = e.target.closest('[data-action="quickview"]');
      if (quickviewTrigger && typeof QuickView !== "undefined") {
        QuickView.open(product.id);
      }
    });
  }

  return { render, bindGrid, refreshCartControl, formatPrice, specLine };
})();
