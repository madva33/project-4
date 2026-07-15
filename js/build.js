const Build = (() => {
  const BUILD_KEY = "lo_build";

  function getItems() {
    return Storage.get(BUILD_KEY, []);
  }

  function saveItems(items) {
    Storage.set(BUILD_KEY, items);
    window.dispatchEvent(new CustomEvent("build:change"));
  }

  function getItemsWithDetails() {
    return getItems()
      .map((item) => {
        if (item.type === "bundle") {
          const bundle = getBundleById(item.bundleId);
          if (!bundle) return null;
          return {
            type: "bundle",
            id: bundle.id,
            bundle,
            qty: item.qty,
            unitPrice: bundle.bundlePrice,
            lineTotal: bundle.bundlePrice * item.qty,
            lineSavings: getBundleSavings(bundle) * item.qty,
          };
        }
        const product = getProductById(item.productId);
        if (!product) return null;
        return {
          type: "product",
          id: product.id,
          product,
          qty: item.qty,
          unitPrice: product.price,
          lineTotal: product.price * item.qty,
          lineSavings: 0,
        };
      })
      .filter(Boolean);
  }

  function findRaw(type, id) {
    const key = type === "bundle" ? "bundleId" : "productId";
    return getItems().find((i) => i.type === type && i[key] === id);
  }

  function getProductQty(productId) {
    const item = findRaw("product", productId);
    return item ? item.qty : 0;
  }

  function getBundleQty(bundleId) {
    const item = findRaw("bundle", bundleId);
    return item ? item.qty : 0;
  }

  function addProduct(productId, qty = 1) {
    if (!Auth.isLoggedIn()) {
      Toast.info("Log in to add items to your build.");
      return;
    }
    const items = getItems();
    const existing = items.find((i) => i.type === "product" && i.productId === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ type: "product", productId, qty });
    }
    saveItems(items);
  }

  function addBundle(bundleId, qty = 1) {
    if (!Auth.isLoggedIn()) {
      Toast.info("Log in to add items to your build.");
      return;
    }
    const items = getItems();
    const existing = items.find((i) => i.type === "bundle" && i.bundleId === bundleId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ type: "bundle", bundleId, qty });
    }
    saveItems(items);
  }

  function updateProductQty(productId, qty) {
    let items = getItems();
    if (qty <= 0) {
      items = items.filter((i) => !(i.type === "product" && i.productId === productId));
    } else {
      const existing = items.find((i) => i.type === "product" && i.productId === productId);
      if (existing) existing.qty = qty;
    }
    saveItems(items);
  }

  function updateBundleQty(bundleId, qty) {
    let items = getItems();
    if (qty <= 0) {
      items = items.filter((i) => !(i.type === "bundle" && i.bundleId === bundleId));
    } else {
      const existing = items.find((i) => i.type === "bundle" && i.bundleId === bundleId);
      if (existing) existing.qty = qty;
    }
    saveItems(items);
  }

  function removeProduct(productId) {
    saveItems(getItems().filter((i) => !(i.type === "product" && i.productId === productId)));
  }

  function removeBundle(bundleId) {
    saveItems(getItems().filter((i) => !(i.type === "bundle" && i.bundleId === bundleId)));
  }

  function clear() {
    saveItems([]);
  }

  function getCount() {
    return getItems().reduce((sum, i) => sum + i.qty, 0);
  }

  function getSubtotal() {
    return getItemsWithDetails().reduce((sum, i) => sum + i.lineTotal, 0);
  }

  function getTotalSavings() {
    return getItemsWithDetails().reduce((sum, i) => sum + i.lineSavings, 0);
  }

  return {
    getItems,
    getItemsWithDetails,
    getProductQty,
    getBundleQty,
    addProduct,
    addBundle,
    updateProductQty,
    updateBundleQty,
    removeProduct,
    removeBundle,
    clear,
    getCount,
    getSubtotal,
    getTotalSavings,
  };
})();
