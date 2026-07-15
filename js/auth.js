const Auth = (() => {
  const STORAGE_KEY = "loadout_users";
  const SESSION_KEY = "loadout_session";

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function getSession() {
    return localStorage.getItem(SESSION_KEY);
  }

  function setSession(email) {
    localStorage.setItem(SESSION_KEY, email);
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function register(email, password) {
    const users = getUsers();
    if (users.some(u => u.email === email)) return { ok: false, error: "Email already registered" };
    users.push({ email, password });
    saveUsers(users);
    return { ok: true };
  }

  function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, error: "Invalid email or password" };
    setSession(email);
    return { ok: true };
  }

  function logout() {
    clearSession();
  }

  function isLoggedIn() {
    return !!getSession();
  }

  function currentUser() {
    return getSession();
  }

  return { register, login, logout, isLoggedIn, currentUser };
})();
