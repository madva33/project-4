(function () {
  function formatMoney(value) {
    return `$${value.toLocaleString("en-US")}`;
  }

  function updateBuildIndicator() {
    const countEl = document.getElementById("build-count");
    const totalEl = document.getElementById("build-total");
    if (!countEl || !totalEl) return;
    const count = Build.getCount();
    const subtotal = Build.getSubtotal();
    countEl.textContent = count;
    countEl.dataset.count = String(count);
    totalEl.textContent = count > 0 ? formatMoney(subtotal) : "$0";
  }

  function wireMobileNav() {
    const toggle = document.querySelector(".menu-toggle");
    const header = document.querySelector(".site-header");
    if (!toggle || !header) return;
    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function updateAuthUI() {
    const guestEl = document.getElementById("auth-buttons");
    const userEl = document.getElementById("auth-user");
    const greetingEl = document.getElementById("auth-greeting");
    if (!guestEl || !userEl || !greetingEl) return;
    if (Auth.isLoggedIn()) {
      guestEl.hidden = true;
      userEl.hidden = false;
      greetingEl.textContent = Auth.currentUser();
    } else {
      guestEl.hidden = false;
      userEl.hidden = true;
    }
  }

  function wireAuth() {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) logoutBtn.addEventListener("click", () => {
      Auth.logout();
      updateAuthUI();
      Toast.success("Logged out.");
    });
    updateAuthUI();
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateBuildIndicator();
    wireMobileNav();
    wireAuth();
  });

  window.addEventListener("build:change", updateBuildIndicator);
})();
