import axios from "axios";
export class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  request(url: string, method: string, options = {}) {
    return axios({
      method: method,
      url: this.baseURL + url,
      data: options,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
