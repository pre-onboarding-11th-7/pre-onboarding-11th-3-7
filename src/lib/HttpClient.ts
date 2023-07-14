import Axios, { AxiosRequestConfig } from 'axios';

class HttpClient {
  protected axios;

  constructor({ isGitHub = false }: { isGitHub?: boolean }) {
    this.axios = Axios.create({
      baseURL: isGitHub ? 'https://api.github.com/' : '/',
    });

    if (import.meta.env.VITE_GH_TOKEN) {
      this.interceptRequest();
    }
  }

  async get<Response = unknown>(url: string, config?: AxiosRequestConfig) {
    const res = await this.axios.get<Response>(url, config);
    return res.data;
  }

  async post<Response = unknown, Request = any>(url: string, body?: Request) {
    const res = await this.axios.post<Response>(url, body);
    return res.data;
  }

  private interceptRequest() {
    this.axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${import.meta.env.VITE_GH_TOKEN}`;
      return config;
    });
  }
}

export default HttpClient;
