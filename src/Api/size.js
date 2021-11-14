import { Api } from "./api";

export const allsize = () => {
  const url = `/size`;
  return Api.get(url);
};
export const updatesize = (item) => {
  const url = `/size/${item.id}`;
  return Api.put(url, item);
};
export const showsize = (id) => {
  const url = `/size/${id}`;
  return Api.get(url);
};
export const removesize = (item) => {
  const url = `/size/delete/${item.id}`;
  return Api.put(url, item);
};
export const createsize = (item) => {
  const url = `/size/create`;
  return Api.post(url, item);
};