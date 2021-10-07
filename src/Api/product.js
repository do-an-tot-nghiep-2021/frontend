import { Api } from "./api";

export const all = () => {
  const url = `/product`;
  return Api.get(url);
};
export const update = (item) => {
  const url = `/product/${item.id}`;
  return Api.put(url, item);
};
export const show = (id) => {
  const url = `/product/${id}`;
  return Api.get(url);
};
export const remove = (id) => {
  const url = `/product/${id}`;
  return Api.delete(url);
};
export const create = (item) => {
  const url = `/product/create`;
  return Api.post(url, item);
};
