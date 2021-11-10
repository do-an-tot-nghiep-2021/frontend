import { Api } from "./api";

export const sendorder = (cartItem) => {
  const url = `/order/create`;
  return Api.post(url, cartItem)
};

export const getorder = (id) => {
  const url = `/order/${id}`;
  return Api.get(url);
};




export const allorder = () => {
  const url = `/order`;
  return Api.get(url);
};
export const updateorder= (item) => {
  const url = `/order/${item.id}`;
  return Api.put(url, item);
};
export const showorder = (id) => {
  const url = `/order/${id}`;
  return Api.get(url);
};
export const removeorder = (id) => {
  const url = `/order/${id}`;
  return Api.delete(url);
};
export const createorder = (item) => {
  const url = `/order/create`;
  return Api.post(url, item);
};
