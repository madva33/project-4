
const Toast = (() => {
  const ICONS = {
    success:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    info:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  };

  let region = null;

  function getRegion() {
    if (region) return region;
    region = document.getElementById("toast-region");
    if (!region) {
      region = document.createElement("div");
      region.id = "toast-region";
      region.className = "toast-region";
      region.setAttribute("aria-live", "polite");
      region.setAttribute("aria-atomic", "true");
      document.body.appendChild(region);
    }
    return region;
  }

  function show({ title, message = "", type = "info", duration = 4200 }) {
    const host = getRegion();
    const el = document.createElement("div");
    el.className = `toast toast-${type}`;
    el.setAttribute("role", type === "error" ? "alert" : "status");
    el.innerHTML = `
      <span class="toast__icon">${ICONS[type] || ICONS.info}</span>
      <span class="toast__body">
        <span class="toast__title"></span>
        ${message ? '<span class="toast__message"></span>' : ""}
      </span>
      <button type="button" class="toast__close" aria-label="Dismiss notification">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    el.querySelector(".toast__title").textContent = title;
    if (message) el.querySelector(".toast__message").textContent = message;

    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-visible"));

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      el.classList.remove("is-visible");
      el.addEventListener("transitionend", () => el.remove(), { once: true });
      setTimeout(() => el.remove(), 500);
    };

    el.querySelector(".toast__close").addEventListener("click", dismiss);
    if (duration > 0) setTimeout(dismiss, duration);

    return dismiss;
  }

  return {
    show,
    success: (title, message, opts = {}) => show({ title, message, type: "success", ...opts }),
    error: (title, message, opts = {}) => show({ title, message, type: "error", ...opts }),
    info: (title, message, opts = {}) => show({ title, message, type: "info", ...opts }),
  };
})();
