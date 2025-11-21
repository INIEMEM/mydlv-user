
import axios from "axios";
const baseUrl = "https://mydlv.onrender.com/api/v1/";
const token = localStorage.getItem("token");
export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
