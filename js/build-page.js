

(function () {
  const itemsHost = document.getElementById("build-items");
  const layout = document.getElementById("build-layout");
  const emptyState = document.getElementById("build-empty");
  const itemCountEl = document.getElementById("build-item-count");
  const subtotalEl = document.getElementById("build-subtotal");
  const savingsRow = document.getElementById("build-savings-row");
  const savingsEl = document.getElementById("build-savings");
  const totalEl = document.getElementById("build-grand-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!itemsHost) return; 

  function fmt(n) {
    return `$${n.toLocaleString("en-US")}`;
  }

  function renderProductRow(item) {
    const { product, qty, lineTotal } = item;
    const el = document.createElement("div");
    el.className = "build-row fade-up";
    el.dataset.type = "product";
    el.dataset.id = product.id;
    el.innerHTML = `
      <div class="build-row__thumb">${product.image ? `<img class="build-row__img" src="${product.image}" alt="${product.name}">` : ProductIcons.getIllustration(product)}</div>
      <div class="build-row__info">
        <span class="build-row__name">${product.name}</span>
        <span class="build-row__meta">${getCategoryLabel(product.category)} &middot; ${product.sku}</span>
        <button type="button" class="build-row__remove" data-remove>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
          Remove
        </button>
      </div>
      <div class="build-row__qty">
        <div class="stepper" role="group" aria-label="Quantity for ${product.name}">
          <button type="button" data-step="-1" aria-label="Decrease quantity">&minus;</button>
          <input type="text" inputmode="numeric" value="${qty}" readonly aria-live="polite">
          <button type="button" data-step="1" aria-label="Increase quantity">+</button>
        </div>
        <span class="build-row__unit-price">${fmt(product.price)} each</span>
      </div>
      <div class="build-row__total">${fmt(lineTotal)}</div>`;

    wireRow(el, {
      onStep: (delta) => Build.updateProductQty(product.id, Build.getProductQty(product.id) + delta),
      onRemove: () => {
        Build.removeProduct(product.id);
        return () => Build.addProduct(product.id, qty);
      },
      label: product.name,
    });
    return el;
  }

  function renderBundleRow(item) {
    const { bundle, qty, lineTotal } = item;
    const items = getBundleProducts(bundle);
    const el = document.createElement("div");
    el.className = "build-row build-row--bundle fade-up";
    el.dataset.type = "bundle";
    el.dataset.id = bundle.id;
    el.innerHTML = `
      <div class="build-row__thumb"><div class="build-row__bundle-imgs">${items.slice(0, 4).map((p) => p.image ? `<img class="build-row__img build-row__img--small" src="${p.image}" alt="${p.name}" loading="lazy">` : '').join("")}</div></div>
      <div class="build-row__info">
        <span class="build-row__name">${bundle.name} <span class="badge badge-volt">Bundle</span></span>
        <span class="build-row__meta">${items.map((p) => p.name).join(", ")}</span>
        <button type="button" class="build-row__remove" data-remove>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
          Remove
        </button>
      </div>
      <div class="build-row__qty">
        <div class="stepper" role="group" aria-label="Quantity for ${bundle.name}">
          <button type="button" data-step="-1" aria-label="Decrease quantity">&minus;</button>
          <input type="text" inputmode="numeric" value="${qty}" readonly aria-live="polite">
          <button type="button" data-step="1" aria-label="Increase quantity">+</button>
        </div>
        <span class="build-row__unit-price">${fmt(bundle.bundlePrice)} each</span>
      </div>
      <div class="build-row__total">${fmt(lineTotal)}</div>`;

    wireRow(el, {
      onStep: (delta) => Build.updateBundleQty(bundle.id, Build.getBundleQty(bundle.id) + delta),
      onRemove: () => {
        Build.removeBundle(bundle.id);
        return () => Build.addBundle(bundle.id, qty);
      },
      label: bundle.name,
    });
    return el;
  }

  function wireRow(el, { onStep, onRemove, label }) {
    el.querySelectorAll("[data-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        onStep(Number(btn.dataset.step));
        render();
      });
    });

    el.querySelector("[data-remove]").addEventListener("click", () => {
      const undo = onRemove();
      render();
      const dismiss = Toast.info(`Removed ${label}`, "", { duration: 5000 });
      const titleEl = document.querySelector("#toast-region .toast:last-child .toast__title");
      if (titleEl) {
        const undoBtn = document.createElement("button");
        undoBtn.type = "button";
        undoBtn.className = "btn-link toast__undo";
        undoBtn.textContent = "Undo";
        undoBtn.addEventListener("click", () => {
          undo();
          render();
          dismiss();
        });
        titleEl.appendChild(undoBtn);
      }
    });
  }

  function render() {
    const items = Build.getItemsWithDetails();
    const count = items.reduce((s, i) => s + i.qty, 0);
    itemCountEl.textContent = count > 0 ? `(${count} item${count === 1 ? "" : "s"})` : "";

    if (items.length === 0) {
      layout.hidden = true;
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    layout.hidden = false;

    itemsHost.innerHTML = "";
    items.forEach((item, i) => {
      const row = item.type === "bundle" ? renderBundleRow(item) : renderProductRow(item);
      row.style.animationDelay = `${Math.min(i * 40, 200)}ms`;
      itemsHost.appendChild(row);
    });

    const subtotal = Build.getSubtotal();
    const savings = Build.getTotalSavings();
    subtotalEl.textContent = fmt(subtotal);
    totalEl.textContent = fmt(subtotal);

    if (savings > 0) {
      savingsRow.hidden = false;
      savingsEl.textContent = `&minus;${fmt(savings)}`;
      savingsEl.innerHTML = `&minus;${fmt(savings)}`;
    } else {
      savingsRow.hidden = true;
    }
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      checkoutBtn.disabled = true;
      checkoutBtn.textContent = "Placing order…";
      setTimeout(() => {
        Build.clear();
        render();
        Toast.success("Order placed", "This is a demo checkout — no payment was processed.");
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = "Place order";
      }, 900);
    });
  }

  render();
  window.addEventListener("build:change", render);
})();
