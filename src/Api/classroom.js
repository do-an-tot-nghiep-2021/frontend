import { Api } from "./api";

export const allclass = (data) => {
  const url = `/classroom`;
  return Api.post(url, data);
};
export const updateclass = (item) => {
  const url = `/classroom/${item.id}`;
  return Api.put(url, item);
};
export const showclass = (id) => {
  const url = `/classroom/${id}`;
  return Api.get(url);
};
export const removeclass = (item) => {
  const url = `/classroom/delete/${item.id}`;
  return Api.put(url, item);
};

export const createclass = (item) => {
  const url = `/classroom/create`;
  return Api.post(url, item);
};
