import { Api } from "./api";

export const all = () => {
  const url = `/classroom`;
  return Api.get(url);
};
export const update = (item) => {
  const url = `/classroom/${item.id}`;
  return Api.put(url, item);
};
export const show = (id) => {
  const url = `/classroom/${id}`;
  return Api.get(url);
};
export const remove = (id) => {
  const url = `/classroom/${id}`;
  return Api.delete(url);
};

export const create = (item) => {
  const url = `/classroom/create`;
  return Api.post(url, item);
};
