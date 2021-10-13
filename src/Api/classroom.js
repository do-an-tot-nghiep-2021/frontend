import { Api } from "./api";

export const allclass = () => {
  const url = `/classroom`;
  return Api.get(url);
};
export const updateclass = (item) => {
  const url = `/classroom/${item.id}`;
  return Api.put(url, item);
};
export const showclass = (id) => {
  const url = `/classroom/${id}`;
  return Api.get(url);
};
export const removeclass = (id) => {
  const url = `/classroom/${id}`;
  return Api.delete(url);
};

export const createclass = (item) => {
  const url = `/classroom/create`;
  return Api.post(url, item);
};
