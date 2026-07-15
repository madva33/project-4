

(function () {
  const productGrid = document.getElementById("product-grid");
  const bundleGrid = document.getElementById("bundle-grid");
  const skeletonGrid = document.getElementById("skeleton-grid");
  const emptyState = document.getElementById("empty-state");
  const resultsCount = document.getElementById("results-count");
  const chipGroup = document.getElementById("category-chips");
  const sortSelect = document.getElementById("sort-select");
  const searchForm = document.getElementById("site-search-form");
  const searchInput = document.getElementById("site-search-input");
  const clearFiltersBtn = document.getElementById("clear-filters-btn");

  if (!productGrid) return; 

  const params = new URLSearchParams(window.location.search);

  const state = {
    search: params.get("q") || "",
    category: params.get("category") || "all",
    sort: "featured",
  };

  const FILTERS = [{ id: "all", label: "All" }, ...CATEGORIES];

  function buildChips() {
    chipGroup.innerHTML = FILTERS.map(
      (f) => `<button type="button" class="chip" data-category="${f.id}">${f.label}</button>`
    ).join("");
    syncChipState();
  }

  function syncChipState() {
    chipGroup.querySelectorAll(".chip").forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.category === state.category);
    });
  }

  function matchesSearch(name) {
    if (!state.search.trim()) return true;
    return name.toLowerCase().includes(state.search.trim().toLowerCase());
  }

  function getFilteredSortedProducts() {
    let list = PRODUCTS.filter(
      (p) => (state.category === "all" || p.category === state.category) && matchesSearch(p.name)
    );
    switch (state.sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "name-asc": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return list;
  }

  function getFilteredSortedBundles() {
    if (state.category !== "all" && state.category !== "pcs") return [];
    let list = BUNDLES.filter((b) => matchesSearch(b.name));
    switch (state.sort) {
      case "price-asc": list = [...list].sort((a, b) => a.bundlePrice - b.bundlePrice); break;
      case "price-desc": list = [...list].sort((a, b) => b.bundlePrice - a.bundlePrice); break;
      case "name-asc": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return list;
  }

  function renderGrid() {
    const showBundles = state.category === "all" || state.category === "pcs";

    bundleGrid.hidden = true;

    const list = getFilteredSortedProducts();
    const bundleList = showBundles ? getFilteredSortedBundles() : [];
    const total = list.length + bundleList.length;

    resultsCount.textContent = `Showing ${total} items`;

    if (total === 0) {
      productGrid.hidden = true;
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    productGrid.hidden = false;

    const productCards = list
      .map((p, i) => ProductCard.render(p).replace('class="product-card fade-up"', `class="product-card fade-up" style="animation-delay:${Math.min(i * 30, 240)}ms"`))
      .join("");
    const bundleCards = bundleList
      .map((b, i) => BundleCard.render(b).replace('class="bundle-card fade-up"', `class="bundle-card fade-up" style="animation-delay:${Math.min((list.length + i) * 30, 240)}ms"`))
      .join("");

    productGrid.innerHTML = productCards + bundleCards;
  }

  function showSkeleton(show) {
    if (skeletonGrid) skeletonGrid.hidden = !show;
    productGrid.hidden = show;
    bundleGrid.hidden = true;
  }

  function buildSkeletonCards() {
    if (!skeletonGrid) return;
    skeletonGrid.innerHTML = Array.from({ length: 8 })
      .map(
        () => `
        <div class="product-card" aria-hidden="true">
          <div class="skeleton" style="aspect-ratio:4/3;border-radius:0;"></div>
          <div class="product-card__body">
            <div class="skeleton" style="height:14px;width:60%;"></div>
            <div class="skeleton" style="height:18px;width:85%;margin-top:10px;"></div>
            <div class="skeleton" style="height:12px;width:45%;margin-top:8px;"></div>
            <div class="skeleton" style="height:38px;width:100%;margin-top:16px;border-radius:6px;"></div>
          </div>
        </div>`
      )
      .join("");
  }

  chipGroup.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    state.category = chip.dataset.category;
    syncChipState();
    renderGrid();
  });

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    renderGrid();
  });

  let debounceTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.search = searchInput.value;
      renderGrid();
    }, 200);
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearTimeout(debounceTimer);
    state.search = searchInput.value;
    renderGrid();
    searchInput.blur();
  });

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      state.search = "";
      state.category = "all";
      searchInput.value = "";
      syncChipState();
      renderGrid();
    });
  }

  ProductCard.bindGrid(productGrid);
  BundleCard.bindGrid(productGrid);

  if (state.search) searchInput.value = state.search;

  buildChips();
  buildSkeletonCards();
  showSkeleton(true);
  emptyState.hidden = true;

  setTimeout(() => {
    showSkeleton(false);
    renderGrid();
  }, 450);
})();
