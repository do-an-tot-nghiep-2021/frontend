import { Api } from "./api";

export const loginadmin = (user) => {
  const url = `/admin/login`;
  return Api.post(url, user)
};
export const logoutadmin = (token) => {
  const url = `/admin/logout`;
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


export const getUserLogin = (token) => {
  const url = `/admin/${token}`;
  return Api.get(url).then(function (response) {
    const dataUser = response.data
    localStorage.setItem('demo', JSON.parse(dataUser))
  })
  .catch(function (error) {
    console.log(error);
  });;
}




// lấy dữ liệu từ local về


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

