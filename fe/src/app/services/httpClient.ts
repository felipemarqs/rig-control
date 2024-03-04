import axios from "axios";
import {localStorageKeys} from "../config/localStorageKeys";
//import {localStorageKeys} from "../config/localStorageKeys";
//import { timeout } from "../utils/timeout";

enum URLPath {
  DEV = "http://127.0.0.1:3000",
  PROD = "https://rig-control-backendv5-0.onrender.com",
}
export const httpClient = axios.create({
  baseURL: URLPath.DEV,
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  //await timeout(1500);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
