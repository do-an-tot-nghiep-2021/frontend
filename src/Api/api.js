import axios from "axios";

export const Api = axios.create({
  baseURL: "http://dev-backend.tk/api",
  headers: {
    "Content-Type": "application/json",
  },
});
