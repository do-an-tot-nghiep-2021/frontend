import { Api } from "./api";

export const all = () => {
  const url = `/building`;
  return Api.get(url);
};
export const update = (item) => {
  const url = `/building/${item.id}`;
  return Api.put(url, item);
};
export const show = (id) => {
  const url = `/building/${id}`;
  return Api.get(url);
};
export const remove = (id) => {
  const url = `/building/${id}`;
  return Api.delete(url);
};
export const create = (item) => {
  const url = `/building/create`;
  return Api.post(url, item);
};
