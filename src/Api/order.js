import { Api } from "./api";

export const sendorder = (cartItem) => {
  const url = `/order/create`;
  return Api.post(url, cartItem)
};

export const getorder = (data) => {
  const url = `/order/customer`;
  return Api.post(url, data);
};

export const getorderdate = (data) => {
  const url = `/order/date`;
  return Api.post(url, data);
};

export const cancelorder = (data) => {
  const url = `/order/cancel`;
  return Api.post(url, data);
};




export const allorder = (data) => {
  const url = `/order`;
  return Api.post(url, data);
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
