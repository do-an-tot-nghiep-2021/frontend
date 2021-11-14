import { Api } from "./api";

export const login = (user) => {
  const url = `/login`;
  return Api.post(url, user)
};
export const logout = (token) => {
  const url = `/logout`;
  return Api.post(url, token)
};
export const registeraccount = (user) => {
  const url = `/register`;
  return Api.post(url, user)
};
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(data));
    next();
    return fetch;
  }
};

export const getUser = (token) => {
  const url = `/users/${token}`;
  return Api.get(url)
}

export const isAuthenticated = () => {
  let data = localStorage.getItem("user");
  if (typeof window == "undefined") {
    return false;
  }
  if (data) {
    return JSON.parse(data).data;
  } else {
    return false;
  }
};

