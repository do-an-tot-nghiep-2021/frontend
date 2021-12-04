import { Api } from "./api";

export const allvoucher = () => {
  const url = `/voucher`;
  return Api.get(url);
};
export const updatevoucher = (item) => {
  const url = `/voucher/${item.id}`;
  return Api.put(url, item);
};
export const showvoucher = (id) => {
  const url = `/voucher/${id}`;
  return Api.get(url);
};
export const remotevoucher = (item) => {
  const url = `/voucher/delete/${item.id}`;
  return Api.put(url, item);
};
export const createvoucher = (item) => {
  const url = `/voucher/create`;
  return Api.post(url, item);
};
export const redeemvoucher = (item) => {
  const url = `/voucher/redeem`;
  return Api.post(url, item);
};
export const getvoucherid = (item) => {
  const url = `/voucher/account-id`;
  return Api.post(url, item);
};
