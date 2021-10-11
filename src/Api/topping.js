import { Api } from "./api";

export const all = () => {
  const url = `/topping`;
  return Api.get(url);
};
export const update = (item) => {
  const url = `/topping/${item.id}`;
  return Api.put(url, item);
};
export const show = (id) => {
  const url = `/topping/${id}`;
  return Api.get(url);
};
export const remove = (id) => {
  const url = `/topping/${id}`;
  return Api.delete(url);
};
export const create = (item) => {
  const url = `/topping/create`;
  return Api.post(url, item);
};
