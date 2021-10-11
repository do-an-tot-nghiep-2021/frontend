import { Api } from "./api";

export const all = () => {
  const url = `/type`;
  return Api.get(url);
};
export const update = (item) => {
  const url = `/type/${item.id}`;
  return Api.put(url, item);
};
export const show = (id) => {
  const url = `/type/${id}`;
  return Api.get(url);
};
export const remove = (id) => {
  const url = `/type/${id}`;
  return Api.delete(url);
};
export const create = (item) => {
  const url = `/type/create`;
  return Api.post(url, item);
};
