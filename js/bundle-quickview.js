

const BundleQuickView = (() => {
  function open(bundleId) {
    const bundle = getBundleById(bundleId);
    if (!bundle) return;

    const items = getBundleProducts(bundle);
    const listTotal = getBundleListTotal(bundle);
    const savings = getBundleSavings(bundle);
    const pct = getBundleSavingsPercent(bundle);
    const headingId = "bundle-quickview-title";

    const html = `
      <div class="bundle-quickview">
        <div class="bundle-quickview__header">
          <span class="badge badge-signal">${bundle.badge}</span>
          <h2 id="${headingId}">${bundle.name}</h2>
          <p class="bundle-quickview__tagline">${bundle.tagline}</p>
        </div>
        <ul class="bundle-quickview__list">
          ${items
            .map(
              (p) => `
            <li>
              <span class="bundle-quickview__item-illustration">${p.image ? `<img class="bundle-quickview__item-img" src="${p.image}" alt="${p.name}" loading="lazy">` : ProductIcons.getIllustration(p)}</span>
              <span class="bundle-quickview__item-info">
                <span class="bundle-quickview__item-name">${p.name}</span>
                <span class="bundle-quickview__item-category">${getCategoryLabel(p.category)}</span>
              </span>
              <span class="bundle-quickview__item-price">${ProductCard.formatPrice(p.price)}</span>
            </li>`
            )
            .join("")}
        </ul>
        <div class="bundle-quickview__totals">
          <div class="bundle-quickview__totals-row">
            <span>Bought separately</span>
            <span class="is-struck">${ProductCard.formatPrice(listTotal)}</span>
          </div>
          <div class="bundle-quickview__totals-row is-savings">
            <span>Bundle savings (${pct}%)</span>
            <span>&minus;${ProductCard.formatPrice(savings)}</span>
          </div>
          <div class="bundle-quickview__totals-row is-total">
            <span>Bundle price</span>
            <span>${ProductCard.formatPrice(bundle.bundlePrice)}</span>
          </div>
        </div>
        <div class="bundle-quickview__actions" data-bqv-cart></div>
      </div>
    `;

    const backdrop = Modal.open(html, { labelledBy: headingId });
    const cartHost = backdrop.querySelector("[data-bqv-cart]");

    function renderCart() {
      const qty = Build.getBundleQty(bundle.id);
      if (qty <= 0) {
        cartHost.innerHTML = `<button type="button" class="btn btn-primary btn-block" data-bqv-add>Add bundle to build</button>`;
        cartHost.querySelector("[data-bqv-add]").addEventListener("click", (e) => {
          Build.addBundle(bundle.id, 1);
          pulse();
          e.currentTarget.textContent = "Added ✓";
          e.currentTarget.classList.add("is-success");
          setTimeout(renderCart, 650);
        });
      } else {
        cartHost.innerHTML = `
          <div class="cart-control-row">
            <div class="stepper" role="group" aria-label="Quantity">
              <button type="button" data-bqv-step="-1" aria-label="Decrease quantity">&minus;</button>
              <input type="text" inputmode="numeric" value="${qty}" readonly aria-live="polite">
              <button type="button" data-bqv-step="1" aria-label="Increase quantity">+</button>
            </div>
            <span class="in-build-label">In build</span>
          </div>`;
        cartHost.querySelectorAll("[data-bqv-step]").forEach((btn) => {
          btn.addEventListener("click", () => {
            Build.updateBundleQty(bundle.id, Build.getBundleQty(bundle.id) + Number(btn.dataset.bqvStep));
            renderCart();
          });
        });
      }
    }

    function pulse() {
      const badge = document.getElementById("build-count");
      if (!badge) return;
      badge.classList.remove("is-pulsing");
      void badge.offsetWidth;
      badge.classList.add("is-pulsing");
    }

    renderCart();
  }

  return { open };
})();
