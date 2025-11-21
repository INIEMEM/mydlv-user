import { useContext, useMemo } from "react";
import { MainContext } from "../context/Context";
import axios from "axios";

const baseUrl = "https://mydlv.onrender.com/api/v1/";

export const useAxios = () => {
  // 1. Get the token from your Context
  const { token } = useContext(MainContext);

  // 2. Create the Axios instance
  // We use useMemo so the instance is only recreated if the token changes
  const api = useMemo(() => {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }, [token]);

  return api;
};