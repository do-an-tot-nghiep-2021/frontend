import { Api } from "./api";

export const allactive = () => {
  const url = `/active`;
  return Api.get(url);
};
export const updateactive = (item) => {
  const url = `/active/${item.id}`;
  return Api.put(url, item);
};
export const showactive = (id) => {
  const url = `/active/${id}`;
  return Api.get(url);
};
export const removeactive = (id) => {
  const url = `/active/${id}`;
  return Api.delete(url);
};
export const createactive = (item) => {
  const url = `/active/create`;
  return Api.post(url, item);
};
