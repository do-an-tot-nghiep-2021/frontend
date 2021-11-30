import { Api } from "./api";

export const allbuilding = () => {
  const url = `/building`;
  return Api.get(url);
};
export const updatebuilding = (item) => {
  const url = `/building/${item.id}`;
  return Api.put(url, item);
};
export const showbuilding = (id) => {
  const url = `/building/${id}`;
  return Api.get(url);
};
export const getclassbuilding = (id) => {
  const url = `/building/class/${id}`;
  return Api.get(url);
};
export const removebuilding = (item) => {
  const url = `/building/delete/${item.id}`;
  return Api.put(url,item);
};
export const createbuilding = (item) => {
  const url = `/building/create`;
  return Api.post(url, item);
};
