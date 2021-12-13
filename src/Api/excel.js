import { Api } from "./api";

export const exportexcel = (data) => {
    const url = `/export/order`;
    return Api.post(url, data);
};