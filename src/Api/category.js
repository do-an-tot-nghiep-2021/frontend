import { Api } from "./api";

export const all = () => {
    const url = `/category`;
    return Api.get(url);
  }
  export const update = (item) => {
    const url = `/category/${item.id}`;
    return Api.put(url, item);
  };
  export const show = (id) => {
    const url = `/category/${id}`;
    return Api.get(url);
  };
  export const remove = (id) => {
    const url = `/category/${id}`;
    return Api.delete(url);
  };
  export const create = (product) => {
    const url = `/category/create`;
    return Api.post(url, product);
  };