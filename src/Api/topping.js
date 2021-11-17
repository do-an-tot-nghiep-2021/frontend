import { Api } from "./api";

export const alltopping = () => {
  const url = `/topping`;
  return Api.get(url);
};
export const updatetopping = (item) => {
  const url = `/topping/${item.id}`;
  return Api.put(url, item);
};
export const showtopping = (id) => {
  const url = `/topping/${id}`;
  return Api.get(url);
};
export const removetopping = (item) => {
  const url = `/topping/delete/${item.id}`;
  return Api.put(url, item);
};
export const createtopping = (item) => {
  const url = `/topping/create`;
  return Api.post(url, item);
};
