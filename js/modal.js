
const Modal = (() => {
  let activeBackdrop = null;
  let lastFocused = null;

  function getFocusable(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);
  }

  function close() {
    if (!activeBackdrop) return;
    const backdrop = activeBackdrop;
    activeBackdrop = null;
    backdrop.classList.remove("is-visible");
    document.removeEventListener("keydown", handleKeydown);
    setTimeout(() => backdrop.remove(), 220);
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function handleKeydown(e) {
    if (!activeBackdrop) return;
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "Tab") {
      const focusable = getFocusable(activeBackdrop);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function open(html, opts = {}) {
    close();
    lastFocused = document.activeElement;

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `
      <div class="modal ${opts.size === "sm" ? "modal--sm" : ""}" role="dialog" aria-modal="true" ${
      opts.labelledBy ? `aria-labelledby="${opts.labelledBy}"` : ""
    }>
        <button type="button" class="modal__close" aria-label="Close dialog">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        ${html}
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.style.overflow = "hidden";
    activeBackdrop = backdrop;

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });
    backdrop.querySelector(".modal__close").addEventListener("click", close);
    document.addEventListener("keydown", handleKeydown);

    requestAnimationFrame(() => {
      backdrop.classList.add("is-visible");
      const focusable = getFocusable(backdrop);
      (focusable[0] || backdrop.querySelector(".modal")).focus();
    });

    return backdrop;
  }

  return { open, close };
})();
