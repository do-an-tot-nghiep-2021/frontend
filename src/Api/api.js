import axios from "axios";

export const Api = axios.create({
  baseURL: "https://dev-backend.tk/api",
  headers: {
    "Content-Type": "application/json",
  },
});
