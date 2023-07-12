import { HttpClient } from "./httpClient/httpClient";
import { Issue } from "../@types/types";
export class ListService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async get() {
    const { data }: { data: Issue[] } = await this.httpClient.request(
      "/repos/facebook/react/issues?state=open&sort=comments",
      "GET"
    );
    return data;
  }
}
