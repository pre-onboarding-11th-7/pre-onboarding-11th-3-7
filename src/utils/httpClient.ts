import axios, { AxiosInstance } from "axios";

interface IHttpClient {
  (baseURL: string, token?: string): AxiosInstance;
}

export const httpClient: IHttpClient = (baseURL, token) => {
  const instance = axios.create({ baseURL: baseURL });

  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};
