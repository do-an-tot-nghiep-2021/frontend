import { Api } from "./api";

export const allproduct = () => {
  const url = `/product`;
  return Api.get(url);
};
export const updateproduct = (item) => {
  const url = `/product/${item.id}`;
  return Api.put(url, item);
};
export const showproduct = (id) => {
  const url = `/product/${id}`;
  return Api.get(url);
};
export const removeproduct = (id) => {
  const url = `/product/${id}`;
  return Api.delete(url);
};
export const createproduct = (item) => {
  const url = `/product/create`;
  return Api.post(url, item);
};
export const producttopping = (id) => {
  const url = `/product/toping/{id}`;
  return Api.post(url);
};
