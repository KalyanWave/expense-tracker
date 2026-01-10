/**
 * Saves the PIN in localStorage (encoded, not plain text)
 * @param {string} pin
 */
export const savePin = (pin) => {
  const encoded = btoa(pin);
  localStorage.setItem("app_pin", encoded);
};

/**
 * Verifies entered PIN against stored PIN
 * @param {string} pin
 * @returns {boolean}
 */
export const verifyPin = (pin) => {
  const stored = localStorage.getItem("app_pin");
  if (!stored) return false;
  return btoa(pin) === stored;
};

/**
 * Checks if a PIN is already set
 * @returns {boolean}
 */
export const hasPin = () => {
  return localStorage.getItem("app_pin") !== null;
};
