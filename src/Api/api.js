import axios from "axios";

export const Api = axios.create({
  baseURL: "http://demoapi.wtf/api",
  headers: {
    "Content-Type": "application/json",
  },
});
