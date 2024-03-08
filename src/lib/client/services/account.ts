export function isLoggedIn() {
  return getCachedToken() != undefined;
}

export function getCachedToken() {
  return typeof localStorage !== "undefined" ? localStorage.getItem('token') : undefined;
}