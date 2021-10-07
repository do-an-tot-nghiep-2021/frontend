import axios from "axios";

export const Api = axios.create({
  baseURL: "http://beecoffee.wtf/api",
  headers: {
    "Content-Type": "application/json",
  },
});
