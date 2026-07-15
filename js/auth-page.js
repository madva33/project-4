(function () {
  function showError(id, msg) {
    const el = document.getElementById(id);
    const txt = document.getElementById(id + "-text");
    if (txt) { txt.textContent = msg; } else { el.textContent = msg; }
    el.hidden = false;
  }

  function handleLogin(e) {
    e.preventDefault();
    const errorEl = document.getElementById("login-error");
    errorEl.hidden = true;
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const result = Auth.login(email, password);
    if (result.ok) {
      window.location.href = "index.html";
    } else {
      showError("login-error", result.error);
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    const errorEl = document.getElementById("register-error");
    errorEl.hidden = true;
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("register-confirm").value;
    if (password !== confirm) {
      showError("register-error", "Passwords do not match");
      return;
    }
    const result = Auth.register(email, password);
    if (result.ok) {
      Auth.login(email, password);
      window.location.href = "index.html";
    } else {
      showError("register-error", result.error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    if (loginForm) loginForm.addEventListener("submit", handleLogin);
    if (registerForm) registerForm.addEventListener("submit", handleRegister);
  });
})();
