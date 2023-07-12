import { HttpClient } from "./HttpClient";
import { IssuesService } from "./IssuesInstance";

export class AnIssueService {
  protected readonly httpClient;
  protected readonly issuesInstance;
  protected readonly issuesURL;
  constructor(httpClient: HttpClient, issuesInstance: IssuesService) {
    this.httpClient = httpClient;
    this.issuesInstance = issuesInstance;
    this.issuesURL = this.issuesInstance.issuesURL;
  }

  async fetch(number: number) {
    const response = await (
      await this.httpClient.fetch(`${this.issuesURL}/${number}`)
    ).json();
    if (Object.hasOwn(response, "message")) {
      throw new Error(response.message);
    }
    return response;
  }
}
