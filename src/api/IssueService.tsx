import { HttpClient } from "./httpClient/httpClient";
import { Issue } from "../@types/types";

export class IssueService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getList(pageNum?: number) {
    const { data }: { data: Issue[] } = await this.httpClient.request(
      `/repos/facebook/react/issues?state=open&sort=comments&per_page=10&page=${pageNum}`,
      "GET"
    );
    return data;
  }

  async getDetail(issueNum?: number) {
    const data = await this.httpClient.request(
      `/repos/facebook/react/issues/${issueNum}`,
      "GET"
    );
    return data;
  }
}
