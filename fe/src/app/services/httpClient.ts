import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
//import {localStorageKeys} from "../config/localStorageKeys";
//import { timeout } from "../utils/timeout";

const renderBaseURL = "https://rig-control-backend-new.onrender.com";
//const awsBaseURL = "https://54.224.10.112:3000"

export const httpClient = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  //await timeout(1500);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
