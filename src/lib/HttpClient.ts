import Axios from 'axios';

class HttpClient {
  protected axios;

  constructor({ isGitHub = false }: { isGitHub?: boolean }) {
    this.axios = Axios.create({
      baseURL: isGitHub ? 'https://api.github.com/' : '/',
    });
  }

  async get<Response = unknown>(url: string) {
    const res = await this.axios.get<Response>(url);
    return res.data;
  }

  async post<Response = unknown, Request = any>(url: string, body?: Request) {
    const res = await this.axios.post<Response>(url, body);
    return res.data;
  }
}

export default HttpClient;
