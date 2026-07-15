(function () {
  const featuredHost = document.getElementById("featured-bundles");
  const categoryHost = document.getElementById("category-tiles");

  if (!featuredHost && !categoryHost) return; 

  if (featuredHost) {
    const featured = BUNDLES.slice(0, 3);
    featuredHost.innerHTML = featured.map((b) => BundleCard.render(b)).join("");
    BundleCard.bindGrid(featuredHost);
  }

  if (categoryHost) {
    const tileIllustrations = {
      monitors: "monitor",
      laptops: "laptop",
      pcs: "pc-tower",
      accessories: "headset",
    };
    const categoryImages = {
      monitors: "images/Gemini_Generated_Image_zbt1yezbt1yezbt1.png",
      laptops: "images/Gemini_Generated_Image_pw1pf3pw1pf3pw1p.png",
      pcs: "images/1fd9d903bc34dc4b67fd91df11003274.jpg",
      accessories: "images/Gemini_Generated_Image_rz2ycbrz2ycbrz2y.png",
    };
    categoryHost.innerHTML = CATEGORIES.map((cat) => {
      const count = PRODUCTS.filter((p) => p.category === cat.id).length;
      const img = categoryImages[cat.id];
      return `
        <a class="category-tile" href="shop.html?category=${cat.id}">
          <span class="category-tile__illustration">${img ? `<img class="category-tile__img" src="${img}" alt="${cat.label}" loading="lazy">` : ''}</span>
          <span class="category-tile__label">${cat.label}</span>
          <span class="category-tile__count">${count} products</span>
        </a>
      `;
    }).join("");
  }
})();
