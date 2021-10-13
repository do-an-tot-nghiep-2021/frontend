import { Api } from "./api";

export const alltype = () => {
  const url = `/type`;
  return Api.get(url);
};
export const updatetype = (item) => {
  const url = `/type/${item.id}`;
  return Api.put(url, item);
};
export const showtype = (id) => {
  const url = `/type/${id}`;
  return Api.get(url);
};
export const removetype = (id) => {
  const url = `/type/${id}`;
  return Api.delete(url);
};
export const createtype = (item) => {
  const url = `/type/create`;
  return Api.post(url, item);
};
