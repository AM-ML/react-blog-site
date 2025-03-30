import Cookies from "js-cookie";

// Store user data in cookies instead of sessionStorage
export const storeInSession = (key, value) => {
  Cookies.set(key, value, { expires: 4, secure: true, sameSite: "strict" }); // expires in 7 days
};

// Retrieve user data from cookies instead of sessionStorage
export const lookInSession = (key) => {
  return Cookies.get(key);
};

// Clear the cookie if needed
export const clearSession = (key) => {
  Cookies.remove(key);
};

export const removeFromSession = (key) => {
  Cookies.remove(key);
};
export const logOutUser = () => {
  return sessionStorage.clear();
};
