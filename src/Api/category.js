import { Api } from "./api";

export const allcategory = () => {
  const url = `/category`;
  return Api.get(url);
};
export const updatecategory = (item) => {
  const url = `/category/${item.id}`;
  return Api.put(url, item);
};
export const showcategory = (id) => {
  const url = `/category/${id}`;
  return Api.get(url);
};
export const removecategory = (id) => {
  const url = `/category/${id}`;
  return Api.delete(url);
};
export const createcategory = (item) => {
  const url = `/category/create`;
  return Api.post(url, item);
};
