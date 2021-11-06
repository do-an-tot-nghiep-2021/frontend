import { Api } from "./api";

export const sendorder = (cartItem) => {
  const url = `/order`;
  return Api.post(url, cartItem)
};