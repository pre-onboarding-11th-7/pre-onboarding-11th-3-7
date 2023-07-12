import axios from "axios";
export class HttpClient {
  private baseURL: string;
  private token: string;

  constructor(baseURL: string, token: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  request(url: string, method: string, options = {}) {
    return axios({
      method: method,
      url: this.baseURL + url,
      data: options,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + this.token,
      },
    });
  }
}
