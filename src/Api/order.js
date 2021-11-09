import { Api } from "./api";

export const sendorder = (cartItem) => {
  const url = `/order/create`;
  return Api.post(url, cartItem)
};

export const getorder = (id) => {
  const url = `/order/${id}`;
  return Api.get(url);
};
