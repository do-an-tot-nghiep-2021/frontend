import { Api } from "./api";

// export const allclass = () => {
//   const url = `/classroom`;
//   return Api.get(url);
// };
// export const updateclass = (item) => {
//   const url = `/classroom/${item.id}`;
//   return Api.put(url, item);
// };
// export const showclass = (id) => {
//   const url = `/classroom/${id}`;
//   return Api.get(url);
// };
// export const removeclass = (item) => {
//   const url = `/classroom/delete/${item.id}`;
//   return Api.put(url, item);
// };

export const createclass = (item) => {
  const url = `/gw_payment/transactionProcessor`;
  return Api.post(url, item);
};