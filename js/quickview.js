

const QuickView = (() => {
  function specRows(product) {
    const rows = Object.entries(product.specs).map(
      ([label, value]) => `<div class="spec-row"><dt>${label}</dt><dd>${value}</dd></div>`
    );
    rows.push(`<div class="spec-row"><dt>SKU</dt><dd>${product.sku}</dd></div>`);
    return rows.join("");
  }

  function open(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const headingId = "quickview-title";
    const html = `
      <div class="quickview">
        <div class="quickview__media">
          <span class="stat-stamp quickview__stamp">${product.statLabel}</span>
          <span class="badge badge-signal quickview__category">${getCategoryLabel(product.category)}</span>
          ${product.image ? `<img class="quickview__img" src="${product.image}" alt="${product.name}">` : ProductIcons.getIllustration(product)}
        </div>
        <div class="quickview__body">
          <h2 id="${headingId}" class="quickview__title">${product.name}</h2>
          <p class="quickview__price">${ProductCard.formatPrice(product.price)}</p>
          <p class="quickview__description">${product.description}</p>
          <dl class="spec-sheet">${specRows(product)}</dl>
          <div class="quickview__actions" data-quickview-cart></div>
        </div>
      </div>
    `;

    const backdrop = Modal.open(html, { labelledBy: headingId });
    const cartHost = backdrop.querySelector("[data-quickview-cart]");

    function renderCart() {
      const qty = Build.getProductQty(product.id);
      if (qty <= 0) {
        cartHost.innerHTML = `<button type="button" class="btn btn-primary btn-block" data-qv-add>Add to build</button>`;
        cartHost.querySelector("[data-qv-add]").addEventListener("click", (e) => {
          Build.addProduct(product.id, 1);
          pulse();
          e.currentTarget.textContent = "Added ✓";
          e.currentTarget.classList.add("is-success");
          setTimeout(renderCart, 650);
        });
      } else {
        cartHost.innerHTML = `
          <div class="cart-control-row">
            <div class="stepper" role="group" aria-label="Quantity">
              <button type="button" data-qv-step="-1" aria-label="Decrease quantity">&minus;</button>
              <input type="text" inputmode="numeric" value="${qty}" readonly aria-live="polite">
              <button type="button" data-qv-step="1" aria-label="Increase quantity">+</button>
            </div>
            <span class="in-build-label">In build</span>
          </div>`;
        cartHost.querySelectorAll("[data-qv-step]").forEach((btn) => {
          btn.addEventListener("click", () => {
            Build.updateProductQty(product.id, Build.getProductQty(product.id) + Number(btn.dataset.qvStep));
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
