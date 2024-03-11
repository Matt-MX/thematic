export function isLoggedIn() {
  return getCachedToken() != undefined;
}

export function getCachedToken() {
  return typeof localStorage !== "undefined" ? localStorage.getItem('token') : undefined;
}

export function getCachedAccountId() {
  return typeof localStorage !== "undefined" ? localStorage.getItem('account_id') : undefined;
}