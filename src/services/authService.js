import JwtDecode from "jwt-decode";
import http from "../services/httpService";

const tokenKey = "token";

export const saveToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

export const removeToken = () => {
  localStorage.removeItem(tokenKey);
};

export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

export const getCurrentUser = () => {
  const token = localStorage.getItem(tokenKey);
  if (!token) return null;
  const { user } = JwtDecode(token);
  return user;
};

http.setToken(getToken());

export default { saveToken, removeToken, getToken, getCurrentUser };
